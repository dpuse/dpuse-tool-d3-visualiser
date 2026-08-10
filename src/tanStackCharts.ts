// ── External Dependencies & Registrations
import { group } from '@tanstack/charts/group';
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand, scaleLinear } from 'd3-scale';

// ── DPUse Framework
import type { SanitizeHTML } from '@dpuse/dpuse-shared/component/module/presenter';

// ── Local
import type { BarChartData } from '@/billboardJs';

export type { BarChartData, BarChartSeries } from '@/billboardJs';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

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

// ── State ────────────────────────────────────────────────────────────────────────────────────────────────────────────

const templatePatchState: { patched: boolean; sanitizeHTML?: SanitizeHTML } = { patched: false };

// ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────────

// TanStack Charts is pre-alpha (0.6.4) - its vanilla-DOM API (mountChart) is undocumented and may change between releases.
export function renderTanStackCharts(data: BarChartData, renderTo: HTMLElement, sanitizeHTML: SanitizeHTML): TanStackChartsHandle {
    ensureTemplateInnerHTMLPatched(sanitizeHTML);
    const rows = toBarRows(data);

    const definition = defineChart({
        marks: [barY(rows, { color: 'seriesName', fill: 'seriesName', layout: group(), x: 'category', y: 'value', z: 'seriesName' })],
        x: { scale: () => scaleBand().padding(0.2) },
        y: { grid: true, nice: true, scale: scaleLinear }
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

// TanStack Charts' reconciler (reconcile.js / motion.js) has no Trusted Types awareness: every DOM update writes
// generated markup into a throwaway <template> element's 'innerHTML' - a raw Trusted Types HTML sink. The host
// app's page-wide 'default' Trusted Types policy is a deliberate fail-safe that blanks any HTML sink write it
// doesn't recognize (see dpuse-app's main.ts), so those writes would otherwise silently render nothing.
//
// This patches only 'HTMLTemplateElement.prototype.innerHTML' (as an own property shadowing the inherited
// 'Element.prototype' accessor, so no other element type on the page is affected) to route the value through the
// caller-supplied sanitizeHTML before delegating to the real native setter. The <template> content here is
// TanStack's own generated markup, not user-supplied HTML, but running it through the same sanitizer used
// elsewhere keeps this consistent with the rest of the app's Trusted Types model rather than trusting it blindly.
function ensureTemplateInnerHTMLPatched(sanitizeHTML: SanitizeHTML): void {
    templatePatchState.sanitizeHTML = sanitizeHTML;
    if (templatePatchState.patched) return;
    templatePatchState.patched = true;

    const native = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
    // eslint-disable-next-line @typescript-eslint/unbound-method -- called below via '.call(this, ...)', so it never loses its 'this' binding.
    const nativeSet = native?.set;
    if (nativeSet == null) return;

    Object.defineProperty(HTMLTemplateElement.prototype, 'innerHTML', {
        ...native,
        set(value: string) {
            const sanitize = templatePatchState.sanitizeHTML ?? ((html: string): string => html);
            // eslint-disable-next-line unicorn/no-this-outside-of-class -- forwards the real element instance to the native setter; an arrow function couldn't receive a caller-supplied 'this'.
            nativeSet.call(this, sanitize(value) as string);
        }
    });
}

function toBarRows(data: BarChartData): TanStackBarRow[] {
    const rows: TanStackBarRow[] = [];
    for (const series of data.series) {
        for (const [index, category] of data.categories.entries()) {
            rows.push({ category, seriesName: series.name, value: series.values[index] ?? 0 });
        }
    }
    return rows;
}
