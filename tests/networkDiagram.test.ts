// @vitest-environment happy-dom

// ── External Dependencies & Registrations
import { describe, expect, it, vi } from 'vitest';

// ── Local
import { Tool as D3Tool } from '@/index';
import type { NetworkDiagramData } from '@/index';

// ── Data ─────────────────────────────────────────────────────────────────────────────────────────────────────────────

const data: NetworkDiagramData = {
    links: [
        { source: 'A', target: 'B' },
        { source: 'B', target: 'C' }
    ],
    nodes: [{ id: 'A' }, { id: 'B' }, { id: 'C' }]
};

// ── Tests ────────────────────────────────────────────────────────────────────────────────────────────────────────────

describe('D3Tool.renderNetworkDiagram', () => {
    it('renders an SVG with one line per link and one labelled node per node', async () => {
        const renderTo = document.createElement('div');
        document.body.append(renderTo);

        const view = await new D3Tool().renderNetworkDiagram(data, renderTo);

        expect(view.vendorId).toBe('d3');
        expect(view.svg.tagName.toLowerCase()).toBe('svg');
        expect(view.svg.querySelectorAll('line')).toHaveLength(data.links.length);
        expect(view.svg.querySelectorAll('circle')).toHaveLength(data.nodes.length);

        const labels = Array.from(view.svg.querySelectorAll('text'), (node) => node.textContent);
        expect(labels).toEqual(expect.arrayContaining(data.nodes.map((node) => node.id)));
    });

    it('invokes the callback once the initial render completes', async () => {
        const renderTo = document.createElement('div');
        let isCalled = false;

        await new D3Tool().renderNetworkDiagram(data, renderTo, undefined, () => {
            isCalled = true;
        });

        expect(isCalled).toBe(true);
    });

    it('triggerAutoLayout() and resize() run without throwing', async () => {
        const renderTo = document.createElement('div');
        const view = await new D3Tool().renderNetworkDiagram(data, renderTo);

        expect(() => {
            view.triggerAutoLayout();
        }).not.toThrow();
        expect(() => {
            view.resize();
        }).not.toThrow();
    });

    it('destroy() removes the SVG from the container', async () => {
        const renderTo = document.createElement('div');
        const view = await new D3Tool().renderNetworkDiagram(data, renderTo);

        view.destroy();

        expect(renderTo.querySelectorAll('svg')).toHaveLength(0);
    });

    it('shows a node’s label in place of its id, and sizes each node by its level', async () => {
        const renderTo = document.createElement('div');
        const levelData: NetworkDiagramData = {
            links: [{ source: 'context', target: 'hr' }],
            nodes: [
                { id: 'context', label: 'Context', level: 0 },
                { id: 'hr', label: 'Human Resource', level: 1 }
            ]
        };

        const view = await new D3Tool().renderNetworkDiagram(levelData, renderTo);

        expect(Array.from(view.svg.querySelectorAll('text'), (node) => node.textContent)).toEqual(['Context', 'Human Resource']);
        const radii = Array.from(view.svg.querySelectorAll('circle'), (circle) => Number(circle.getAttribute('r')));
        expect(radii[0]).toBeGreaterThan(radii[1] ?? 0);
    });

    it('draws a node with no level as it draws a level 1 node', async () => {
        const renderTo = document.createElement('div');
        const mixedData: NetworkDiagramData = { links: [], nodes: [{ id: 'A' }, { id: 'B', level: 1 }] };

        const view = await new D3Tool().renderNetworkDiagram(mixedData, renderTo);

        const [first, second] = [...view.svg.querySelectorAll('circle')];
        expect(first?.getAttribute('r')).toBe(second?.getAttribute('r'));
        expect(first?.getAttribute('fill')).toBe(second?.getAttribute('fill'));
    });

    it('passes the clicked node, as the caller gave it, to onNodeClick', async () => {
        const renderTo = document.createElement('div');
        const clickedNodes: unknown[] = [];

        const view = await new D3Tool().renderNetworkDiagram(data, renderTo, {
            onNodeClick: (node) => {
                clickedNodes.push(node);
            }
        });
        view.svg.querySelectorAll('circle')[1]?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(clickedNodes).toStrictEqual([{ id: 'B' }]);
    });

    it('zooms out after an auto-layout to bring every node into view, only when asked to', async () => {
        const starData: NetworkDiagramData = {
            links: Array.from({ length: 30 }, (_value, index) => ({ source: 'hub', target: `node${String(index)}` })),
            nodes: [{ id: 'hub' }, ...Array.from({ length: 30 }, (_value, index) => ({ id: `node${String(index)}` }))]
        };
        const fitted = await new D3Tool().renderNetworkDiagram(starData, document.createElement('div'), { fitsView: true });
        const unfitted = await new D3Tool().renderNetworkDiagram(starData, document.createElement('div'));

        fitted.triggerAutoLayout();
        unfitted.triggerAutoLayout();

        expect(fitted.svg.querySelector('g')?.getAttribute('transform')).toContain('scale(');
        expect(unfitted.svg.querySelector('g')?.getAttribute('transform')).toBeNull();
    });

    describe('update', () => {
        const areaData: NetworkDiagramData = {
            links: [
                { source: 'context', target: 'hr' },
                { source: 'context', target: 'finance' }
            ],
            nodes: [
                { id: 'context', label: 'Context', level: 0 },
                { id: 'hr', label: 'Human Resource', level: 1 },
                { id: 'finance', label: 'Finance', level: 1 }
            ]
        };
        const modelData: NetworkDiagramData = {
            links: [
                { source: 'context', target: 'hr' },
                { source: 'hr', target: 'workforce' }
            ],
            nodes: [
                { id: 'context', label: 'Context', level: 0 },
                { id: 'hr', label: 'Human Resource', level: 1 },
                { id: 'workforce', label: 'Workforce', level: 2 }
            ]
        };

        it('keeps the elements of nodes that stay, adds the new nodes and removes the old ones', async () => {
            const view = await new D3Tool().renderNetworkDiagram(areaData, document.createElement('div'), { transitionDuration: 0 });
            const humanResourceElement = findNodeElement(view.svg, 'Human Resource');

            view.update(modelData);

            expect(findNodeElement(view.svg, 'Human Resource')).toBe(humanResourceElement);
            expect(readLabels(view.svg)).toStrictEqual(['Context', 'Human Resource', 'Workforce']);
            expect(view.svg.querySelectorAll('line')).toHaveLength(2);
        });

        it('passes a clicked node from the new data to onNodeClick', async () => {
            const clickedNodes: unknown[] = [];
            const view = await new D3Tool().renderNetworkDiagram(areaData, document.createElement('div'), {
                onNodeClick: (node) => {
                    clickedNodes.push(node);
                },
                transitionDuration: 0
            });

            view.update(modelData);
            findNodeElement(view.svg, 'Workforce')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(clickedNodes).toStrictEqual([modelData.nodes[2]]);
        });

        it('fades new nodes in and old nodes out over the transition, and removes the old ones only at its end', async () => {
            const frames: ((time: number) => void)[] = [];
            vi.stubGlobal('requestAnimationFrame', (frame: (time: number) => void) => {
                frames.push(frame);
                return frames.length;
            });
            vi.spyOn(performance, 'now').mockReturnValue(0);
            const view = await new D3Tool().renderNetworkDiagram(areaData, document.createElement('div'), { transitionDuration: 400 });

            view.update(modelData);

            expect(findNodeElement(view.svg, 'Workforce')?.style.opacity).toBe('0');
            expect(findNodeElement(view.svg, 'Finance')?.style.opacity).toBe('1');

            frames.shift()?.(200);

            expect(Number(findNodeElement(view.svg, 'Workforce')?.style.opacity)).toBeCloseTo(0.5);
            expect(Number(findNodeElement(view.svg, 'Finance')?.style.opacity)).toBeCloseTo(0.5);

            frames.shift()?.(400);

            expect(findNodeElement(view.svg, 'Finance')).toBeUndefined();
            expect(findNodeElement(view.svg, 'Workforce')?.style.opacity).toBe('');
            expect(frames).toHaveLength(0);
            vi.unstubAllGlobals();
            vi.restoreAllMocks();
        });
    });

    describe('labels', () => {
        const starData: NetworkDiagramData = {
            links: [
                { source: 'hub', target: 'left' },
                { source: 'hub', target: 'right' }
            ],
            nodes: [
                { id: 'hub', label: 'Hub', level: 0 },
                { id: 'left', label: 'Governance, Risk & Compliance' },
                { id: 'right', label: 'Legal' }
            ]
        };

        it('centres every label below its node unless asked otherwise', async () => {
            const view = await new D3Tool().renderNetworkDiagram(starData, document.createElement('div'));
            view.triggerAutoLayout();

            expect([...view.svg.querySelectorAll('text')].map((text) => text.getAttribute('text-anchor'))).toStrictEqual(['middle', 'middle', 'middle']);
        });

        it('puts a label in the widest gap between its node’s links when placed outside', async () => {
            const view = await new D3Tool().renderNetworkDiagram(starData, document.createElement('div'), { labelPlacementId: 'outside' });
            view.triggerAutoLayout();
            const hubElement = findNodeElement(view.svg, 'Hub');

            // An outer node has one link, so its label goes on the side facing away from the hub.
            let layoutIsSideways = true;
            for (const label of ['Governance, Risk & Compliance', 'Legal']) {
                const nodeElement = findNodeElement(view.svg, label);
                const offsetX = readTranslateX(nodeElement) - readTranslateX(hubElement);
                const offsetY = readTranslateY(nodeElement) - readTranslateY(hubElement);
                layoutIsSideways = Math.abs(offsetX) > Math.abs(offsetY);
                const sideAnchor = offsetX > 0 ? 'start' : 'end';
                expect(readAnchor(nodeElement)).toBe(Math.abs(offsetX) / Math.hypot(offsetX, offsetY) < 0.35 ? 'middle' : sideAnchor);
            }

            // The hub's two links run in a line, so its gaps are across that line: above and below a sideways layout.
            expect(readAnchor(hubElement) === 'middle').toBe(layoutIsSideways);
        });

        it('breaks a long label of several words onto two even lines, and leaves short and one-word labels whole', async () => {
            const wrapData: NetworkDiagramData = {
                links: [],
                nodes: [
                    { id: 'a', label: 'Governance, Risk & Compliance' },
                    { id: 'b', label: 'Legal' },
                    { id: 'c', label: 'Telecommunications' }
                ]
            };
            const view = await new D3Tool().renderNetworkDiagram(wrapData, document.createElement('div'), { wrapsLabels: true });

            const lines = [...view.svg.querySelectorAll('text')].map((text) => [...text.querySelectorAll('tspan')].map((line) => line.textContent));
            expect(lines).toStrictEqual([['Governance, Risk', '& Compliance'], ['Legal'], ['Telecommunications']]);
        });

        it('lengthens the links round a node with many neighbours when room is reserved for labels, and leaves a pair alone', async () => {
            expect(await measureLinkLength(12, false)).toBeLessThan(45);
            expect(await measureLinkLength(12, true)).toBeGreaterThan(100);
            expect(await measureLinkLength(1, true)).toBeLessThan(65); // Only as far apart as keeps the two nodes from touching.
        });
    });
});

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

function constructStarData(leafCount: number): NetworkDiagramData {
    const leafIds = Array.from({ length: leafCount }, (_value, index) => `leaf${String(index)}`);
    return {
        links: leafIds.map((leafId) => ({ source: 'hub', target: leafId })),
        nodes: [{ id: 'hub', label: 'Hub' }, ...leafIds.map((leafId) => ({ id: leafId, label: 'A label that needs room' }))]
    };
}

// The length of a link of a star laid out with no push between nodes, so only the links set how far apart they sit.
async function measureLinkLength(leafCount: number, isRoomReserved: boolean): Promise<number> {
    const view = await new D3Tool().renderNetworkDiagram(constructStarData(leafCount), document.createElement('div'), {
        chargeStrength: 0,
        linkDistance: 30,
        reservesLabelRoom: isRoomReserved
    });
    view.triggerAutoLayout();
    const line = view.svg.querySelector('line');
    return Math.hypot(Number(line?.getAttribute('x2')) - Number(line?.getAttribute('x1')), Number(line?.getAttribute('y2')) - Number(line?.getAttribute('y1')));
}

function readLabels(svg: SVGSVGElement): (string | null)[] {
    return [...svg.querySelectorAll('text')].map((text) => text.textContent);
}

function findNodeElement(svg: SVGSVGElement, label: string): SVGGElement | undefined {
    const text = [...svg.querySelectorAll('text')].find((candidate) => candidate.textContent === label);
    return (text?.parentElement as SVGGElement | null | undefined) ?? undefined;
}

function readAnchor(element: Element | undefined): string | null | undefined {
    return element?.querySelector('text')?.getAttribute('text-anchor');
}

function readTranslateX(element: Element | null | undefined): number {
    return Number(/translate\(([^,]+),/.exec(element?.getAttribute('transform') ?? '')?.[1]);
}

function readTranslateY(element: Element | null | undefined): number {
    return Number(/,([^)]+)\)/.exec(element?.getAttribute('transform') ?? '')?.[1]);
}
