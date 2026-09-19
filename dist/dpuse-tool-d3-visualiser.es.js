//#region src/index.ts
var e = class {
	async renderBillboardJS(e, t, n) {
		let { renderBillboardJS: r } = await import("./billboardJs-PR7IsnhE.js"), i = r(e, t);
		return n?.(), {
			chart: i.chart,
			destroy: i.destroy,
			resize: i.resize,
			vendorId: "billboard.js"
		};
	}
	async renderObservablePlot(e, t, n, r) {
		let { renderObservablePlot: i } = await import("./observablePlot-CGF3S2mL.js"), a = i(e, t, n);
		return r?.(), {
			resize: a.resize,
			get svg() {
				return a.svg;
			},
			vendorId: "observable-plot"
		};
	}
	async renderD3BarChart(e, t, n) {
		let { renderD3BarChart: r } = await import("./d3BarChart-BC05DvRv.js"), i = r(e, t);
		return n?.(), {
			resize: i.resize,
			get svg() {
				return i.svg;
			},
			vendorId: "d3"
		};
	}
	async renderTanStackCharts(e, t, n) {
		let { renderTanStackCharts: r } = await import("./tanStackCharts-D-ip-ZV-.js"), i = r(e, t);
		return n?.(), {
			destroy: i.destroy,
			resize: i.resize,
			get svg() {
				return i.svg;
			},
			vendorId: "tanstack-charts"
		};
	}
	async renderChordDiagram(e, t, n, r) {
		let { renderChordDiagram: i } = await import("./chordDiagram-B1_nfC1m.js"), a = i(e, t, n);
		return r?.(), {
			resize: a.resize,
			get svg() {
				return a.svg;
			},
			vendorId: "unovis"
		};
	}
	async renderErdDiagram(e, t, n, r) {
		let { renderErdDiagram: i } = await import("./erdDiagram-CtPeCq0f.js"), a = i(e, t, n);
		return r?.(), {
			resize: a.resize,
			get svg() {
				return a.svg;
			},
			vendorId: "d3"
		};
	}
	async renderNetworkDiagram(e, t, n, r) {
		let { renderNetworkDiagram: i } = await import("./networkDiagram-DZwLfY_R.js"), a = i(e, t, n);
		return r?.(), {
			destroy: a.destroy,
			resize: a.resize,
			get svg() {
				return a.svg;
			},
			triggerAutoLayout: a.triggerAutoLayout,
			vendorId: "d3"
		};
	}
	async renderSankeyDiagram(e, t, n, r) {
		let { renderSankeyDiagram: i } = await import("./sankeyDiagram-DOF6arSJ.js"), a = i(e, t, n);
		return r?.(), {
			resize: a.resize,
			get svg() {
				return a.svg;
			},
			vendorId: "d3"
		};
	}
	async renderTreeDiagram(e, t, n, r) {
		let { renderTreeDiagram: i } = await import("./treeDiagram-FUVkkblR.js"), a = i(e, t, n);
		return r?.(), {
			resize: a.resize,
			get svg() {
				return a.svg;
			},
			vendorId: "d3"
		};
	}
};
//#endregion
export { e as Tool };
