// @vitest-environment happy-dom

// ── External Dependencies & Registrations
import { describe, expect, it } from 'vitest';

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
});
