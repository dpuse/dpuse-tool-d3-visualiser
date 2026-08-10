import { SanitizeHTML } from '@dpuse/dpuse-shared/component/module/presenter';
import { BarChartData } from './billboardJs';
export type { BarChartData, BarChartSeries } from './billboardJs';
export interface TanStackChartsHandle {
    destroy: () => void;
    resize: () => void;
    svg: SVGSVGElement;
}
export declare function renderTanStackCharts(data: BarChartData, renderTo: HTMLElement, sanitizeHTML: SanitizeHTML): TanStackChartsHandle;
