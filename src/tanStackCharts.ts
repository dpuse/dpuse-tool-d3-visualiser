// ── External Dependencies & Registrations
import { group } from '@tanstack/charts/group';
import { mountChart } from '@tanstack/charts/dom';
import { barY, defineChart } from '@tanstack/charts';
import { scaleBand, scaleLinear } from 'd3-scale';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export interface BarChartSeries {
    name: string;
    values: number[];
}

export interface BarChartData {
    categories: string[];
    series: BarChartSeries[];
}

export interface TanStackChartsHandle {
    destroy: () => void;
    resize: () => void;
    svg: SVGSVGElement;
}

interface TanStackBarRow {
    category: string;
    seriesName: string;
    value: number;
}

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// TanStack Charts is pre-1.0 (0.18) and its API still changes between releases: 0.18 moved the axes under 'scales' and
// 'mountChart' to '@tanstack/charts/dom'.
export function renderTanStackCharts(data: BarChartData, renderTo: HTMLElement): TanStackChartsHandle {
    const rows = toBarRows(data);

    const definition = defineChart({
        marks: [barY(rows, { color: 'seriesName', fill: 'seriesName', layout: group(), x: 'category', y: 'value', z: 'seriesName' })],
        scales: {
            x: { scale: () => scaleBand().padding(0.2) },
            y: { grid: true, nice: true, scale: scaleLinear }
        }
    });

    const hostOptions = { ariaLabel: 'Bar chart', definition };
    const host = mountChart(renderTo, hostOptions);

    function getSvg(): SVGSVGElement {
        const svgNode = renderTo.querySelector('svg');
        if (svgNode == null) throw new Error('Failed to create TanStack Charts SVG element.');
        return svgNode;
    }

    return {
        destroy: () => {
            host.destroy();
        },
        resize: () => {
            host.update(hostOptions);
        },
        get svg() {
            return getSvg();
        }
    };
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

function toBarRows(data: BarChartData): TanStackBarRow[] {
    const rows: TanStackBarRow[] = [];
    for (const series of data.series) {
        for (const [index, category] of data.categories.entries()) {
            rows.push({ category, seriesName: series.name, value: series.values[index] ?? 0 });
        }
    }
    return rows;
}
