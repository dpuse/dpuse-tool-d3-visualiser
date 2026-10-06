// TODO: See https://d3-graph-gallery.com/index.html.

// ── DPUse Framework
import type { PresentationView } from '@dpuse/dpuse-shared';

// ── Local Framework
import type { BarChartData } from '@/tanStackCharts';
import type { ChordDiagramData, ChordDiagramOptions } from '@/chordDiagram';
import type { ErdDiagramData, ErdDiagramOptions } from '@/erdDiagram';
import type { NetworkDiagramData, NetworkDiagramOptions } from '@/networkDiagram';
import type { SankeyDiagramData, SankeyDiagramOptions } from '@/sankeyDiagram';
import type { TreeDiagramNode, TreeDiagramOptions } from '@/treeDiagram';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export type { BarChartData, BarChartSeries } from '@/tanStackCharts';
export type { ChordDiagramData, ChordDiagramLink, ChordDiagramNode, ChordDiagramOptions } from '@/chordDiagram';
export type { ErdDiagramData, ErdDiagramEdge, ErdDiagramNode, ErdDiagramNodeTypeId, ErdDiagramOptions } from '@/erdDiagram';
export type { NetworkDiagramData, NetworkDiagramLink, NetworkDiagramNode, NetworkDiagramOptions } from '@/networkDiagram';
export type { SankeyDiagramData, SankeyDiagramLink, SankeyDiagramNode, SankeyDiagramOptions } from '@/sankeyDiagram';
export type { TreeDiagramNode, TreeDiagramNodeRoleId, TreeDiagramOptions } from '@/treeDiagram';

export interface D3View extends PresentationView {
    svg: SVGSVGElement;
}

export interface D3NetworkView extends D3View {
    destroy: () => void;
    triggerAutoLayout: () => void;
}

export interface D3TanStackChartsView extends D3View {
    destroy: () => void;
}

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

const D3_ID = 'd3';

// ── Tools ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export class Tool {
    // Actions - Render bar chart using TanStack Charts (pre-alpha as of 0.6.4 - its vanilla-DOM mountChart() API is undocumented and may change).
    async renderTanStackCharts(data: BarChartData, renderTo: HTMLElement, callback?: () => void): Promise<D3TanStackChartsView> {
        const { renderTanStackCharts } = await import('@/tanStackCharts');
        const handle = renderTanStackCharts(data, renderTo);
        callback?.();
        return {
            destroy: handle.destroy,
            resize: handle.resize,
            get svg() {
                return handle.svg;
            },
            vendorId: 'tanstack-charts'
        };
    }

    // Actions - Render chord diagram (Unovis).
    async renderChordDiagram(data: ChordDiagramData, renderTo: HTMLElement, options?: ChordDiagramOptions, callback?: () => void): Promise<D3View> {
        const { renderChordDiagram } = await import('@/chordDiagram');
        const handle = renderChordDiagram(data, renderTo, options);
        callback?.();
        return {
            resize: handle.resize,
            get svg() {
                return handle.svg;
            },
            vendorId: 'unovis'
        };
    }

    // Actions - Render ERD diagram.
    async renderErdDiagram(data: ErdDiagramData, renderTo: HTMLElement, options?: ErdDiagramOptions, callback?: () => void): Promise<D3View> {
        const { renderErdDiagram } = await import('@/erdDiagram');
        const handle = renderErdDiagram(data, renderTo, options);
        callback?.();
        return {
            resize: handle.resize,
            get svg() {
                return handle.svg;
            },
            vendorId: D3_ID
        };
    }

    // Actions - Render network diagram.
    async renderNetworkDiagram(data: NetworkDiagramData, renderTo: HTMLElement, options?: NetworkDiagramOptions, callback?: () => void): Promise<D3NetworkView> {
        const { renderNetworkDiagram } = await import('@/networkDiagram');
        const handle = renderNetworkDiagram(data, renderTo, options);
        callback?.();
        return {
            destroy: handle.destroy,
            resize: handle.resize,
            get svg() {
                return handle.svg;
            },
            triggerAutoLayout: handle.triggerAutoLayout,
            vendorId: D3_ID
        };
    }

    // Actions - Render Sankey diagram.
    async renderSankeyDiagram(data: SankeyDiagramData, renderTo: HTMLElement, options?: SankeyDiagramOptions, callback?: () => void): Promise<D3View> {
        const { renderSankeyDiagram } = await import('@/sankeyDiagram');
        const handle = renderSankeyDiagram(data, renderTo, options);
        callback?.();
        return {
            resize: handle.resize,
            get svg() {
                return handle.svg;
            },
            vendorId: D3_ID
        };
    }

    // Actions - Render tree diagram.
    async renderTreeDiagram(data: TreeDiagramNode, renderTo: HTMLElement, options?: TreeDiagramOptions, callback?: () => void): Promise<D3View> {
        const { renderTreeDiagram } = await import('@/treeDiagram');
        const handle = renderTreeDiagram(data, renderTo, options);
        callback?.();
        return {
            resize: handle.resize,
            get svg() {
                return handle.svg;
            },
            vendorId: D3_ID
        };
    }
}
