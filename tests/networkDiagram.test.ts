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

    it('keeps a fitted diagram in the middle of its container when the container is resized, and leaves an unfitted one where it is', async () => {
        const fittedContainer = constructSizedContainer();
        const unfittedContainer = constructSizedContainer();
        const fitted = await new D3Tool().renderNetworkDiagram(data, fittedContainer.element, { fitsView: true });
        const unfitted = await new D3Tool().renderNetworkDiagram(data, unfittedContainer.element);
        fitted.triggerAutoLayout();
        unfitted.triggerAutoLayout();
        const fittedStart = readTranslateX(fitted.svg.querySelector('g'));

        fittedContainer.setWidth(400);
        unfittedContainer.setWidth(400);
        fitted.resize();
        unfitted.resize();

        expect(readTranslateX(fitted.svg.querySelector('g'))).toBeCloseTo(fittedStart - 200);
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

        it('leaves every node where it is when new data differs only in which node is selected', async () => {
            const view = await new D3Tool().renderNetworkDiagram(areaData, document.createElement('div'), { selectsOnClick: false, transitionDuration: 0 });
            view.triggerAutoLayout();
            const readTransforms = (): (string | null)[] => [...view.svg.querySelectorAll('circle')].map((circle) => circle.parentElement?.getAttribute('transform') ?? null);
            const transforms = readTransforms();

            view.update({ ...areaData, nodes: areaData.nodes.map((node) => ({ ...node, isSelected: node.id === 'hr' })) });

            expect(readTransforms()).toStrictEqual(transforms);
            expect(findNodeElement(view.svg, 'Human Resource')?.querySelector('circle')?.getAttribute('fill')).toBe('#f59e0b');
        });

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

    describe('fitting and zooming', () => {
        const labelledData: NetworkDiagramData = {
            links: [
                { source: 'hub', target: 'left' },
                { source: 'hub', target: 'right' }
            ],
            nodes: [
                { id: 'hub', label: 'Hub' },
                { id: 'left', label: 'Left' },
                { id: 'right', label: 'Right' }
            ]
        };

        it('enlarges a small fitted diagram as far as allowed, and leaves it at full size otherwise', async () => {
            const enlarged = await new D3Tool().renderNetworkDiagram(labelledData, constructSizedContainer().element, { fitsView: true, maximumFitScale: 1.5 });
            const fullSize = await new D3Tool().renderNetworkDiagram(labelledData, constructSizedContainer().element, { fitsView: true });
            enlarged.triggerAutoLayout();
            fullSize.triggerAutoLayout();

            expect(readScale(enlarged.svg.querySelector('g'))).toBe(1.5);
            expect(readScale(fullSize.svg.querySelector('g'))).toBe(1);
        });

        it('keeps a short fitted diagram at the top of its container when asked, and in the middle otherwise', async () => {
            const top = await new D3Tool().renderNetworkDiagram(labelledData, constructSizedContainer().element, { fitAlignmentId: 'top', fitsView: true });
            const middle = await new D3Tool().renderNetworkDiagram(labelledData, constructSizedContainer().element, { fitsView: true });
            top.triggerAutoLayout();
            middle.triggerAutoLayout();
            const topGroup = top.svg.querySelector('g');
            const middleGroup = middle.svg.querySelector('g');

            expect(readTranslateY(topGroup)).toBeLessThan(readTranslateY(middleGroup));
            expect(readTranslateX(topGroup)).toBe(readTranslateX(middleGroup));
            expect(readScale(topGroup)).toBe(readScale(middleGroup));
        });

        it('leaves a gap above a diagram kept near the top that grows with the container, at 5% of its height', async () => {
            const container = constructSizedContainer();
            container.setHeight(480);
            const view = await new D3Tool().renderNetworkDiagram(labelledData, container.element, { fitAlignmentId: 'top', fitsView: true });
            view.triggerAutoLayout();
            const shortOffset = readTranslateY(view.svg.querySelector('g'));
            container.setHeight(960);
            view.fitView();

            expect(readTranslateY(view.svg.querySelector('g')) - shortOffset).toBeCloseTo(24); // 5% of 960 less 5% of 480.
        });

        it('grows a diagram kept near the top into the space below it from the zoom buttons, and keeps its top in view', async () => {
            const view = await new D3Tool().renderNetworkDiagram(labelledData, constructSizedContainer().element, { fitAlignmentId: 'top', fitsView: true });
            view.triggerAutoLayout();
            const group = view.svg.querySelector('g');
            const boundsTop = (24 - readTranslateY(group)) / readScale(group); // The diagram's top edge, in its own units, from the 24 gap above it once fitted.

            view.zoomBy(1.25);
            expect(readScale(group)).toBe(1.25);
            expect(readTranslateY(group) + boundsTop * readScale(group)).toBeCloseTo(24); // Still fits, so it is still placed as fitted.

            view.zoomBy(4);
            expect(readScale(group)).toBe(4);
            expect(readTranslateY(group) + boundsTop * readScale(group)).toBeLessThanOrEqual(16); // Too tall to fit, so no empty space opens above it.
        });

        it('makes a fitted diagram only as small as its labels need', async () => {
            const longLabel = 'A label that reaches a long way out from its node';
            const longData = { ...labelledData, nodes: labelledData.nodes.map((node) => (node.id === 'hub' ? node : { ...node, label: longLabel })) };

            expect(await measureFitScale(longData)).toBeLessThan(await measureFitScale(labelledData));
            expect(await measureFitScale(labelledData)).toBeGreaterThan(0.75); // Short labels leave nearly all of a narrow container to the nodes.
        });

        it('puts every label below its node in a narrow container, and beside it again once the container is wide', async () => {
            const container = constructSizedContainer();
            container.setWidth(400);
            const view = await new D3Tool().renderNetworkDiagram(labelledData, container.element, { compactWidth: 480, fitsView: true, labelPlacementId: 'outside' });
            view.triggerAutoLayout();
            const readAnchors = (): (string | null)[] => [...view.svg.querySelectorAll('text')].map((text) => text.getAttribute('text-anchor'));

            expect(readAnchors()).toStrictEqual(['middle', 'middle', 'middle']);

            container.setWidth(800);
            view.resize();

            expect(readAnchors().toSorted((left, right) => (left ?? '').localeCompare(right ?? ''))).toStrictEqual(['end', 'middle', 'start']);
        });

        it('zooms in and out about the middle of the container, and fits the diagram again when asked', async () => {
            const view = await new D3Tool().renderNetworkDiagram(labelledData, constructSizedContainer().element, { fitsView: true });
            view.triggerAutoLayout();
            const fittedTransform = view.svg.querySelector('g')?.getAttribute('transform');

            view.zoomBy(2);
            expect(readScale(view.svg.querySelector('g'))).toBe(2);
            view.zoomBy(0.5);
            view.zoomBy(0.5);
            expect(readScale(view.svg.querySelector('g'))).toBe(0.5);

            view.fitView();
            expect(view.svg.querySelector('g')?.getAttribute('transform')).toBe(fittedTransform);
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

        it('lengthens the links round a node far enough for the node’s own label to fit inside the ring', async () => {
            const hubLabel = 'Telecommunications'; // One long word, so it cannot wrap.
            const hubData: NetworkDiagramData = {
                links: ['a', 'b', 'c'].map((leafId) => ({ source: 'hub', target: leafId })),
                nodes: [{ id: 'hub', label: hubLabel }, { id: 'a' }, { id: 'b' }, { id: 'c' }]
            };
            const view = await new D3Tool().renderNetworkDiagram(hubData, document.createElement('div'), {
                chargeStrength: 0,
                labelPlacementId: 'outside',
                linkDistance: 30,
                reservesLabelRoom: true
            });
            view.triggerAutoLayout();

            const line = view.svg.querySelector('line');
            const linkLength = Math.hypot(Number(line?.getAttribute('x2')) - Number(line?.getAttribute('x1')), Number(line?.getAttribute('y2')) - Number(line?.getAttribute('y1')));
            expect(linkLength).toBeGreaterThan(hubLabel.length * 6);
        });

        it('centres the label of a node with many links out in the wedge between two of them, clear of the node', async () => {
            const view = await new D3Tool().renderNetworkDiagram(constructStarData(6), document.createElement('div'), { labelPlacementId: 'outside', reservesLabelRoom: true });
            view.triggerAutoLayout();

            const hubText = findNodeElement(view.svg, 'Hub')?.querySelector('text');
            const distance = Math.hypot(Number(hubText?.querySelector('tspan')?.getAttribute('x')), Number(hubText?.getAttribute('y')));
            expect(hubText?.getAttribute('text-anchor')).toBe('middle');
            expect(distance).toBeGreaterThan(20 + 8); // Past the node's own radius and the gap kept beside it.
        });

        it('moves a label on a diagonal further from its node than one straight out to the side', async () => {
            // Leaves round a hub, so some labels point straight out sideways and others on a diagonal.
            const view = await new D3Tool().renderNetworkDiagram(constructStarData(12), document.createElement('div'), { labelPlacementId: 'outside', reservesLabelRoom: true });
            view.triggerAutoLayout();
            const hubElement = findNodeElement(view.svg, 'Hub');

            const distances = [...view.svg.querySelectorAll('text')]
                .filter((text) => text.textContent !== 'Hub' && text.getAttribute('text-anchor') !== 'middle')
                .map((text) => {
                    const offsetX = readTranslateX(text.parentElement) - readTranslateX(hubElement);
                    const offsetY = readTranslateY(text.parentElement) - readTranslateY(hubElement);
                    return {
                        labelDistance: Math.abs(Number(text.querySelector('tspan')?.getAttribute('x'))) / Math.abs(offsetX / Math.hypot(offsetX, offsetY)),
                        slope: Math.abs(offsetY / Math.hypot(offsetX, offsetY))
                    };
                })
                .toSorted((left, right) => left.slope - right.slope);

            expect(distances.length).toBeGreaterThan(1);
            expect(distances.at(-1)?.labelDistance).toBeGreaterThan(distances[0]?.labelDistance ?? 0);
        });

        it('draws labels on an outline of the given colour, and leaves ids inside nodes without one', async () => {
            const haloData: NetworkDiagramData = { links: [], nodes: [{ id: 'a', label: 'Legal' }, { id: 'b' }] };
            const view = await new D3Tool().renderNetworkDiagram(haloData, document.createElement('div'), { labelHaloColor: 'var(--color-surface)' });

            const [labelText, idText] = [...view.svg.querySelectorAll('text')];
            expect(labelText?.style.stroke).toBe('var(--color-surface)');
            expect(labelText?.style.paintOrder).toBe('stroke');
            expect(idText?.style.stroke).toBe('');
        });

        it('draws a plus as lines of equal length through the middle of its node, with no label or id beside it, and a tooltip saying what it is', async () => {
            const symbolData: NetworkDiagramData = {
                links: [],
                nodes: [
                    { id: 'add', symbol: '+', title: 'Add' },
                    { id: 'plain', label: 'Plain' }
                ]
            };
            const view = await new D3Tool().renderNetworkDiagram(symbolData, document.createElement('div'));

            const [symbolElement, plainElement] = [...view.svg.querySelectorAll('circle')].map((circle) => circle.parentElement);
            expect(symbolElement?.querySelector('path.symbol')?.getAttribute('d')).toBe('M-5.83,0H5.83M0,-5.83V5.83'); // As far left as right, and as far up as down, of the node's centre.
            expect(symbolElement?.querySelector('text.symbol')).toBeNull();
            expect(symbolElement?.querySelector('text')?.textContent).toBe('');
            expect(symbolElement?.querySelector('title')?.textContent).toBe('Add');
            expect(plainElement?.querySelector('.symbol')).toBeNull();
        });

        it('draws any other symbol as text centred on the middle of its node', async () => {
            const symbolData: NetworkDiagramData = { links: [], nodes: [{ id: 'count', symbol: '12' }] };
            const view = await new D3Tool().renderNetworkDiagram(symbolData, document.createElement('div'));

            const symbolText = view.svg.querySelector('text.symbol');
            expect(symbolText?.textContent).toBe('12');
            expect(symbolText?.getAttribute('text-anchor')).toBe('middle');
            expect(symbolText?.getAttribute('dominant-baseline')).toBe('central');
            expect(view.svg.querySelector('path.symbol')).toBeNull();
        });

        it('draws an action node unlike any level, and never as the selected node', async () => {
            const actionData: NetworkDiagramData = {
                links: [],
                nodes: [
                    { id: 'add', isAction: true, level: 3, symbol: '+' },
                    { id: 'item', label: 'Item', level: 3 }
                ]
            };
            const view = await new D3Tool().renderNetworkDiagram(actionData, document.createElement('div'));
            const [actionCircle, itemCircle] = [...view.svg.querySelectorAll('circle')];
            const actionFill = actionCircle?.getAttribute('fill');

            expect(actionFill).not.toBe(itemCircle?.getAttribute('fill'));
            expect(Number(actionCircle?.getAttribute('r'))).toBeGreaterThan(Number(itemCircle?.getAttribute('r')));

            actionCircle?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            expect(actionCircle?.getAttribute('fill')).toBe(actionFill);

            itemCircle?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            expect(itemCircle?.getAttribute('fill')).toBe('#f59e0b');
        });

        it('keeps the selected node and the one under the pointer their own size, and shows the pointer in the disc, when asked to', async () => {
            const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"/>';
            const sizeData: NetworkDiagramData = {
                links: [],
                nodes: [
                    { id: 'selected', icon, isSelected: true, label: 'Selected' },
                    { id: 'other', icon, label: 'Other' }
                ]
            };
            const options = { growsActiveNodes: false, hoveredIconNodeColor: 'var(--hover)', selectedIconNodeColor: 'var(--selected)', selectsOnClick: false };
            const view = await new D3Tool().renderNetworkDiagram(sizeData, document.createElement('div'), options);
            const [selectedCircle, otherCircle] = [...view.svg.querySelectorAll('circle')];

            expect(selectedCircle?.getAttribute('r')).toBe(otherCircle?.getAttribute('r'));

            otherCircle?.parentElement?.dispatchEvent(new MouseEvent('mouseenter'));
            expect(otherCircle?.getAttribute('r')).toBe(selectedCircle?.getAttribute('r'));
            expect(otherCircle?.style.fill).toBe('var(--hover)');

            otherCircle?.parentElement?.dispatchEvent(new MouseEvent('mouseleave'));
            expect(otherCircle?.style.fill).toBe('#ffffff');
        });

        it('draws one node’s disc in its own colour, which the selected colour still replaces', async () => {
            const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"/>';
            const discData: NetworkDiagramData = {
                links: [],
                nodes: [
                    { id: 'top', discColor: 'var(--top)', icon, label: 'Top' },
                    { id: 'other', icon, label: 'Other' },
                    { id: 'add', isAction: true, symbol: '+' }
                ]
            };
            const options = { iconNodeColor: 'var(--surface)', selectedIconNodeColor: 'var(--selected)', selectsOnClick: false };
            const view = await new D3Tool().renderNetworkDiagram(discData, document.createElement('div'), options);
            const readFills = (): (string | undefined)[] => [...view.svg.querySelectorAll('circle')].map((circle) => circle.style.fill);

            expect(readFills().slice(0, 2)).toStrictEqual(['var(--top)', 'var(--surface)']);
            expect(new Set([...view.svg.querySelectorAll('circle')].map((circle) => circle.getAttribute('r')))).toStrictEqual(new Set(['22'])); // An action node is the size of the others.

            view.update({ ...discData, nodes: discData.nodes.map((node) => ({ ...node, isSelected: node.id === 'top' })) });
            expect(readFills()[0]).toBe('var(--selected)');
        });

        it('keeps a node’s own disc under the pointer, dimmed a little, and shows no id inside a node that has an icon but no label', async () => {
            const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"/>';
            const topData: NetworkDiagramData = { links: [], nodes: [{ id: 'top', discColor: 'var(--top)', icon, title: 'Top' }] };
            const view = await new D3Tool().renderNetworkDiagram(topData, document.createElement('div'), { hoveredIconNodeColor: 'var(--hover)' });
            const circle = view.svg.querySelector('circle');

            expect(view.svg.querySelectorAll('tspan')).toHaveLength(0);
            expect(view.svg.querySelector('title')?.textContent).toBe('Top');

            circle?.parentElement?.dispatchEvent(new MouseEvent('mouseenter'));
            expect(circle?.style.fill).toBe('var(--top)');
            expect(circle?.style.filter).toBe('brightness(0.92)');

            circle?.parentElement?.dispatchEvent(new MouseEvent('mouseleave'));
            expect(circle?.style.filter).toBe('');
        });

        it('shows the selected node by a ring a little apart from it, and nothing else, when given a colour for the ring', async () => {
            const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"/>';
            const ringData: NetworkDiagramData = {
                links: [],
                nodes: [
                    { id: 'selected', icon, isSelected: true, label: 'Selected' },
                    { id: 'other', icon, label: 'Other' }
                ]
            };
            const options = { iconNodeColor: 'var(--surface)', selectedIconNodeColor: 'var(--disc)', selectedRingColor: 'var(--ring)', selectsOnClick: false };
            const view = await new D3Tool().renderNetworkDiagram(ringData, document.createElement('div'), options);
            const [selectedElement, otherElement] = [findNodeElement(view.svg, 'Selected'), findNodeElement(view.svg, 'Other')];
            const ring = selectedElement?.querySelector<SVGCircleElement>('circle.selected-ring');
            const disc = selectedElement?.querySelector('circle');

            expect(ring?.style.stroke).toBe('var(--ring)');
            expect(Number(ring?.getAttribute('r'))).toBe(Number(disc?.getAttribute('r')) + 3); // A 2px gap, then a ring 2px wide.
            expect(disc?.style.fill).toBe('var(--surface)');
            expect(selectedElement?.getAttribute('aria-current')).toBe('true');
            expect(otherElement?.querySelector('circle.selected-ring')).toBeNull();
            expect(otherElement?.hasAttribute('aria-current')).toBe(false);
        });

        it('makes every node a button that the keyboard can reach and press', async () => {
            const keyboardData: NetworkDiagramData = {
                links: [],
                nodes: [
                    { id: 'a', label: 'Sales' },
                    { id: 'add', isAction: true, symbol: '+', title: 'Add' }
                ]
            };
            const clickedIds: string[] = [];
            const renderTo = document.createElement('div');
            document.body.append(renderTo); // Focus only moves between elements in the document.
            const view = await new D3Tool().renderNetworkDiagram(keyboardData, renderTo, {
                onNodeClick: (node) => {
                    clickedIds.push(node.id);
                }
            });
            const [salesElement, actionElement] = [...view.svg.querySelectorAll<SVGGElement>('g[role="button"]')];

            expect([salesElement, actionElement].map((element) => element?.getAttribute('tabindex'))).toStrictEqual(['0', '0']);
            expect([salesElement, actionElement].map((element) => element?.getAttribute('aria-label'))).toStrictEqual(['Sales', 'Add']);

            salesElement?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
            actionElement?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
            salesElement?.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
            expect(clickedIds).toStrictEqual(['a', 'add']);

            salesElement?.focus();
            expect(salesElement?.querySelector('circle.focus-ring')).not.toBeNull();
            salesElement?.blur();
            expect(salesElement?.querySelector('circle.focus-ring')).toBeNull();
            renderTo.remove();
        });

        it('keeps a haloed label nearer its node in a wedge between links, because the halo hides a link behind it', async () => {
            expect(await measureLabelDistance('#ffffff')).toBeLessThan(await measureLabelDistance());
        });

        it('draws the lines between nodes in the colour and width asked for, or mid grey and 2 wide', async () => {
            const thin = await new D3Tool().renderNetworkDiagram(data, document.createElement('div'), { linkColor: 'var(--line)', linkWidth: 1.5 });
            const plain = await new D3Tool().renderNetworkDiagram(data, document.createElement('div'));

            expect(thin.svg.querySelector('line')?.style.stroke).toBe('var(--line)');
            expect(plain.svg.querySelector('line')?.style.stroke).toBe('');
            expect(plain.svg.querySelector('line')?.getAttribute('stroke')).toBe('#9ca3af');

            expect(thin.svg.querySelector('line')?.getAttribute('stroke-width')).toBe('1.5');
            expect(plain.svg.querySelector('line')?.getAttribute('stroke-width')).toBe('2');
        });

        it('draws an action node in the caller’s colours, with a plus the size and weight of a 20px icon’s', async () => {
            const actionData: NetworkDiagramData = { links: [], nodes: [{ id: 'add', isAction: true, symbol: '+' }] };
            const actionNodeColors = { border: 'var(--border)', fill: 'var(--fill)', fillHovered: 'var(--hover)', symbol: 'var(--text)' };
            const view = await new D3Tool().renderNetworkDiagram(actionData, document.createElement('div'), { actionNodeColors, nodeBorderWidth: 1 });
            const circle = view.svg.querySelector('circle');
            const plus = view.svg.querySelector<SVGPathElement>('path.symbol');

            expect(circle?.style.fill).toBe('var(--fill)');
            expect(circle?.style.stroke).toBe('var(--border)');
            expect(circle?.getAttribute('stroke-width')).toBe('1');
            expect(plus?.style.stroke).toBe('var(--text)');
            expect(plus?.getAttribute('stroke-width')).toBe('1.04');

            circle?.parentElement?.dispatchEvent(new MouseEvent('mouseenter'));
            expect(circle?.style.fill).toBe('var(--hover)');
        });

        it('draws a node’s icon as an image on a plain disc, large enough to make out, ringed in its level’s colour', async () => {
            const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>';
            const iconData: NetworkDiagramData = {
                links: [],
                nodes: [
                    { id: 'store', icon, label: 'Store', level: 3 },
                    { id: 'plain', label: 'Plain', level: 3 }
                ]
            };
            const view = await new D3Tool().renderNetworkDiagram(iconData, document.createElement('div'), { iconNodeColor: 'var(--surface)' });
            const [iconCircle, plainCircle] = [...view.svg.querySelectorAll('circle')];
            const images = [...view.svg.querySelectorAll('image')];

            expect(images).toHaveLength(1);
            expect(images[0]?.getAttribute('href')).toBe(`data:image/svg+xml,${encodeURIComponent(icon)}`);
            expect(Number(images[0]?.getAttribute('x'))).toBe(-Number(images[0]?.getAttribute('width')) / 2);
            expect(Number(images[0]?.getAttribute('y'))).toBe(-Number(images[0]?.getAttribute('height')) / 2);
            expect(iconCircle?.style.fill).toBe('var(--surface)');
            expect(iconCircle?.getAttribute('fill')).toBeNull();
            expect(iconCircle?.getAttribute('stroke')).toBe(plainCircle?.getAttribute('fill'));
            expect(Number(iconCircle?.getAttribute('r'))).toBeGreaterThan(Number(plainCircle?.getAttribute('r')));
        });

        it('draws every icon and its disc at one size, whatever the node’s level', async () => {
            const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"/>';
            const levelData: NetworkDiagramData = { links: [], nodes: [0, 1, 2, 3].map((level) => ({ id: `level${String(level)}`, icon, label: 'Node', level })) };
            const view = await new D3Tool().renderNetworkDiagram(levelData, document.createElement('div'));

            expect(new Set([...view.svg.querySelectorAll('image')].map((image) => image.getAttribute('width')))).toStrictEqual(new Set(['28']));
            expect(new Set([...view.svg.querySelectorAll('image')].map((image) => image.getAttribute('height')))).toStrictEqual(new Set(['28']));
            expect(new Set([...view.svg.querySelectorAll('circle')].map((circle) => circle.getAttribute('r')))).toStrictEqual(new Set(['22']));
        });

        it('draws a node in its own colour, in place of its level’s, and every ring as wide as asked', async () => {
            const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"/>';
            const colourData: NetworkDiagramData = {
                links: [],
                nodes: [
                    { id: 'store', color: 'var(--brand)', icon, label: 'Store' },
                    { id: 'plain', color: 'var(--brand)', label: 'Plain' },
                    { id: 'level', label: 'Level' }
                ]
            };
            const view = await new D3Tool().renderNetworkDiagram(colourData, document.createElement('div'), { nodeBorderWidth: 1 });
            const [iconCircle, plainCircle, levelCircle] = [...view.svg.querySelectorAll('circle')];

            expect(iconCircle?.style.stroke).toBe('var(--brand)');
            expect(iconCircle?.style.fill).toBe('#ffffff');
            expect(plainCircle?.style.fill).toBe('var(--brand)');
            expect(plainCircle?.style.stroke).toBe('var(--brand)');
            expect(levelCircle?.style.fill).toBe('');
            expect([iconCircle, plainCircle, levelCircle].map((circle) => circle?.getAttribute('stroke-width'))).toStrictEqual(['1', '1', '1']);
        });

        it('shows a selected node with an icon in its disc, keeping its own thin ring, when given a colour for the disc', async () => {
            const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"/>';
            const selectionData: NetworkDiagramData = {
                links: [],
                nodes: [
                    { id: 'store', color: 'var(--brand)', icon, isSelected: true, label: 'Store' },
                    { id: 'plain', color: 'var(--brand)', isSelected: true, label: 'Plain' }
                ]
            };
            const options = { nodeBorderWidth: 1, selectedIconNodeColor: 'var(--selected)', selectsOnClick: false };
            const view = await new D3Tool().renderNetworkDiagram(selectionData, document.createElement('div'), options);
            const [iconCircle, plainCircle] = [...view.svg.querySelectorAll('circle')];

            expect(iconCircle?.style.fill).toBe('var(--selected)');
            expect(iconCircle?.style.stroke).toBe('var(--brand)');
            expect(iconCircle?.getAttribute('stroke-width')).toBe('1');

            // A node without an icon has no disc, so it shows as selected in its fill and a wider ring.
            expect(plainCircle?.getAttribute('fill')).toBe('#f59e0b');
            expect(plainCircle?.style.fill).toBe('');
            expect(plainCircle?.getAttribute('stroke-width')).toBe('2');
        });

        it('shows the caller’s selected node, and selects nothing on a click, when the caller keeps the selection', async () => {
            const selectionData: NetworkDiagramData = {
                links: [{ source: 'a', target: 'b' }],
                nodes: [
                    { id: 'a', isSelected: true, label: 'A' },
                    { id: 'b', label: 'B' }
                ]
            };
            const view = await new D3Tool().renderNetworkDiagram(selectionData, document.createElement('div'), { selectsOnClick: false });
            const [firstCircle, secondCircle] = [...view.svg.querySelectorAll('circle')];

            expect(firstCircle?.getAttribute('fill')).toBe('#f59e0b');
            expect(secondCircle?.getAttribute('fill')).not.toBe('#f59e0b');

            secondCircle?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(firstCircle?.getAttribute('fill')).toBe('#f59e0b');
            expect(secondCircle?.getAttribute('fill')).not.toBe('#f59e0b');
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

        it('cuts a line of a label that is too long short, and shows the whole label as the node’s tooltip', async () => {
            const cutData: NetworkDiagramData = {
                links: [],
                nodes: [
                    { id: 'a', label: '57db7-5238-43f7-a48f-692787635228' },
                    { id: 'b', label: 'Governance, Risk & Compliance' },
                    { id: 'c', label: 'Legal' },
                    { id: 'd', label: 'A label that is far too long', title: 'Its own tooltip' }
                ]
            };
            const view = await new D3Tool().renderNetworkDiagram(cutData, document.createElement('div'), { maximumLabelLength: 12, wrapsLabels: true });

            const lines = [...view.svg.querySelectorAll('text')].map((text) => [...text.querySelectorAll('tspan')].map((line) => line.textContent));
            expect(lines).toStrictEqual([['57db7-5238-…'], ['Governance,…', '& Compliance'], ['Legal'], ['A label tha…', 'far too long']]);
            expect([...view.svg.querySelectorAll('title')].map((title) => title.textContent)).toStrictEqual([
                '57db7-5238-43f7-a48f-692787635228',
                'Governance, Risk & Compliance',
                '',
                'Its own tooltip'
            ]);
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
// How far a hub's label sits from the middle of its node, with twelve links round it, so each gap between them is a
// wedge too narrow for the two-line label to sit beside the node.
async function measureLabelDistance(labelHaloColor?: string): Promise<number> {
    const leafIds = Array.from({ length: 12 }, (_value, index) => `leaf${String(index)}`);
    const wedgeData: NetworkDiagramData = {
        links: leafIds.map((target) => ({ source: 'hub', target })),
        nodes: [{ id: 'hub', label: 'Hub Label Here' }, ...leafIds.map((id) => ({ id, label: id }))]
    };
    const placement = { labelPlacementId: 'outside' as const, wrapsLabels: true };
    const options = labelHaloColor == null ? placement : { ...placement, labelHaloColor };
    const view = await new D3Tool().renderNetworkDiagram(wedgeData, document.createElement('div'), options);
    view.triggerAutoLayout();
    const text = findNodeElement(view.svg, 'Hub LabelHere')?.querySelector('text'); // The label's two lines, read as one text.
    return Math.hypot(Number(text?.querySelector('tspan')?.getAttribute('x')), Number(text?.getAttribute('y')));
}

// How far a diagram with labels beside its nodes is scaled to fit a container 300 wide.
async function measureFitScale(fittedData: NetworkDiagramData): Promise<number> {
    const container = constructSizedContainer();
    container.setWidth(300);
    const view = await new D3Tool().renderNetworkDiagram(fittedData, container.element, { fitsView: true, labelPlacementId: 'outside' });
    view.triggerAutoLayout();
    return readScale(view.svg.querySelector('g'));
}

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

// jsdom lays nothing out, so a container's size is whatever the test says it is. It starts 800 wide, and with no height
// the diagram takes its default height of 480.
function constructSizedContainer(): { element: HTMLDivElement; setHeight: (newHeight: number) => void; setWidth: (newWidth: number) => void } {
    const element = document.createElement('div');
    let currentWidth = 800;
    let currentHeight = 0;
    Object.defineProperties(element, { clientHeight: { get: () => currentHeight }, clientWidth: { get: () => currentWidth } });
    return {
        element,
        setHeight: (newHeight) => {
            currentHeight = newHeight;
        },
        setWidth: (newWidth) => {
            currentWidth = newWidth;
        }
    };
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

function readScale(element: Element | null | undefined): number {
    return Number(/scale\(([^)]+)\)/.exec(element?.getAttribute('transform') ?? '')?.[1]);
}

function readTranslateX(element: Element | null | undefined): number {
    return Number(/translate\(([^,]+),/.exec(element?.getAttribute('transform') ?? '')?.[1]);
}

function readTranslateY(element: Element | null | undefined): number {
    return Number(/,([^)]+)\)/.exec(element?.getAttribute('transform') ?? '')?.[1]);
}
