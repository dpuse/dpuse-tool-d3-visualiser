import { t as e } from "./linear-q6e-7JBm.js";
import { t } from "./band-p1VbTxZM.js";
import { r as n, t as r } from "./array-Cv4-2llb.js";
//#region node_modules/d3-shape/src/offset/none.js
function i(e, t) {
	if ((o = e.length) > 1) for (var n = 1, r, i, a = e[t[0]], o, s = a.length; n < o; ++n) for (i = a, a = e[t[n]], r = 0; r < s; ++r) a[r][1] += a[r][0] = isNaN(i[r][1]) ? i[r][0] : i[r][1];
}
//#endregion
//#region node_modules/d3-shape/src/order/none.js
function a(e) {
	for (var t = e.length, n = Array(t); --t >= 0;) n[t] = t;
	return n;
}
//#endregion
//#region node_modules/d3-shape/src/stack.js
function o(e, t) {
	return e[t];
}
function s(e) {
	let t = [];
	return t.key = e, t;
}
function c() {
	var e = n([]), t = a, c = i, l = o;
	function u(n) {
		var i = Array.from(e.apply(this, arguments), s), a, o = i.length, u = -1, d;
		for (let e of n) for (a = 0, ++u; a < o; ++a) (i[a][u] = [0, +l(e, i[a].key, u, n)]).data = e;
		for (a = 0, d = r(t(i)); a < o; ++a) i[d[a]].index = a;
		return c(i, d), i;
	}
	return u.keys = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : n(Array.from(t)), u) : e;
	}, u.value = function(e) {
		return arguments.length ? (l = typeof e == "function" ? e : n(+e), u) : l;
	}, u.order = function(e) {
		return arguments.length ? (t = e == null ? a : typeof e == "function" ? e : n(Array.from(e)), u) : t;
	}, u.offset = function(e) {
		return arguments.length ? (c = e ?? i, u) : c;
	}, u;
}
//#endregion
//#region node_modules/d3-shape/src/offset/expand.js
function l(e, t) {
	if ((r = e.length) > 0) {
		for (var n, r, a = 0, o = e[0].length, s; a < o; ++a) {
			for (s = n = 0; n < r; ++n) s += e[n][a][1] || 0;
			if (s) for (n = 0; n < r; ++n) e[n][a][1] /= s;
		}
		i(e, t);
	}
}
//#endregion
//#region node_modules/d3-shape/src/offset/silhouette.js
function u(e, t) {
	if ((a = e.length) > 0) {
		for (var n = 0, r = e[t[0]], a, o = r.length; n < o; ++n) {
			for (var s = 0, c = 0; s < a; ++s) c += e[s][n][1] || 0;
			r[n][1] += r[n][0] = -c / 2;
		}
		i(e, t);
	}
}
//#endregion
//#region node_modules/d3-shape/src/offset/wiggle.js
function d(e, t) {
	if ((s = e.length) > 0 && (o = (a = e[t[0]]).length) > 0) {
		for (var n = 0, r = 1, a, o, s; r < o; ++r) {
			for (var c = 0, l = 0, u = 0; c < s; ++c) {
				for (var d = e[t[c]], f = d[r][1] || 0, p = (f - (d[r - 1][1] || 0)) / 2, m = 0; m < c; ++m) {
					var h = e[t[m]], g = h[r][1] || 0, _ = h[r - 1][1] || 0;
					p += g - _;
				}
				l += f, u += p * f;
			}
			a[r - 1][1] += a[r - 1][0] = n, l && (n -= u / l);
		}
		a[r - 1][1] += a[r - 1][0] = n, i(e, t);
	}
}
//#endregion
//#region node_modules/d3-shape/src/order/appearance.js
function f(e) {
	var t = e.map(p);
	return a(e).sort(function(e, n) {
		return t[e] - t[n];
	});
}
function p(e) {
	for (var t = -1, n = 0, r = e.length, i, a = -Infinity; ++t < r;) (i = +e[t][1]) > a && (a = i, n = t);
	return n;
}
//#endregion
//#region node_modules/d3-shape/src/order/ascending.js
function m(e) {
	for (var t = 0, n = -1, r = e.length, i; ++n < r;) (i = +e[n][1]) && (t += i);
	return t;
}
//#endregion
//#region node_modules/d3-shape/src/order/insideOut.js
function h(e) {
	var t = e.length, n, r, i = e.map(m), a = f(e), o = 0, s = 0, c = [], l = [];
	for (n = 0; n < t; ++n) r = a[n], o < s ? (o += i[r], c.push(r)) : (s += i[r], l.push(r));
	return l.reverse().concat(c);
}
//#endregion
//#region node_modules/@tanstack/charts/dist/group.js
function g(e = {}) {
	return {
		type: "group",
		...e
	};
}
//#endregion
//#region node_modules/@tanstack/charts/dist/scale-input.js
function _(e, t) {
	let n = v(e), r = n ? e() : e;
	if (typeof r != "function" || typeof r.copy != "function" || typeof r.domain != "function" || typeof r.range != "function") throw TypeError("A scale factory must return a copyable scale with domain and range methods");
	let i = r.copy();
	if (n) {
		let e = y(i, t.values, t.includeZero);
		e && i.domain(e);
	}
	return S(i, t.nice, t.niceCount), i;
}
function v(e) {
	return typeof e == "function" && !("copy" in e);
}
function y(e, t, n = !1) {
	if (typeof e.bandwidth == "function" || typeof e.ticks != "function") {
		let e = [], n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
		for (let i of t) {
			if (!N(i)) continue;
			let t = i instanceof Date, a = t ? i.getTime() : i, o = t ? r : n;
			o.has(a) || (o.add(a), e.push(i));
		}
		return e.length ? e : void 0;
	}
	let r = t.filter(N);
	if (!r.length) return;
	if (e.domain().some((e) => e instanceof Date)) {
		let e = r.filter((e) => e instanceof Date);
		if (e.length !== r.length) throw TypeError("A temporal scale factory requires Date channel values");
		let t = Infinity, n = -Infinity;
		for (let r of e) {
			let e = r.getTime();
			t = Math.min(t, e), n = Math.max(n, e);
		}
		if (!Number.isFinite(t) || !Number.isFinite(n)) throw TypeError("A temporal scale factory requires Date channel values");
		if (t === n) {
			let e = 432e5;
			t -= e, n += e;
		}
		return [new Date(t), new Date(n)];
	}
	let i = Infinity, a = -Infinity;
	for (let e of r) {
		if (!P(e)) throw TypeError("A quantitative scale factory requires numeric values");
		i = Math.min(i, e), a = Math.max(a, e);
	}
	if (!Number.isFinite(i) || !Number.isFinite(a)) throw TypeError("A quantitative scale factory requires numeric values");
	let o = b(e);
	if (n) {
		if (o) throw TypeError("An inferred log scale cannot include an implicit zero baseline");
		i = Math.min(0, i), a = Math.max(0, a);
	}
	if (x(e, i, a), i === a) {
		if (i === 0) return [0, 1];
		let e = Math.abs(i) * .05 || 1;
		i -= e, a += e;
	}
	return [i, a];
}
function b(e) {
	return "base" in e && typeof e.base == "function";
}
function x(e, t, n) {
	if (b(e) && (t === 0 || n === 0 || t < 0 && n > 0)) throw TypeError("An inferred log domain cannot include or cross zero");
}
function S(e, t, n = 5) {
	if (!t) return;
	let r = e;
	if (typeof r.nice != "function") throw TypeError("This scale does not support nicening");
	r.nice(typeof t == "number" ? t : n);
}
//#endregion
//#region node_modules/@tanstack/charts/dist/scales.js
function C(e, t, n) {
	if (t?.scale) {
		let r = E(t.scale), i = r ? t.scale() : t.scale;
		if (typeof i != "function" || typeof i.copy != "function") throw TypeError("A color scale must be callable and copyable");
		if (r && (typeof i.domain != "function" || typeof i.range != "function")) throw TypeError("A color scale factory must return a scale with domain and range methods");
		let a = i.copy(), o = A(a);
		if (r) {
			let n = a;
			t.range?.length && n.range(t.range);
			let r = t.domain ?? D(n, e);
			(t.domain !== void 0 || r.length) && n.domain(r);
			let i = n.range();
			if (!i.length || i.some((e) => typeof e != "string")) throw TypeError("A color-scale factory requires a string range");
		}
		if (t.nice) {
			let e = a.nice;
			if (typeof e != "function") throw TypeError("This color scale does not support nicening");
			e.call(a, typeof t.nice == "number" ? t.nice : 5);
		}
		let s = a.domain?.() ?? t.domain ?? [], c = (a.range?.() ?? t.range ?? n.palette).map(String);
		return {
			type: "configured",
			kind: o,
			domain: s,
			range: c,
			map: (e) => {
				if (e == null) return c[0] ?? "currentColor";
				let t = a(e);
				return t == null ? "currentColor" : String(t);
			}
		};
	}
	if (t?.resolver) return t.resolver.resolve({
		values: e,
		domain: t.domain,
		range: t.range,
		theme: n
	});
	let r = t?.range?.length ? t.range : n.palette, i = w(t?.domain ?? e), a = i.map(j);
	return {
		type: "ordinal",
		kind: "categorical",
		domain: i,
		range: r,
		map: (e) => {
			if (e == null) return r[0] ?? "currentColor";
			let t = a.indexOf(j(e));
			return t < 0 && (t = a.push(j(e)) - 1), r[t % r.length] ?? "currentColor";
		}
	};
}
function w(e) {
	return [...new Set(e.filter(T))];
}
function T(e) {
	return typeof e == "string" || typeof e == "number";
}
function E(e) {
	return typeof e == "function" && !("copy" in e);
}
function D(e, t) {
	let n = t.filter(T), r = e.quantiles, i = e.thresholds;
	if (r) return O(n);
	if (e.invertExtent && !i) throw TypeError("Threshold color-scale factory requires an explicit domain");
	if (e.ticks || i) {
		let t = O(n), r = Infinity, a = -Infinity;
		for (let e of t) r = Math.min(r, e), a = Math.max(a, e);
		if (!Number.isFinite(r) || !Number.isFinite(a)) return [];
		if (x(e, r, a), r === a) {
			if (r === 0) a = 1;
			else {
				let e = Math.abs(r) * .05 || 1;
				r -= e, a += e;
			}
		}
		if (i) return [r, a];
		let o = Math.max(2, e.domain().length, e.range().length);
		return Array.from({ length: o }, (e, t) => r + (a - r) * t / (o - 1));
	}
	return w(n);
}
function O(e) {
	let t = e.filter((e) => typeof e == "number" && Number.isFinite(e));
	return t.length !== e.length && k(), t;
}
function k() {
	throw TypeError("A quantitative color-scale factory requires numeric values");
}
function A(e) {
	return e.quantiles ? e.invertExtent ? "quantile" : "continuous" : e.thresholds ? "quantize" : e.invertExtent ? "threshold" : e.ticks ? "continuous" : "categorical";
}
function j(e) {
	return e instanceof Date ? `date:${e.getTime()}` : typeof e == "string" ? `string:${e.length}:${e}` : `${typeof e}:${String(e)}`;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/mark.js
var M = /* @__PURE__ */ new WeakSet();
function N(e) {
	return typeof e == "string" || e instanceof Date && Number.isFinite(e.getTime()) || P(e);
}
function P(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function ee(e, t, n) {
	return {
		initialize: (r) => {
			let i = ne(e(r)), a = t === void 0 || i.motion !== void 0 ? i : {
				...i,
				motion: t
			};
			return n === void 0 ? a : F(a, n);
		},
		...t === void 0 ? {} : { motion: t },
		...n === void 0 ? {} : { renderer: n }
	};
}
function F(e, t) {
	let n = e.render, r = e.resolveLayout;
	return {
		...e,
		render: (e) => te(n(e), t),
		...r ? { resolveLayout(e) {
			let n = r(e);
			return {
				...n,
				render: (e) => te(n.render(e), t)
			};
		} } : {}
	};
}
function te(e, t) {
	return {
		...e,
		nodes: e.nodes.map((e) => ({
			...e,
			renderer: t
		})),
		...e.focusGuides ? { focusGuides: e.focusGuides.map((e) => ({
			...e,
			renderer: t
		})) } : {}
	};
}
function ne(e) {
	return typeof e.render == "function" ? e : {
		...e,
		render: () => {
			throw TypeError(`Mark "${e.id}" must resolve its layout before rendering`);
		}
	};
}
function I(e, t) {
	return t?.length ? {
		data: e,
		definitions: t
	} : void 0;
}
function re(e, t, n, r, i) {
	return typeof e == "function" ? e(t, {
		index: n,
		data: r
	}) : e ?? i;
}
function L(e, t, n) {
	return typeof t == "function" ? e.map((n, r) => t(n, {
		index: r,
		data: e
	})) : t === void 0 ? e.map((t, r) => n(t, {
		index: r,
		data: e
	})) : e.map((e) => typeof e == "object" && e ? e[t] : void 0);
}
function ie(e, t, n = {}) {
	if (t !== void 0) return L(e, t, (e, { index: t }) => t);
	let r = [
		e.map((e) => typeof e == "object" && e ? e.id : void 0),
		e.map((e) => {
			if (typeof e != "object" || !e) return;
			let t = e.data;
			return typeof t == "object" && t ? t.id : void 0;
		}),
		...n.candidates ?? []
	];
	for (let t of r) {
		if (t.length !== e.length) continue;
		let r = t.map(ae);
		if (r.every((e) => e !== void 0) && oe(r, n.groups)) return r;
	}
	return se(n.markId, n.candidates, n.warningIdentity), e.map((e, t) => t);
}
function ae(e) {
	if (T(e)) return e;
	if (e instanceof Date && Number.isFinite(e.getTime())) return `date:${e.getTime()}`;
}
function oe(e, t) {
	let n = /* @__PURE__ */ new Set();
	for (let r = 0; r < e.length; r += 1) {
		let i = JSON.stringify([j(t?.[r] ?? null), j(e[r])]);
		if (n.has(i)) return !1;
		n.add(i);
	}
	return !0;
}
function se(e, t, n) {
	e && t?.length && n && !M.has(n) && typeof process < "u" && process.env.NODE_ENV !== "production" && (M.add(n), console.warn(`TanStack Charts could not infer a unique key for mark "${e}". Using row position; supply key for stable identity across updates.`));
}
//#endregion
//#region node_modules/@tanstack/charts/dist/stack-internal.js
function ce(e, t = {}) {
	let n = ue(t);
	if (e.length === 0) return /* @__PURE__ */ new Map();
	let r = [], a = /* @__PURE__ */ new Map(), o = [], s = /* @__PURE__ */ new Set();
	for (let t of e) {
		let e = j(t.position);
		a.has(e) || (a.set(e, r.length), r.push(t.position));
		let n = j(t.series);
		s.has(n) || (s.add(n), o.push(t.series));
	}
	let f = r.map(() => /* @__PURE__ */ Object.create(null)), p = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = a.get(j(t.position)), n = j(t.series), r = `${e}:${n}`;
		if (p.has(r)) throw TypeError(`A stack requires at most one value for each position and series; duplicate ${String(t.position)} / ${String(t.series)}`);
		p.set(r, t.index), f[e][n] = t.value;
	}
	let m = t.order === "inside-out";
	if (n !== void 0 && e.some(({ value: e }) => e < 0)) throw TypeError("A stack anchor requires nonnegative values");
	let g = he(e, o, t.order);
	t.reverse && !m && g.reverse();
	let _ = g.map(j), v = t.anchor ? i : t.offset === "normalize" ? l : t.offset === "center" ? u : t.offset === "wiggle" ? d : le, y = c().keys(_).value((e, t) => e[t] ?? 0).offset(v);
	m && y.order(t.reverse ? (e) => h(e).reverse() : h);
	let b = y(f);
	t.anchor && n !== void 0 && de(b, t.anchor.series, n), t.offset === "wiggle" && R(b);
	let x = /* @__PURE__ */ new Map();
	return b.forEach((e) => {
		let t = e.key;
		e.forEach((e, n) => {
			let r = p.get(`${n}:${t}`);
			r !== void 0 && x.set(r, {
				start: e[0],
				end: e[1]
			});
		});
	}), x;
}
function le(e, t) {
	if (e.length === 0) return;
	let n = e.map((e) => {
		let t = !1, n = !1;
		for (let [r, i] of e) {
			let e = i - r;
			e < 0 ? t = !0 : e > 0 && (n = !0);
		}
		return t && !n;
	}), r = e[t[0]].length;
	for (let i = 0; i < r; i += 1) {
		let r = 0, a = 0;
		for (let o of t) {
			let t = e[o][i], s = t[1] - t[0];
			s > 0 ? (t[0] = r, t[1] = r += s) : s < 0 ? (t[1] = a, t[0] = a += s) : s === 0 ? t[0] = t[1] = n[o] ? a : r : (t[0] = 0, t[1] = s);
		}
	}
}
function ue(e) {
	let t = e.anchor;
	if (!t) return;
	if (e.offset !== void 0 && e.offset !== "diverging") throw TypeError("A stack anchor can only be used with the diverging offset");
	let n = t.fraction ?? .5;
	if (!Number.isFinite(n) || n < 0 || n > 1) throw TypeError("A stack anchor fraction must be between zero and one");
	return n;
}
function de(e, t, n) {
	let r = j(t), i = e.find((e) => e.key === r);
	if (!i) throw TypeError(`Stack anchor series "${String(t)}" is not in the resolved series order`);
	i.forEach((t, r) => {
		let i = t[0] + (t[1] - t[0]) * n;
		for (let t of e) {
			let e = t[r];
			e && (e[0] -= i, e[1] -= i);
		}
	});
}
function R(e) {
	let t = Infinity;
	for (let n of e) for (let e of n) t = Math.min(t, e[0]);
	if (Number.isFinite(t) && t !== 0) for (let n of e) for (let e of n) e[0] -= t, e[1] -= t;
}
function fe(e, t, n, r = {}, i = "value") {
	let a = [];
	for (let r = 0; r < e.length; r += 1) {
		let o = e[r], s = t[r];
		if (!pe(o) || !me(s)) continue;
		let c = n[r];
		a.push({
			index: r,
			position: o,
			value: s,
			series: z(c) ? c : i === "index" ? r : "value"
		});
	}
	let o = ce(a, r), s = Array.from({ length: e.length }, () => void 0), c = Array.from({ length: e.length }, () => void 0);
	for (let [e, t] of o) s[e] = t.start, c[e] = t.end;
	return {
		starts: s,
		ends: c
	};
}
function z(e) {
	return typeof e == "string" || typeof e == "number";
}
function pe(e) {
	return typeof e == "string" || me(e) || e instanceof Date && Number.isFinite(e.getTime());
}
function me(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function he(e, t, n) {
	if (Array.isArray(n)) {
		let e = [...n], r = new Set(e.map(j));
		return [...e, ...t.filter((e) => !r.has(j(e)))];
	}
	if (n !== "ascending" && n !== "descending") return [...t];
	let r = new Map(t.map((e) => [j(e), 0]));
	for (let t of e) {
		let e = j(t.series);
		r.set(e, (r.get(e) ?? 0) + Math.abs(t.value));
	}
	return [...t].sort((e, t) => {
		let i = (r.get(j(e)) ?? 0) - (r.get(j(t)) ?? 0);
		return n === "ascending" ? i : -i;
	});
}
//#endregion
//#region node_modules/@tanstack/charts/dist/configured-scale.js
function B(e, t) {
	let n = _(e, {
		values: t.values,
		includeZero: t.includeZero,
		nice: t.options?.nice,
		niceCount: t.tickCount
	}), r = ye(n.domain()), i = ge(n, t, r), a = n.bandwidth !== void 0, o = a && t.channel === "y" ? [Math.min(...t.range), Math.max(...t.range)] : t.range, s = t.options?.reverse ? [o[1], o[0]] : o;
	n.range(s);
	let c = ye(n.domain());
	if (i && (!_e(c, i.domain) || !ve(n, i.domain, s))) throw TypeError(`Chart viewport "${t.id}" requires independent configurable domain and range capabilities`);
	let l = t.options?.axis === !1 ? void 0 : t.options?.axis?.ticks, u = l === !1 ? void 0 : l, d = u?.values ?? n.ticks?.(t.tickCount) ?? c, f = n.tickFormat?.(t.tickCount), p = n.bandwidth?.() ?? 0, m = (e) => {
		let t = n(e);
		return t === void 0 ? NaN : t + p / 2;
	}, h = n.invert ? (e) => n.invert(e - p / 2) : void 0;
	return {
		id: t.id,
		type: a ? "band" : "configured",
		domain: c,
		map: m,
		...h ? { invert: h } : {},
		ticks: d.map((e) => ({
			value: e,
			position: m(e),
			label: u?.format?.(e) ?? f?.(e) ?? De(e)
		})),
		bandwidth: p,
		...i ? { viewport: {
			contentDomain: r,
			domain: i.domain,
			translate: i.translate,
			map: (e) => m(e) + i.translate
		} } : {}
	};
}
function ge(e, t, n) {
	let r = t.options?.viewport;
	if (!r) return;
	let i = e;
	if (e.bandwidth !== void 0 || typeof e.ticks != "function" || typeof i.invert != "function") throw TypeError(`Chart viewport "${t.id}" requires a continuous numeric or temporal scale`);
	if (typeof i.clamp == "function" && i.clamp() === !0) throw TypeError(`Chart viewport "${t.id}" does not support a clamped scale`);
	let a = r.domain;
	(a.length !== 2 || !Ce(a[0], a[1])) && Ee(t.id);
	let o = we(a[0]), s = we(a[1]);
	(!Number.isFinite(o) || !Number.isFinite(s) || o === s) && Ee(t.id), xe(e, t.id, n, a);
	let c = r.translate ?? 0;
	if (!Number.isFinite(c)) throw TypeError(`Chart viewport "${t.id}" translate must be a finite number`);
	_e(e.domain(), a) && V(e, [a[1], a[0]], t.id), V(e, a, t.id);
	let l = ye(e.domain());
	return (l.length !== 2 || !Ce(l[0], l[1])) && be(t.id), {
		domain: l,
		translate: c
	};
}
function V(e, t, n) {
	let r = e.domain;
	try {
		r.call(e, [...t]);
	} catch {
		be(n);
	}
	_e(e.domain(), t) || be(n);
}
function _e(e, t) {
	return e.length === t.length && e.every((e, n) => Te(e, t[n]));
}
function ve(e, t, n) {
	let r = e(t[0]), i = e(t[1]);
	return r !== void 0 && i !== void 0 && Number.isFinite(r) && Number.isFinite(i) && Math.abs(r - n[0]) <= 1e-6 && Math.abs(i - n[1]) <= 1e-6;
}
function ye(e) {
	return e.map((e) => e instanceof Date ? new Date(e.getTime()) : e);
}
function be(e) {
	throw TypeError(`Chart viewport "${e}" requires a scale with a configurable domain`);
}
function xe(e, t, n, r) {
	if (!b(e)) return;
	let i = Se(n), a = Se(r);
	if (i === void 0 || a === void 0 || i !== a) throw TypeError(`Chart viewport "${t}" logarithmic content and viewport domains must be finite, nonzero, and stay on the same side of zero`);
}
function Se(e) {
	let t;
	for (let n of e) {
		if (typeof n != "number" || !Number.isFinite(n) || n === 0) return;
		let e = Math.sign(n);
		if (t !== void 0 && e !== t) return;
		t = e;
	}
	return t;
}
function Ce(e, t) {
	return typeof e == "number" && typeof t == "number" || e instanceof Date && t instanceof Date;
}
function we(e) {
	return e instanceof Date ? e.getTime() : e;
}
function Te(e, t) {
	return e instanceof Date && t instanceof Date ? e.getTime() === t.getTime() : Object.is(e, t);
}
function Ee(e) {
	throw TypeError(`Chart viewport "${e}" domain must contain two distinct finite numbers or Dates`);
}
function De(e) {
	return e instanceof Date ? e.toLocaleDateString() : String(e);
}
//#endregion
//#region node_modules/@tanstack/charts/dist/guide-layout.js
var Oe = 16, ke = 400, Ae = {
	fontFamily: "sans-serif",
	fontStyle: "normal",
	fontStretch: "normal",
	letterSpacing: 0,
	direction: "inherit",
	fontScale: 1
};
function je(e, t) {
	if (e === "middle") return "middle";
	let n = t !== "rtl";
	return e === "left" ? n ? "start" : "end" : n ? "end" : "start";
}
function Me(e, t, n) {
	return t === "middle" ? -e / 2 : t === "start" == (n !== "rtl") ? 0 : -e;
}
function H(e, t) {
	let n = Re(t.fontScale, 1), r = Ie(t.fontSize, Oe) * n, i = Ie(t.fontWeight, ke), a = Le(t.letterSpacing, 0) * n;
	if (!e || r === 0) return {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	let o = 0;
	for (let t of e) o += Fe(t);
	let s = 1 + (Math.min(900, Math.max(100, i)) - 400) / 12500, c = Math.max(0, o * r * s + Math.max(0, Array.from(e).length - 1) * a), l = r;
	return {
		x: Me(c, t.anchor, t.direction),
		y: t.baseline === "middle" ? -l / 2 : t.baseline === "hanging" ? 0 : -r * .8,
		width: c,
		height: l
	};
}
function U(e, t = H) {
	let n = Ie(e.fontSize, Oe), r = e.anchor ?? "start", i = e.baseline ?? "auto", a = e.text.length === 0 ? {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	} : t(e.text, {
		fontSize: n,
		fontWeight: e.fontWeight,
		...Ae,
		anchor: r,
		baseline: i
	}), o = Le(a.x, 0), s = Le(a.y, 0), c = Ie(a.width, 0), l = Ie(a.height, 0), u = {
		x: e.x + o,
		y: e.y + s,
		width: c,
		height: l
	};
	return e.rotate ? Pe(u, e.x, e.y, e.rotate) : u;
}
function W(e = H, t = {}) {
	let n = {
		...Ae,
		...t,
		fontFamily: t.fontFamily || Ae.fontFamily,
		fontStyle: t.fontStyle || Ae.fontStyle,
		fontStretch: t.fontStretch || Ae.fontStretch,
		letterSpacing: Le(t.letterSpacing, 0),
		fontScale: Re(t.fontScale, 1)
	};
	return (t, r) => e(t, {
		...r,
		...n
	});
}
function G(e, t, n) {
	Ne(t, 0, 0, (t, r, i) => {
		let a = t.style;
		if (!(a?.strokeWidth !== void 0 || a?.lineCap !== void 0 && a.lineCap !== "butt") || a?.stroke === "none") return;
		let o = a?.strokeWidth ?? 1;
		if (!Number.isFinite(o) || o <= 0) return;
		let s = o / 2, c = t.x1 + r, l = t.x2 + r, u = t.y1 + i, d = t.y2 + i, f = l - c, p = d - u, m = Math.hypot(f, p), h = m > 0 ? f / m : 0, g = m > 0 ? p / m : 0, _ = a?.lineCap && a.lineCap !== "butt" ? s : 0, v = Math.abs(g) * s + Math.abs(h) * _, y = Math.abs(h) * s + Math.abs(g) * _, b = Math.min(c, l) - v, x = Math.max(c, l) + v, S = Math.min(u, d) - y, C = Math.max(u, d) + y;
		e.top = Math.max(e.top, n.y - S), e.right = Math.max(e.right, x - n.x - n.width), e.bottom = Math.max(e.bottom, C - n.y - n.height), e.left = Math.max(e.left, n.x - b);
	});
}
function Ne(e, t, n, r) {
	if (e.kind === "rule") {
		r(e, t, n);
		return;
	}
	if (e.kind !== "group") return;
	let i = t + (e.translateX ?? 0), a = n + (e.translateY ?? 0);
	for (let t of e.children) Ne(t, i, a, r);
}
function Pe(e, t, n, r) {
	let i = r * Math.PI / 180, a = Math.cos(i), o = Math.sin(i), s = e.x + e.width / 2 - t, c = e.y + e.height / 2 - n, l = Math.abs(e.width * a) + Math.abs(e.height * o), u = Math.abs(e.width * o) + Math.abs(e.height * a), d = s * a - c * o + t, f = s * o + c * a + n;
	return {
		x: d - l / 2,
		y: f - u / 2,
		width: l,
		height: u
	};
}
function Fe(e) {
	return /\s/u.test(e) ? .33 : /[\u0300-\u036f]/u.test(e) ? 0 : /[ilI1|!.,:;'`]/u.test(e) ? .28 : /[mwMW@#%&]/u.test(e) ? .9 : /[A-Z]/u.test(e) ? .64 : /[0-9]/u.test(e) ? .56 : e.codePointAt(0) > 127 ? 1 : .54;
}
function Ie(e, t) {
	return e !== void 0 && Number.isFinite(e) && e >= 0 ? e : t;
}
function Le(e, t) {
	return e !== void 0 && Number.isFinite(e) ? e : t;
}
function Re(e, t) {
	return e !== void 0 && Number.isFinite(e) && e > 0 ? e : t;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/renderer-rect.js
function ze(e, t, n) {
	let [r, i, a, o] = e ?? [
		0,
		0,
		0,
		0
	], s = [
		Ve(r),
		Ve(i),
		Ve(a),
		Ve(o)
	], c = He(t), l = He(n), u = Math.min(1, Ue(c, s[0] + s[1]), Ue(c, s[3] + s[2]), Ue(l, s[0] + s[3]), Ue(l, s[1] + s[2]));
	return u === 1 ? s : [
		s[0] * u,
		s[1] * u,
		s[2] * u,
		s[3] * u
	];
}
function Be(e, t, n, r, i) {
	let a = We(e, t, n, r), [o, s, c, l] = ze(i, a.width, a.height), u = a.x, d = a.y, f = u + a.width, p = d + a.height;
	return [
		`M${K(u + o)},${K(d)}`,
		`H${K(f - s)}`,
		`A${K(s)},${K(s)} 0 0 1 ${K(f)},${K(d + s)}`,
		`V${K(p - c)}`,
		`A${K(c)},${K(c)} 0 0 1 ${K(f - c)},${K(p)}`,
		`H${K(u + l)}`,
		`A${K(l)},${K(l)} 0 0 1 ${K(u)},${K(p - l)}`,
		`V${K(d + o)}`,
		`A${K(o)},${K(o)} 0 0 1 ${K(u + o)},${K(d)}`,
		"Z"
	].join("");
}
function Ve(e) {
	return Number.isFinite(e) && e > 0 ? e : 0;
}
function He(e) {
	return Number.isFinite(e) ? Math.abs(e) : 0;
}
function Ue(e, t) {
	return t === 0 ? 1 : e / t;
}
function We(e, t, n, r) {
	let i = e + n, a = t + r;
	return {
		x: Math.min(e, i),
		y: Math.min(t, a),
		width: Math.abs(n),
		height: Math.abs(r)
	};
}
function K(e) {
	return String(Math.round(e * 100) / 100);
}
//#endregion
//#region node_modules/@tanstack/charts/dist/rect-radius-internal.js
var Ge = Math.PI * 2;
function Ke(e, t, n, r, i, a, o) {
	let s = Je(e, t, n, r), c = s.x, l = s.y, u = c + s.width, d = l + s.height;
	if (!(a >= c && a <= u && o >= l && o <= d)) return !1;
	let [f, p, m, h] = ze(i, s.width, s.height);
	return a < c + f && o < l + f ? Ye(a, o, c + f, l + f, f) : a > u - p && o < l + p ? Ye(a, o, u - p, l + p, p) : a > u - m && o > d - m ? Ye(a, o, u - m, d - m, m) : a < c + h && o > d - h ? Ye(a, o, c + h, d - h, h) : !0;
}
function qe(e, t, n, r, i, a, o) {
	if (Ke(e, t, n, r, i, a, o)) return 0;
	let s = Je(e, t, n, r), c = s.x, l = s.y, u = c + s.width, d = l + s.height, [f, p, m, h] = ze(i, s.width, s.height);
	return Math.min(Ze(c + f, l, u - p, l, a, o), Ze(u, l + p, u, d - m, a, o), Ze(u - m, d, c + h, d, a, o), Ze(c, d - h, c, l + f, a, o), Xe(a, o, c + f, l + f, f, Math.PI, Math.PI * 1.5), Xe(a, o, u - p, l + p, p, Math.PI * 1.5, Ge), Xe(a, o, u - m, d - m, m, 0, Math.PI * .5), Xe(a, o, c + h, d - h, h, Math.PI * .5, Math.PI));
}
function Je(e, t, n, r) {
	let i = e + n, a = t + r;
	return {
		x: Math.min(e, i),
		y: Math.min(t, a),
		width: Math.abs(n),
		height: Math.abs(r)
	};
}
function Ye(e, t, n, r, i) {
	let a = e - n, o = t - r;
	return a * a + o * o <= i * i;
}
function Xe(e, t, n, r, i, a, o) {
	if (i === 0) return Qe(e, t, n, r);
	let s = Math.atan2(t - r, e - n);
	return s < 0 && (s += Ge), s >= a && s <= o ? (Math.hypot(e - n, t - r) - i) ** 2 : Math.min(Qe(e, t, n + Math.cos(a) * i, r + Math.sin(a) * i), Qe(e, t, n + Math.cos(o) * i, r + Math.sin(o) * i));
}
function Ze(e, t, n, r, i, a) {
	let o = n - e, s = r - t, c = o * o + s * s;
	if (c === 0) return Qe(i, a, e, t);
	let l = Math.max(0, Math.min(1, ((i - e) * o + (a - t) * s) / c));
	return Qe(i, a, e + l * o, t + l * s);
}
function Qe(e, t, n, r) {
	return (e - n) ** 2 + (t - r) ** 2;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/nearest.js
var $e = /* @__PURE__ */ new WeakMap();
function et(e, t, n, r) {
	let i, a = Infinity;
	for (let r = e.length; r--;) {
		let o = e[r], s = o.x - t, c = o.y - n, l = s * s + c * c;
		l <= a && (i = o, a = l);
	}
	return i && a <= Math.max(0, r) ** 2 ? i : null;
}
function tt(e, t, n, r, i = e.points) {
	let a = rt(e), o = i === e.points ? void 0 : new Set(i);
	if (!a.targets.length && !a.attachedPoints.size) return et(i, t, n, r);
	let s = nt(e, t, n, i);
	if (s) return s.point;
	let c, l, u = Infinity, d = Infinity;
	for (let e of a.targets) {
		let r = e.node.interaction;
		if (!ot(r, o)) continue;
		let i = r.affinity ?? "xy";
		if (i === "geometry") continue;
		let a = i === "x" ? "x" : i === "y" ? "y" : void 0, s = a ? wt(e.bounds, a === "x" ? t : n, a) : ct(e, t, n);
		if (s > u) continue;
		let f = a ? ct(e, t, n) : s;
		(s < u || s === u && f < d) && (l = r, c = void 0, u = s, d = f);
	}
	if (u !== 0) for (let e of i) {
		if (a.attachedPoints.has(e)) continue;
		let r = e.x - t, i = e.y - n, o = r * r + i * i;
		o < u && (c = e, l = void 0, u = o, d = o);
	}
	return u > Math.max(0, r) ** 2 ? null : c ?? (l ? at(l, t, n, o) : void 0) ?? null;
}
function nt(e, t, n, r = e.points) {
	let i = rt(e), a = r === e.points ? void 0 : new Set(r);
	for (let e = i.targets.length; e--;) {
		let r = i.targets[e];
		if (Ct(r.bounds, t, n) && st(r, t, n)) {
			let e = r.node.interaction, i = at(e, t, n, a), o = e.point ? !0 : e.points.length > 0;
			if (i || !a || !o) return { point: i };
		}
	}
	return null;
}
function rt(e) {
	let t = $e.get(e);
	if (t) return t;
	let n = [], r = /* @__PURE__ */ new Set();
	it(e.nodes, 0, 0, void 0, n, r);
	let i = {
		targets: n,
		attachedPoints: r
	};
	return $e.set(e, i), i;
}
function it(e, t, n, r, i, a) {
	for (let o of e) {
		if (o.kind === "group") {
			if (o.focus) continue;
			let e = t + (o.translateX ?? 0), s = n + (o.translateY ?? 0), c = o.clip ? bt(o.clip, e, s) : void 0, l = r === null ? null : St(r, c);
			it(o.children, e, s, l, i, a);
			continue;
		}
		if (o.kind === "label" || !o.interaction) continue;
		if (o.interaction.point) a.add(o.interaction.point);
		else for (let e of o.interaction.points) a.add(e);
		if (r === null) continue;
		let e = lt(o);
		if (!e) continue;
		let s = bt(e, t, n), c = r ? St(s, r) : s;
		c != null && i.push({
			node: o,
			offsetX: t,
			offsetY: n,
			bounds: c,
			clip: r
		});
	}
}
function at(e, t, n, r) {
	if (e.point) return !r || r.has(e.point) ? e.point : null;
	let i = e.affinity ?? "xy", a, o = Infinity, s = Infinity;
	for (let c of e.points) {
		if (r && !r.has(c)) continue;
		let e = c.x - t, l = c.y - n, u = e * e + l * l, d = i === "x" ? e * e : i === "y" ? l * l : u;
		(d < o || d === o && u < s) && (a = c, o = d, s = u);
	}
	return a ?? null;
}
function ot(e, t) {
	return t ? e.point ? t.has(e.point) : e.points.some((e) => t.has(e)) : !0;
}
function st(e, t, n) {
	let r = t - e.offsetX, i = n - e.offsetY, { node: a } = e;
	switch (a.kind) {
		case "rect": return a.cornerRadii === void 0 ? ut(a, r, i) : Ke(a.x, a.y, a.width, a.height, a.cornerRadii, r, i);
		case "dot": {
			let e = r - a.x, t = i - a.y, n = Math.max(0, a.radius);
			return e * e + t * t <= n * n;
		}
		case "area": return a.polygons === void 0 ? ft(a.points, r, i) : pt(a.polygons, r, i);
		case "polyline": return ht(a.points, r, i, !1) <= Et(a) ** 2;
		case "rule": return gt(a.x1, a.y1, a.x2, a.y2, r, i) <= Et(a) ** 2;
	}
}
function ct(e, t, n) {
	let r = t - e.offsetX, i = n - e.offsetY, { node: a } = e, o;
	switch (a.kind) {
		case "rect":
			o = a.cornerRadii === void 0 ? a.radius ? dt(a, r, i) : Tt(a, r, i) : qe(a.x, a.y, a.width, a.height, a.cornerRadii, r, i);
			break;
		case "dot": {
			let e = r - a.x, t = i - a.y, n = Math.max(0, Math.sqrt(e * e + t * t) - Math.max(0, a.radius));
			o = n * n;
			break;
		}
		case "area":
			o = a.polygons === void 0 ? ht(a.points, r, i, !0) : mt(a.polygons, r, i);
			break;
		case "polyline": {
			let e = ht(a.points, r, i, !1), t = Math.max(0, Math.sqrt(e) - Et(a));
			o = t * t;
			break;
		}
		case "rule": {
			let e = gt(a.x1, a.y1, a.x2, a.y2, r, i), t = Math.max(0, Math.sqrt(e) - Et(a));
			o = t * t;
			break;
		}
	}
	return e.clip ? Math.max(o, Tt(e.clip, t, n)) : o;
}
function lt(e) {
	switch (e.kind) {
		case "rect": return yt(e);
		case "dot": {
			let t = Math.max(0, e.radius);
			return {
				x: e.x - t,
				y: e.y - t,
				width: t * 2,
				height: t * 2
			};
		}
		case "area": return e.polygons === void 0 ? _t(e.points) : vt(e.polygons);
		case "polyline": {
			let t = _t(e.points);
			return t ? xt(t, Et(e)) : null;
		}
		case "rule": return xt({
			x: Math.min(e.x1, e.x2),
			y: Math.min(e.y1, e.y2),
			width: Math.abs(e.x2 - e.x1),
			height: Math.abs(e.y2 - e.y1)
		}, Et(e));
	}
}
function ut(e, t, n) {
	let r = yt(e);
	if (!Ct(r, t, n)) return !1;
	let i = Math.max(0, Math.min(e.radius ?? 0, r.width / 2, r.height / 2));
	if (i === 0 || t >= r.x + i && t <= r.x + r.width - i || n >= r.y + i && n <= r.y + r.height - i) return !0;
	let a = t < r.x + i ? r.x + i : r.x + r.width - i, o = n < r.y + i ? r.y + i : r.y + r.height - i, s = t - a, c = n - o;
	return s * s + c * c <= i * i;
}
function dt(e, t, n) {
	let r = yt(e), i = r.width / 2, a = r.height / 2, o = Math.max(0, Math.min(e.radius ?? 0, i, a)), s = Math.abs(t - (r.x + i)) - (i - o), c = Math.abs(n - (r.y + a)) - (a - o), l = Math.sqrt(Math.max(0, s) ** 2 + Math.max(0, c) ** 2) - o;
	return Math.max(0, l) ** 2;
}
function ft(e, t, n) {
	let r = !1;
	for (let i = 0, a = e.length - 1; i < e.length; a = i++) {
		let o = e[i], s = e[a];
		o[1] > n != s[1] > n && t < (s[0] - o[0]) * (n - o[1]) / (s[1] - o[1]) + o[0] && (r = !r);
	}
	return r;
}
function pt(e, t, n) {
	return e.some(([e, ...r]) => !e || !ft(e, t, n) ? !1 : !r.some((e) => ft(e, t, n)));
}
function mt(e, t, n) {
	let r = Infinity;
	for (let i of e) for (let e of i) r = Math.min(r, ht(e, t, n, !0));
	return r;
}
function ht(e, t, n, r) {
	if (!e.length) return Infinity;
	if (e.length === 1) {
		let r = e[0];
		return (r[0] - t) ** 2 + (r[1] - n) ** 2;
	}
	let i = Infinity, a = r ? e.length : Math.max(0, e.length - 1);
	for (let r = 0; r < a; r += 1) {
		let a = e[r], o = e[(r + 1) % e.length];
		i = Math.min(i, gt(a[0], a[1], o[0], o[1], t, n));
	}
	return i;
}
function gt(e, t, n, r, i, a) {
	let o = n - e, s = r - t, c = o * o + s * s, l = c ? Math.max(0, Math.min(1, ((i - e) * o + (a - t) * s) / c)) : 0, u = i - (e + l * o), d = a - (t + l * s);
	return u * u + d * d;
}
function _t(e) {
	let t = Infinity, n = Infinity, r = -Infinity, i = -Infinity;
	for (let a of e) Number.isFinite(a[0]) && Number.isFinite(a[1]) && (t = Math.min(t, a[0]), n = Math.min(n, a[1]), r = Math.max(r, a[0]), i = Math.max(i, a[1]));
	return Number.isFinite(t) ? {
		x: t,
		y: n,
		width: r - t,
		height: i - n
	} : null;
}
function vt(e) {
	return _t(e.flatMap((e) => e.flat()));
}
function yt(e) {
	return {
		x: Math.min(e.x, e.x + e.width),
		y: Math.min(e.y, e.y + e.height),
		width: Math.abs(e.width),
		height: Math.abs(e.height)
	};
}
function bt(e, t, n) {
	let r = yt(e);
	return {
		...r,
		x: r.x + t,
		y: r.y + n
	};
}
function xt(e, t) {
	return {
		x: e.x - t,
		y: e.y - t,
		width: e.width + t * 2,
		height: e.height + t * 2
	};
}
function St(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = Math.max(e.x, t.x), r = Math.max(e.y, t.y), i = Math.min(e.x + e.width, t.x + t.width), a = Math.min(e.y + e.height, t.y + t.height);
	return i < n || a < r ? null : {
		x: n,
		y: r,
		width: i - n,
		height: a - r
	};
}
function Ct(e, t, n) {
	return t >= e.x && t <= e.x + e.width && n >= e.y && n <= e.y + e.height;
}
function wt(e, t, n) {
	let r = n === "x" ? e.x : e.y, i = n === "x" ? e.width : e.height, a = t < r ? r - t : t > r + i ? t - r - i : 0;
	return a * a;
}
function Tt(e, t, n) {
	let r = yt(e), i = t < r.x ? r.x - t : t > r.x + r.width ? t - r.x - r.width : 0, a = n < r.y ? r.y - n : n > r.y + r.height ? n - r.y - r.height : 0;
	return i * i + a * a;
}
function Et(e) {
	return Math.max(0, e.style?.strokeWidth ?? 1) / 2;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/focus-coordinate-internal.js
var Dt = /* @__PURE__ */ new WeakMap();
function Ot(e, t, n) {
	let r = Dt.get(e);
	r ? r[t] = n : Dt.set(e, { [t]: n });
}
function kt(e, t) {
	return Dt.get(e)?.[t] ?? e[t];
}
//#endregion
//#region node_modules/@tanstack/charts/dist/materialized-channel-internal.js
var At = /* @__PURE__ */ Symbol();
function jt(e, t) {
	return e === "x" || e === "y" ? e : t[At];
}
//#endregion
//#region node_modules/@tanstack/charts/dist/scene-point-map.js
function Mt(e, t) {
	return ["x", "y"].some((n) => (e.scales[n]?.viewport?.translate ?? 0) !== (t.scales[n]?.viewport?.translate ?? 0));
}
function Nt(e, t) {
	return e.map((e) => e.kind === "group" ? {
		...e,
		children: Nt(e.children, t),
		...e.focus ? { focus: {
			...e.focus,
			points: e.focus.points.map(t)
		} } : {},
		...e.states ? { states: {
			...e.states,
			points: e.states.points.map(t)
		} } : {}
	} : e.kind === "label" || !e.interaction ? e : {
		...e,
		interaction: e.interaction.point ? {
			...e.interaction,
			point: t(e.interaction.point)
		} : {
			...e.interaction,
			points: e.interaction.points.map(t)
		}
	});
}
//#endregion
//#region node_modules/@tanstack/charts/dist/scene-source.js
var Pt = /* @__PURE__ */ Symbol("chart-scene-source"), Ft = /* @__PURE__ */ Symbol("default-focus-layer");
function It(e) {
	return e.focus && Object.assign(e.focus, { [Ft]: !0 }), e;
}
function Lt(e) {
	return e.focus?.[Ft] === !0;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/scene.js
var Rt = {
	foreground: "currentColor",
	muted: "currentColor",
	grid: "currentColor",
	background: "transparent",
	palette: [
		"var(--ts-chart-1, #2563eb)",
		"var(--ts-chart-2, #f97316)",
		"var(--ts-chart-3, #10b981)",
		"var(--ts-chart-4, #8b5cf6)",
		"var(--ts-chart-5, #ec4899)",
		"var(--ts-chart-6, #06b6d4)"
	]
};
function zt(e, t) {
	return t ? typeof e == "function" ? {
		chart: e,
		...t
	} : {
		...e,
		...t
	} : typeof e == "function" ? { chart: e } : e;
}
function Bt(e, t, n = {}) {
	return Ht(e, t, (e) => {
		if (!e.options?.scale) throw TypeError(`Chart scale "${e.id}" requires a configured scale`);
		return Vt(e.options.scale, e);
	}, n);
}
function Vt(e, t) {
	if (typeof e == "function") return B(e, t);
	if (t.options?.viewport) throw TypeError(`Chart viewport "${t.id}" requires a configured or inferable continuous scale`);
	return e.resolve(t);
}
function Ht(e, t, n, r) {
	let i = Mn(t.width), a = Mn(t.height), o = {
		...r,
		measureText: W(r.measureText, r.typography)
	}, s = {
		...Rt,
		...o.defaultTheme,
		palette: o.defaultTheme?.palette ?? Rt.palette
	}, c = {
		...s,
		...e.theme,
		palette: e.theme?.palette ?? s.palette
	}, l = e.marks.map((e, t) => e.initialize({ markIndex: t })), { margin: u, chart: d, scales: f, axes: p, marks: m, colors: h, legend: g, legendBounds: _, positionScales: v, scaleGuides: y, gridScales: b } = rn(e, l, i, a, c, $t(e, Qt(l)), n, o), x = [], S = [], C = [], w = [], T = m.findIndex((e) => !e.focus && !e.focusGuideOnly);
	m.forEach((e, t) => {
		let n = Wt(e, "x", v, f), r = Wt(e, "y", v, f), s = n !== void 0, l = r !== void 0, u = /* @__PURE__ */ new Map(), p = (t) => {
			let i = u.get(t);
			if (i) return i;
			let a = s || l ? {
				...t,
				x: t.x + (n ?? 0),
				y: t.y + (r ?? 0)
			} : t;
			return Ut(a, e, f, n, r), u.set(t, a), a;
		}, m = e.render({
			markIndex: t,
			surface: {
				x: 0,
				y: 0,
				width: i,
				height: a
			},
			chart: d,
			scales: f,
			theme: c,
			color: h.map,
			colors: h,
			layout: o
		});
		g?.filterMark && (m = g.filterMark(m, { seriesFromColor: e.seriesFromColor })), e.postDomain && (m = e.postDomain(m));
		let _ = Xt(m.nodes, m.points), y = s || l ? Nt(m.nodes, p) : m.nodes, b = _.map(p), E = [], D = T < 0 || t < T ? "under" : "over";
		for (let e of m.focusGuides ?? []) w.push({
			...e,
			placement: e.placement ?? D
		});
		if (e.focus) {
			let t = e.focus.retarget === !0;
			E.push({
				kind: "group",
				key: `focus:${e.id}`,
				className: "ts-chart__focus-layer",
				ariaHidden: !0,
				focus: {
					markId: e.id,
					match: e.focus.match ?? "primary",
					anchors: m.focusAnchors ?? _,
					points: b,
					placement: D,
					...t ? {
						retarget: !0,
						candidates: y
					} : {}
				},
				children: t ? [] : y
			});
		} else {
			let t = b;
			if (e.states) E.push({
				kind: "group",
				key: `states:${e.id}`,
				children: y,
				states: {
					data: e.states.data,
					definitions: e.states.definitions,
					points: t
				}
			});
			else for (let e of y) E.push(e);
			for (let e of t) C.push(e);
			t.length && S.push({
				markId: e.id,
				points: t,
				clipped: s || l
			});
		}
		x.push({
			key: e.id,
			nodes: E,
			translateX: n,
			translateY: r
		});
	});
	let E = Kt(x, d), D = [{
		kind: "group",
		key: "marks",
		className: "ts-chart__marks",
		clip: e.clip ? d : void 0,
		children: E
	}];
	b.length && D.unshift(_n(d, b, c)), y.length && D.push(p);
	let O = [], k = /* @__PURE__ */ new Set();
	for (let t of e.controls ?? []) {
		if (!t.id.trim()) throw TypeError("Chart control ids must be nonempty");
		if (k.has(t.id)) throw TypeError(`Duplicate chart control id "${t.id}"`);
		k.add(t.id);
		let e = t.resolve({
			chart: d,
			scales: f,
			colors: h,
			theme: c,
			width: i,
			height: a
		});
		e.nodes && D.push(...e.nodes), e.controls && O.push(...e.controls);
	}
	if (g && _) {
		let e = {
			colors: h,
			chart: d,
			bounds: _,
			theme: c,
			layout: o,
			width: i,
			height: a,
			direction: o.typography?.direction
		};
		D.push(g.render(e)), g.control && O.push(g.control(e));
	}
	let A = /* @__PURE__ */ new Set();
	for (let e of O) {
		let t = `${e.extension.id}:${e.key}`;
		if (A.has(t)) throw TypeError(`Duplicate chart host control "${t}"`);
		A.add(t);
	}
	let j = e.focusRing ?? c.focusRing;
	if (e.focus !== !1 && j !== !1 && C.length) {
		let e = typeof j == "object" ? j : void 0, t = mn(e?.radius, 5), n = e?.fill ?? "var(--ts-chart-focus-fill, Canvas)", r = e?.stroke, i = mn(e?.strokeWidth, 2.5);
		for (let e of S) D.push(It({
			kind: "group",
			key: `default-focus:${e.markId}`,
			className: "ts-chart__focus-layer ts-chart__focus-layer--default",
			ariaHidden: !0,
			clip: e.clipped ? d : void 0,
			focus: {
				match: "primary",
				anchors: e.points,
				points: e.points,
				placement: "over"
			},
			children: e.points.map((e) => ({
				kind: "dot",
				key: e.key,
				x: e.x,
				y: e.y,
				radius: t,
				style: {
					fill: n,
					stroke: r ?? e.color,
					strokeWidth: i
				}
			}))
		}));
	}
	return {
		width: i,
		height: a,
		margin: u,
		chart: d,
		nodes: D,
		points: C,
		scales: f,
		colors: h,
		gradients: e.gradients ?? [],
		theme: c,
		...o.typography?.direction === void 0 ? {} : { direction: o.typography.direction },
		...O.length ? { controls: O } : {},
		...w.length ? { focusGuides: w } : {},
		[Pt]: [e, l]
	};
}
function Ut(e, t, n, r, i) {
	a("x", e.xValue, e.x, r), a("y", e.yValue, e.y, i);
	function a(r, i, a, o) {
		let s = t.channels[r]?.scale, c = s === void 0 ? void 0 : n[s];
		if (!c || c.type === "none") return;
		let l = c.map(i) + (o ?? 0);
		Number.isFinite(l) && l !== a && Ot(e, r, l);
	}
}
function Wt(e, t, n, r) {
	let i = e.viewport?.[t];
	if (i !== "fixed") {
		for (let r of n) if (r.channel === t && r.scale.viewport && Object.values(e.channels).some((e) => e.scale === r.id)) return r.scale.viewport.translate;
		return i === "content" ? r[t]?.viewport?.translate : void 0;
	}
}
function Gt(e, t) {
	return ["x", "y"].some((n) => t.some((t) => t.channel === n && t.scale.viewport && e.viewport?.[n] !== "fixed" && (e.viewport?.[n] === "content" || Object.values(e.channels).some((e) => e.scale === t.id))));
}
function Kt(e, t) {
	return e.flatMap((e) => e.translateX === void 0 && e.translateY === void 0 ? [...e.nodes] : [{
		kind: "group",
		key: `viewport-clip:${e.key}`,
		className: "ts-chart__viewport-clip",
		clip: t,
		children: [{
			kind: "group",
			key: `viewport-content:${e.key}`,
			className: "ts-chart__viewport-content",
			...e.translateX === void 0 ? {} : { translateX: e.translateX },
			...e.translateY === void 0 ? {} : { translateY: e.translateY },
			children: e.nodes
		}]
	}]);
}
function qt(e, t, n, r = Infinity, i = e.points) {
	return tt(e, t, n, r, i);
}
function Jt(e, t = e.points) {
	if (!Object.values(e.scales).some((e) => e.viewport)) return t;
	let { x: n, y: r, width: i, height: a } = e.chart, o = n + i, s = r + a, c = t.filter((t) => !Yt(e, t) || t.x >= n && t.x <= o && t.y >= r && t.y <= s);
	return c.length === t.length ? t : c;
}
function Yt(e, t) {
	let n = e[Pt]?.[1].find((e) => e.id === t.markId);
	return !n || ["x", "y"].some((t) => {
		let r = n.viewport?.[t];
		return r === "fixed" ? !1 : r === "content" && e.scales[t]?.viewport ? !0 : Object.entries(n.channels).some(([n, r]) => n === t && r.scale !== void 0 && e.scales[r.scale]?.viewport !== void 0);
	});
}
function Xt(e, t) {
	let n = t ? [...t] : [], r = new Set(n), i = (e) => {
		for (let t of e) {
			if (t.kind === "group") {
				t.focus || i(t.children);
				continue;
			}
			if (t.kind === "label" || !t.interaction) continue;
			let e = t.interaction;
			if (e.point) r.has(e.point) || (r.add(e.point), n.push(e.point));
			else for (let t of e.points) r.has(t) || (r.add(t), n.push(t));
		}
	};
	return i(e), n;
}
function Zt(e, t) {
	let n = [], r = !1, i = !1;
	for (let a of e) for (let e of Object.values(a.channels)) if (e.scale === t) {
		i = !0;
		for (let t of e.values) n.push(t);
		r ||= e.includeZero ?? !1;
	}
	return {
		values: n,
		includeZero: r,
		materialized: i
	};
}
function Qt(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) for (let [e, r] of Object.entries(n.channels)) {
		let i = r.scale;
		if (i === void 0) continue;
		let a = jt(e, r);
		if (i === "color") {
			if (a) throw TypeError("Position scales cannot use reserved ID \"color\"");
			continue;
		}
		let o = t.get(i) ?? {
			values: [],
			includeZero: !1,
			materialized: !1
		};
		if (a && o.channel && o.channel !== a) throw TypeError(`Chart scale "${i}" cannot materialize both x and y channels`);
		o.channel ??= a, o.materialized ||= !n.focusGuideOnly, o.includeZero ||= r.includeZero ?? !1;
		for (let e of r.values) o.values.push(e);
		t.set(i, o);
	}
	return t;
}
function $t(e, t) {
	let n = e.scales;
	if (!n || !Object.hasOwn(n, "x") || !Object.hasOwn(n, "y")) throw TypeError("Chart scales must define reserved `x` and `y` entries");
	for (let e of t.keys()) if (!Object.hasOwn(n, e)) throw TypeError(`Chart scale "${e}" is used by a mark but is not configured`);
	return Object.entries(n).map(([e, n]) => {
		if (e === "color") throw TypeError("Position scales cannot use reserved ID \"color\"");
		let r = t.get(e) ?? {
			values: [],
			includeZero: !1,
			materialized: !1
		}, i = e === "x" || e === "y" ? e : void 0, a = n?.channel;
		if (!i && n !== null && !a) throw TypeError(`Named chart scale "${e}" requires channel: "x" or channel: "y"`);
		let o = i ?? a ?? r.channel ?? "x";
		if (a && a !== o || r.channel && r.channel !== o) throw TypeError(`Chart scale "${e}" is configured for ${o} but is used as ${r.channel ?? a}`);
		let s = n?.side ?? (o === "x" ? "bottom" : "left");
		if (o === "x" && s !== "top" && s !== "bottom" || o === "y" && s !== "left" && s !== "right") throw TypeError(`Chart scale "${e}" uses ${o} and cannot render an axis on the ${s} side`);
		return {
			id: e,
			channel: o,
			side: s,
			options: n,
			channels: r
		};
	});
}
var en = 4, tn = 4, nn = .25;
function rn(e, t, n, r, i, a, o, s) {
	let c = un(e.margin), l = fn(hn(e.guides !== !1 && a.some(an) ? en : 0), c), u = l;
	for (let e = 0; e < tn; e += 1) {
		let e = p(l), t = m(e);
		if (u = fn(t, c, u), pn(l, t)) return e;
		l = t;
	}
	let d = p(u), f = fn(m(d), c, u);
	return pn(u, f) || (d = p(f)), d;
	function p(c) {
		let l = {
			x: c.left,
			y: c.top,
			width: Math.max(1, n - c.left - c.right),
			height: Math.max(1, r - c.top - c.bottom)
		}, u = {}, d = [];
		for (let e of a) {
			let { id: t, channel: n, options: r, channels: i } = e, a = xn(r, n === "x" ? l.width : l.height, n === "x" ? 92 : 48, n === "x" ? 8 : 7), s = n === "x" ? [l.x, l.x + l.width] : [l.y + l.height, l.y], c = r == null ? gn(t, i.materialized, r) : o({
				id: t,
				channel: n,
				values: i.values,
				range: s,
				options: r,
				tickCount: a,
				includeZero: i.includeZero
			});
			u[t] = c, d.push({
				...e,
				scale: c
			});
		}
		let f = sn(t, {
			chart: l,
			scales: u,
			theme: i,
			layout: s
		}), p = C(Zt(f, "color").values, e.color, i);
		if (p.kind !== "categorical" && f.some((e) => e.seriesFromColor)) throw TypeError("A continuous color channel cannot infer series identity; supply z explicitly");
		let m = p.domain.length ? e.color?.legend : void 0;
		if (m?.seriesVisible && p.kind !== "categorical") throw TypeError("An interactive color legend requires a categorical color scale");
		let h = m?.height(p.domain.length, {
			colors: p,
			chart: l,
			bounds: {
				x: l.x,
				y: 0,
				width: l.width,
				height: 0
			},
			theme: i,
			layout: s,
			width: n,
			height: r,
			direction: s.typography?.direction
		}), g = m && h !== void 0 ? {
			x: l.x,
			y: m.placement === "bottom" ? r - h : 0,
			width: l.width,
			height: h
		} : void 0, _ = e.guides === !1 ? [] : d.filter(an), v = e.guides === !1 ? [] : d.filter(on), y = vn(l, _, i, n, s.measureText, s.typography?.direction === "rtl");
		return v.length && G(y.margin, _n(l, v, i), l), {
			margin: c,
			chart: l,
			scales: u,
			axes: y.axes,
			positionScales: d,
			scaleGuides: _,
			gridScales: v,
			guideMargin: y.margin,
			marks: f,
			colors: p,
			legend: m,
			legendBounds: g
		};
	}
	function m(t) {
		let a = t.guideMargin;
		if (t.legend) {
			let e = t.legend.height(t.colors.domain.length, {
				colors: t.colors,
				chart: t.chart,
				bounds: {
					x: t.chart.x,
					y: 0,
					width: t.chart.width,
					height: 0
				},
				theme: i,
				layout: s,
				width: n,
				height: r,
				direction: s.typography?.direction
			});
			t.legend.placement === "bottom" ? c.bottom === void 0 && (a.bottom += e) : c.top === void 0 && (a.top = Math.max(a.top, e));
		}
		return e.clip || t.marks.forEach((e, o) => {
			if (Gt(e, t.positionScales)) return;
			let c = e.layoutLabels?.({
				markIndex: o,
				surface: {
					x: 0,
					y: 0,
					width: n,
					height: r
				},
				chart: t.chart,
				scales: t.scales,
				theme: i,
				color: t.colors.map,
				colors: t.colors,
				layout: s
			});
			for (let e of c ?? []) cn(a, t.chart, e, s.measureText);
		}), fn(a, c);
	}
}
function an(e) {
	return e.options != null && e.options.axis !== !1;
}
function on(e) {
	return e.options != null && !!e.options.grid;
}
function sn(e, t) {
	return e.map((e, n) => {
		if (typeof e.resolveLayout != "function") return e;
		let r = e.resolveLayout({
			...t,
			markIndex: n
		});
		return {
			id: e.id,
			channels: r.channels ?? e.channels,
			viewport: e.viewport,
			focusGuideOnly: e.focusGuideOnly,
			seriesFromColor: e.seriesFromColor,
			focus: e.focus,
			states: r.states ?? e.states,
			postDomain: r.postDomain ?? e.postDomain,
			layoutLabels: r.layoutLabels ?? e.layoutLabels,
			render: r.render
		};
	});
}
function cn(e, t, n, r) {
	let i = U(n, r);
	return n.text && ln(e, t, i), i;
}
function ln(e, t, n) {
	e.top = Math.max(e.top, t.y - n.y + en), e.right = Math.max(e.right, n.x + n.width - t.x - t.width + en), e.bottom = Math.max(e.bottom, n.y + n.height - t.y - t.height + en), e.left = Math.max(e.left, t.x - n.x + en);
}
function un(e) {
	if (typeof e == "number") return hn(q(e));
	if (!e) return {};
	let t = {};
	for (let n of dn) e[n] !== void 0 && (t[n] = q(e[n]));
	return t;
}
var dn = [
	"top",
	"right",
	"bottom",
	"left"
];
function fn(e, t, n) {
	let r = { ...e };
	for (let i of dn) r[i] = t[i] ?? (n ? Math.max(n[i], e[i]) : e[i]);
	return r;
}
function pn(e, t) {
	return dn.every((n) => Math.abs(e[n] - t[n]) <= nn);
}
function q(e) {
	return e !== void 0 && Number.isFinite(e) ? Math.max(0, e) : 0;
}
function mn(e, t) {
	return e !== void 0 && Number.isFinite(e) && e >= 0 ? e : t;
}
function hn(e) {
	return {
		top: e,
		right: e,
		bottom: e,
		left: e
	};
}
function gn(e, t, n) {
	if (t) throw TypeError(n === null ? `Chart scale "${e}" cannot be null when a mark materializes its channel` : `Chart scale "${e}" requires a configured scale when a mark materializes its channel`);
	return {
		id: e,
		type: "none",
		domain: [],
		map: () => {
			throw TypeError(`Chart scale "${e}" is not configured`);
		},
		ticks: [],
		bandwidth: 0
	};
}
function _n(e, t, n) {
	let r = [];
	for (let n of t) {
		if (!n.options?.grid) continue;
		let t = yn(n.options.grid);
		for (let i of n.scale.ticks) {
			let a = `${n.id}-grid:${j(i.value)}`;
			r.push(n.channel === "x" ? {
				kind: "rule",
				key: a,
				x1: i.position,
				x2: i.position,
				y1: e.y,
				y2: e.y + e.height,
				...t ? { style: t } : {}
			} : {
				kind: "rule",
				key: a,
				x1: e.x,
				x2: e.x + e.width,
				y1: i.position,
				y2: i.position,
				...t ? { style: t } : {}
			});
		}
	}
	return {
		kind: "group",
		key: "grid",
		className: "ts-chart__grid",
		ariaHidden: !0,
		children: r,
		style: {
			stroke: n.grid,
			strokeOpacity: .11,
			strokeWidth: 1
		}
	};
}
function vn(e, t, n, r, i, a = !1) {
	let o = [], s = hn(t.length ? en : 0), c = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}, l = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}, u = e.x + e.width, d = e.y + e.height;
	for (let n of t) {
		let t = bn(Sn(n.options)?.line), r = c[n.side] + (l[n.side] > 0 ? t : 0);
		s[n.side] = Math.max(s[n.side], r + en);
		let i = n.side === "top" ? e.y - r : n.side === "right" ? u + r : n.side === "bottom" ? d + r : e.x - r, a = i, o = (t) => {
			ln(s, e, t), a = n.side === "top" ? Math.min(a, t.y) : n.side === "right" ? Math.max(a, t.x + t.width) : n.side === "bottom" ? Math.max(a, t.y + t.height) : Math.min(a, t.x);
		}, f = (e) => {
			a = n.side === "top" || n.side === "left" ? Math.min(a, e) : Math.max(a, e);
		};
		n.channel === "x" ? p(n, i, o, f) : m(n, i, o, f);
		let h = n.side === "top" ? e.y - a : n.side === "right" ? a - u : n.side === "bottom" ? a - d : e.x - a;
		c[n.side] = Math.max(r, h) + 8, l[n.side] += 1;
	}
	let f = {
		kind: "group",
		key: "axes",
		className: "ts-chart__axes",
		ariaHidden: !0,
		children: o
	};
	return G(s, f, e), {
		axes: f,
		margin: s
	};
	function p(t, s, c, l) {
		let d = Sn(t.options), f = t.side === "bottom", p = f ? 1 : -1;
		d?.line !== !1 && (o.push({
			kind: "rule",
			key: `${t.id}-axis`,
			x1: e.x,
			x2: u,
			y1: s,
			y2: s,
			style: h(d?.line)
		}), l(s + p * bn(d?.line)));
		let m = d?.ticks === !1 ? [] : t.scale.ticks, g = q(d?.ticks === !1 ? 0 : d?.ticks?.size ?? 4), _ = q(d?.ticks === !1 ? 0 : d?.ticks?.padding ?? 4), v = Cn(d), y = v === !1 ? [] : Tn(t, wn(t.scale, t.options, v), s, g, _, v, r, n, i, a), b = v === !1 ? [] : Dn(y, v, t.scale.type === "band"), x = s;
		for (let e of m) {
			if (g <= 0) continue;
			let n = s + p * g;
			l(n), x = f ? Math.max(x, n) : Math.min(x, n), o.push({
				kind: "rule",
				key: `${t.id}-tick-rule:${j(e.value)}`,
				x1: e.position,
				x2: e.position,
				y1: s,
				y2: n,
				style: h()
			});
		}
		for (let e of b) c(e.bounds), x = f ? Math.max(x, e.bounds.y + e.bounds.height) : Math.min(x, e.bounds.y), o.push(e.label);
		let S = d?.label, C = typeof S == "string" ? S : S?.text;
		if (!C) return;
		let w = typeof S == "object" ? S : void 0, T = w?.offset ?? "auto", E = T !== "auto", D = {
			kind: "label",
			key: `${t.id}-label`,
			x: e.x + e.width / 2,
			y: E ? s + p * Math.max(0, q(T)) : x + p * 8,
			text: C,
			anchor: "middle",
			baseline: f && !E ? "hanging" : "auto",
			fontSize: w?.fontSize ?? (r < 360 ? 10 : 11),
			fontWeight: w?.fontWeight ?? 600,
			style: {
				fill: w?.fill ?? n.foreground,
				...w?.opacity === void 0 ? { fillOpacity: .76 } : { opacity: w.opacity }
			}
		};
		c(U(D, i)), o.push(D);
	}
	function m(t, s, c, l) {
		let u = Sn(t.options), f = t.side === "right", p = f ? 1 : -1;
		u?.line !== !1 && (o.push({
			kind: "rule",
			key: `${t.id}-axis`,
			x1: s,
			x2: s,
			y1: e.y,
			y2: d,
			style: h(u?.line)
		}), l(s + p * bn(u?.line)));
		let m = u?.ticks === !1 ? [] : t.scale.ticks, g = q(u?.ticks === !1 ? 0 : u?.ticks?.size ?? 4), _ = q(u?.ticks === !1 ? 0 : u?.ticks?.padding ?? 4), v = Cn(u), y = v === !1 ? [] : Tn(t, wn(t.scale, t.options, v), s, g, _, v, r, n, i, a), b = v === !1 ? [] : Dn(y, v, !1), x = s;
		for (let e of m) {
			if (g <= 0) continue;
			let n = s + p * g;
			l(n), x = f ? Math.max(x, n) : Math.min(x, n), o.push({
				kind: "rule",
				key: `${t.id}-tick-rule:${j(e.value)}`,
				x1: s,
				x2: n,
				y1: e.position,
				y2: e.position,
				style: h()
			});
		}
		for (let e of b) c(e.bounds), x = f ? Math.max(x, e.bounds.x + e.bounds.width) : Math.min(x, e.bounds.x), o.push(e.label);
		let S = u?.label, C = typeof S == "string" ? S : S?.text;
		if (!C) return;
		let w = typeof S == "object" ? S : void 0, T = {
			kind: "label",
			key: `${t.id}-label`,
			x: s,
			y: e.y + e.height / 2,
			text: C,
			anchor: "middle",
			baseline: "middle",
			rotate: f ? 90 : -90,
			fontSize: w?.fontSize ?? 11,
			fontWeight: w?.fontWeight ?? 600,
			style: {
				fill: w?.fill ?? n.foreground,
				...w?.opacity === void 0 ? { fillOpacity: .76 } : { opacity: w.opacity }
			}
		}, E = w?.offset ?? "auto";
		if (E !== "auto") T.x = s + p * Math.max(0, q(E));
		else {
			let e = U({
				...T,
				x: 0,
				y: 0
			}, i);
			T.x = f ? x + 8 - e.x : x - 8 - (e.x + e.width);
		}
		c(U(T, i)), o.push(T);
	}
	function h(e) {
		return {
			stroke: n.foreground,
			strokeOpacity: .28,
			...yn(e) ?? {}
		};
	}
}
function yn(e) {
	if (!e || typeof e != "object") return;
	let t = {};
	return e.stroke !== void 0 && (t.stroke = e.stroke), e.strokeOpacity !== void 0 && (t.strokeOpacity = e.strokeOpacity), e.strokeWidth !== void 0 && (t.strokeWidth = e.strokeWidth), e.strokeDasharray !== void 0 && (t.strokeDasharray = e.strokeDasharray), e.lineCap !== void 0 && (t.lineCap = e.lineCap), Object.keys(t).length ? t : void 0;
}
function bn(e) {
	if (!e || typeof e != "object" || e.stroke === "none") return 0;
	let t = e.strokeWidth;
	return t !== void 0 && Number.isFinite(t) && t > 0 ? t / 2 : 0;
}
function xn(e, t, n, r) {
	let i = e?.axis === !1 ? void 0 : e?.axis?.ticks;
	if (i === !1) return Math.max(2, Math.min(r, Math.floor(t / n)));
	let a = i ?? {};
	if ([
		a.count !== void 0,
		a.spacing !== void 0,
		a.values !== void 0
	].filter(Boolean).length > 1) throw TypeError("Axis ticks accept only one candidate policy: count, spacing, or values");
	if (a.values) return Math.max(1, a.values.length);
	if (a.count !== void 0) return Math.max(1, Math.floor(q(a.count)));
	if (a.spacing !== void 0) {
		let e = Math.max(1, q(a.spacing));
		return Math.max(1, Math.floor(t / e));
	}
	return Math.max(2, Math.min(r, Math.floor(t / n)));
}
function Sn(e) {
	if (e && e.axis !== !1) return e.axis ?? {};
}
function Cn(e) {
	return e?.ticks === !1 || e?.tickLabels === !1 ? !1 : e?.tickLabels ?? {};
}
function wn(e, t, n) {
	let r = (typeof n.thin == "object" ? n.thin : void 0)?.keep ?? [];
	if (!r.length) return e.ticks;
	let i = t?.axis === !1 || t?.axis?.ticks === !1 ? void 0 : t?.axis?.ticks?.format, a = e.ticks.map((e) => ({
		...e,
		hard: r.some((t) => j(t) === j(e.value))
	})), o = new Set(a.map((e) => j(e.value)));
	for (let t of r) {
		let n = e.map(t);
		!o.has(j(t)) && Number.isFinite(n) && a.push({
			value: t,
			position: n,
			label: i?.(t) ?? jn(t),
			hard: !0
		});
	}
	return a;
}
function Tn(e, t, n, r, i, a, o, s, c, l = !1) {
	let u = o < 360 ? 10 : 11, d = e.side === "bottom" || e.side === "right", f = d ? 1 : -1;
	return t.map((t, o) => {
		let p = {
			value: t.value,
			index: o,
			position: t.position,
			bandwidth: e.scale.bandwidth
		}, m = a.rotate, h = En(a.fontSize, p) ?? u, g = En(a.fontWeight, p), _ = En(a.opacity, p), v = En(a.dx, p) ?? 0, y = En(a.dy, p) ?? 0, b = e.channel === "y" ? je(d ? "left" : "right", l ? "rtl" : "ltr") : (m ?? 0) < 0 ? je("right", l ? "rtl" : "ltr") : (m ?? 0) > 0 ? je("left", l ? "rtl" : "ltr") : "middle", x = En(a.anchor, p) ?? b, S = e.channel === "x" ? {
			kind: "label",
			key: `${e.id}-tick-label:${j(t.value)}`,
			x: t.position + v,
			y: n + f * (r + i + h * .8) + y,
			text: t.label,
			anchor: x,
			rotate: m,
			fontSize: h,
			fontWeight: g,
			style: {
				fill: s.muted,
				..._ === void 0 ? { fillOpacity: .68 } : { opacity: _ }
			}
		} : {
			kind: "label",
			key: `${e.id}-tick-label:${j(t.value)}`,
			x: n + f * (r + i) + v,
			y: t.position + y,
			text: t.label,
			anchor: x,
			baseline: "middle",
			rotate: m,
			fontSize: h,
			fontWeight: g,
			style: {
				fill: s.muted,
				..._ === void 0 ? { fillOpacity: .68 } : { opacity: _ }
			}
		};
		return {
			value: t.value,
			label: S,
			bounds: U(S, c),
			hard: t.hard ?? !1
		};
	});
}
function En(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Dn(e, t, n) {
	if (t.thin === !1 || e.length < 2) return [...e];
	let r = typeof t.thin == "object" ? t.thin : {}, i = Math.max(0, q(r.minGap ?? 4)), a = e.filter((e) => e.hard), o = e.filter((e) => !e.hard);
	if ((r.priority === "ends" || n) && o.length) {
		let e = o[0], t = o.at(-1);
		kn(e, a, i) || a.push(e), t !== e && !kn(t, a, i) && a.push(t);
	}
	let s = On(o.filter((e) => !a.includes(e)));
	for (let e of s) kn(e, a, i) || a.push(e);
	let c = new Set(a);
	return e.filter((e) => c.has(e));
}
function On(e) {
	if (e.length < 3) return [...e];
	let t = [], n = [e];
	for (; n.length;) {
		let e = n.shift();
		if (!e.length) continue;
		let r = Math.floor(e.length / 2);
		t.push(e[r]), n.push(e.slice(0, r), e.slice(r + 1));
	}
	return t;
}
function kn(e, t, n) {
	return t.some((t) => An(e.bounds, t.bounds, n));
}
function An(e, t, n) {
	return !(e.x + e.width + n <= t.x || t.x + t.width + n <= e.x || e.y + e.height + n <= t.y || t.y + t.height + n <= e.y);
}
function jn(e) {
	return e instanceof Date ? e.toLocaleDateString() : String(e);
}
function Mn(e) {
	return Number.isFinite(e) ? Math.max(1, e) : 1;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/runtime.js
function Nn(e = {}) {
	let t = {
		...Rt,
		...e.defaultTheme,
		palette: e.defaultTheme?.palette ?? Rt.palette
	};
	return {
		render(e, n, r) {
			if (!Pn(e)) return Bt(e, n, {
				...r,
				defaultTheme: t
			});
			let { chart: i, ...a } = e;
			return Bt({
				...i({
					width: n.width,
					height: n.height,
					defaultTheme: t
				}),
				...a
			}, n, {
				...r,
				defaultTheme: t
			});
		},
		destroy() {}
	};
}
function Pn(e) {
	return "chart" in e && typeof e.chart == "function";
}
//#endregion
//#region node_modules/@tanstack/charts/dist/adapter-shared.js
function Fn(e, t = 0) {
	return e.keyboard === !1 || e.focus === !1 || e.cursor?.mode === "free" ? -1 : t;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/dom-text.js
function In(e) {
	let t = e.ownerDocument.defaultView, n = t?.CanvasRenderingContext2D ? e.ownerDocument.createElement("canvas").getContext("2d") : null, r = o(), i = zn(r), a = /* @__PURE__ */ new Map();
	return {
		measureText(e, t) {
			if (!n) return H(e, t);
			let o = `${i}\0${t.fontSize}\0${t.fontWeight ?? ""}\0${t.fontFamily}\0${t.fontStyle}\0${t.fontStretch}\0${t.letterSpacing}\0${t.direction}\0${t.locale ?? ""}\0${t.fontScale}\0${t.anchor}\0${t.baseline}\0${e}`, s = a.get(o);
			if (s) return s;
			Ln(n, r.weight, t);
			let c = Rn(n.measureText(e), t);
			return a.set(o, c), c;
		},
		typography() {
			return {
				fontFamily: r.family,
				fontStyle: r.style,
				fontStretch: r.stretch,
				letterSpacing: r.letterSpacing,
				direction: r.direction
			};
		},
		refresh() {
			let e = o(), t = zn(e);
			return t !== i && (r = e, i = t, a.clear(), !0);
		},
		invalidate() {
			a.clear();
		}
	};
	function o() {
		let n = t?.getComputedStyle(e);
		return {
			family: n?.fontFamily || "sans-serif",
			style: n?.fontStyle || "normal",
			stretch: Bn(n?.fontStretch),
			weight: n?.fontWeight || "400",
			direction: n?.direction === "rtl" ? "rtl" : n?.direction === "ltr" ? "ltr" : "inherit",
			letterSpacing: Vn(n?.letterSpacing)
		};
	}
}
function Ln(e, t, n) {
	let r = Hn(n.fontScale, 1), i = n.fontSize * r, a = n.fontWeight ?? t;
	e.font = [
		n.fontStyle,
		a,
		`${i}px`,
		n.fontFamily
	].join(" "), "fontStretch" in e && (e.fontStretch = Bn(n.fontStretch)), e.textAlign = n.anchor === "middle" ? "center" : n.anchor, e.textBaseline = n.baseline === "auto" ? "alphabetic" : n.baseline, e.direction = n.direction, "letterSpacing" in e && (e.letterSpacing = `${n.letterSpacing * r}px`);
}
function Rn(e, t) {
	let n = t.fontSize * Hn(t.fontScale, 1), r = e.actualBoundingBoxLeft, i = e.actualBoundingBoxRight, a = e.actualBoundingBoxAscent, o = e.actualBoundingBoxDescent;
	if ([
		r,
		i,
		a,
		o
	].every((e) => Number.isFinite(e)) && (r + i > 0 || e.width === 0) && (a + o > 0 || e.width === 0)) return {
		x: -r,
		y: -a,
		width: r + i,
		height: a + o
	};
	let s = Number.isFinite(e.width) ? Math.max(0, e.width) : 0;
	return {
		x: Me(s, t.anchor, t.direction),
		y: t.baseline === "middle" ? -n / 2 : t.baseline === "hanging" ? 0 : -n * .8,
		width: s,
		height: n
	};
}
function zn(e) {
	return [
		e.family,
		e.style,
		e.stretch,
		e.weight,
		e.direction,
		e.letterSpacing
	].join("\0");
}
function Bn(e) {
	if (e === "ultra-condensed" || e === "extra-condensed" || e === "condensed" || e === "semi-condensed" || e === "normal" || e === "semi-expanded" || e === "expanded" || e === "extra-expanded" || e === "ultra-expanded") return e;
	let t = Number.parseFloat(e ?? "");
	return Number.isFinite(t) ? t <= 50 ? "ultra-condensed" : t <= 62.5 ? "extra-condensed" : t <= 75 ? "condensed" : t <= 87.5 ? "semi-condensed" : t < 112.5 ? "normal" : t < 125 ? "semi-expanded" : t < 150 ? "expanded" : t < 200 ? "extra-expanded" : "ultra-expanded" : "normal";
}
function Vn(e) {
	let t = Number.parseFloat(e ?? "");
	return Number.isFinite(t) ? t : 0;
}
function Hn(e, t) {
	return e !== void 0 && Number.isFinite(e) && e > 0 ? e : t;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/focus-disabled.js
var Un = {
	resolve: () => [],
	group: () => [],
	navigation: () => []
}, Wn = Jn("x", !0), Gn = Jn("y", !0), Kn = Jn("x", !1), qn = Jn("y", !1);
function Jn(e, t) {
	let n = (t) => kt(t, e), r = (t) => e === "x" ? t.y : t.x;
	return {
		resolve(i, a) {
			let { x: o, y: s, maxDistance: c } = a, l = e === "x" ? o : s, u, d = c;
			for (let e of i) {
				let t = Math.abs(n(e) - l);
				t >= d || (u = e, d = t);
			}
			if (!u) return [];
			let f = Yn(i, u, n), p = e === "x" ? s : o, m = f.reduce((e, t) => Math.abs(r(t) - p) < Math.abs(r(e) - p) ? t : e, u);
			return t ? [m, ...f.filter((e) => e !== m)] : [m];
		},
		group(e, r) {
			let { point: i } = r;
			return t ? Yn(e, i, n) : [i];
		},
		navigation(e) {
			let r = [...e].sort((e, t) => e.x - t.x || e.y - t.y);
			if (!t) return r;
			let i = /* @__PURE__ */ new Map();
			for (let e of r) {
				let t = j(n(e));
				i.has(t) || i.set(t, e);
			}
			return [...i.values()];
		}
	};
}
function Yn(e, t, n) {
	let r = j(n(t)), i = /* @__PURE__ */ new Map();
	i.set(j(t.group), t);
	for (let t of e) {
		if (j(n(t)) !== r) continue;
		let e = j(t.group);
		i.has(e) || i.set(e, t);
	}
	return [t, ...[...i.values()].sort((e, t) => e.y - t.y).filter((e) => e !== t)];
}
//#endregion
//#region node_modules/@tanstack/charts/dist/interaction.js
function Xn(e) {
	if (e !== !1) {
		if (typeof e != "string") return e;
		switch (e) {
			case "nearest-x": return Kn;
			case "nearest-y": return qn;
			case "group-x": return Wn;
			case "group-y": return Gn;
			case "nearest": return;
		}
	}
}
function Zn(e, t, n, r, i, a = e.points) {
	let o = Xn(t);
	if (o) {
		if (a === e.points && (o === Kn || o === qn || o === Wn || o === Gn)) {
			let t = nt(e, n, r);
			if (t) return t.point ? o.group(a, { point: t.point }) : [];
		}
		return o.resolve(a, {
			x: n,
			y: r,
			maxDistance: i
		});
	}
}
function Qn(e, t) {
	return e === t || e !== null && t !== null && e.key === t.key && e.markId === t.markId && e.datumIndex === t.datumIndex;
}
function $n(e, t) {
	let n = e.filter((e) => e.key === t.key);
	if (n.length < 2) return n[0] ?? null;
	let r = typeof t.datum;
	if (t.datum !== null && (r === "object" || r === "function")) {
		let e = n.find((e) => e.datum === t.datum);
		if (e) return e;
	}
	return n.find((e) => e.markId === t.markId && Object.is(e.group, t.group) && ir(e.xValue, t.xValue) && ir(e.yValue, t.yValue)) ?? n.find((e) => e.markId === t.markId && e.datumIndex === t.datumIndex) ?? n[0] ?? null;
}
function er(e, t, n) {
	let r = t ? e.findIndex((e) => Qn(e, t)) : -1, i;
	switch (n) {
		case "ArrowRight":
		case "ArrowDown":
			i = Math.min(e.length - 1, r + 1);
			break;
		case "ArrowLeft":
		case "ArrowUp":
			i = Math.max(0, r < 0 ? 0 : r - 1);
			break;
		case "Home":
			i = 0;
			break;
		case "End":
			i = e.length - 1;
			break;
		default: return;
	}
	return e[i] ?? null;
}
function tr(e, t, n) {
	let r = n === "ArrowRight" || n === "ArrowDown" ? 1 : n === "ArrowLeft" || n === "ArrowUp" ? -1 : n === "Home" ? 0 : n === "End" ? 2 : void 0;
	if (r === void 0) return;
	if (!e.length) return null;
	let i = t ? e.findIndex((e) => Qn(e, t)) : -1;
	if (!t || i < 0 || r === 0 || r === 2) return nr(e, r === 2);
	let a = null, o = -1;
	for (let n = 0; n < e.length; n += 1) {
		let s = e[n];
		if (!s) continue;
		let c = rr(s, n, t, i);
		r > 0 && c <= 0 || r < 0 && c >= 0 || (!a || r * rr(s, n, a, o) < 0) && (a = s, o = n);
	}
	return a ?? t;
}
function nr(e, t) {
	let n = e[0] ?? null, r = 0;
	for (let i = 1; i < e.length; i += 1) {
		let a = e[i];
		if (!a || !n) continue;
		let o = rr(a, i, n, r);
		(t && o > 0 || !t && o < 0) && (n = a, r = i);
	}
	return n;
}
function rr(e, t, n, r) {
	return e.x - n.x || e.y - n.y || t - r;
}
function ir(e, t) {
	return e instanceof Date && t instanceof Date ? e.getTime() === t.getTime() : Object.is(e, t);
}
//#endregion
//#region node_modules/@tanstack/charts/dist/cursor-host-contract.js
function ar(e) {
	let t = e.use;
	if (t.__chartExtensionType !== "cursor") throw TypeError("A chart cursor requires a cursor host extension.");
	return t.create(e.controller);
}
//#endregion
//#region node_modules/@tanstack/charts/dist/renderer.js
function or(e, t) {
	return (cr(e.nodes, t) ?? sr(e.focusGuides, t))?.compose(t) ?? t;
}
function sr(e, t) {
	for (let n of e ?? []) if (n.renderer !== void 0 && n.renderer !== t) return lr(n.renderer);
}
function cr(e, t) {
	for (let n of e) {
		if (n.renderer !== void 0 && n.renderer !== t) return lr(n.renderer);
		if (n.kind === "group") {
			let e = cr(n.children, t);
			if (e) return e;
		}
	}
}
function lr(e) {
	if (typeof e.compose != "function") throw TypeError(`Mark renderer "${e.id}" cannot compose chart layers`);
	return e;
}
function ur(e, t, n = Nn()) {
	mr(t.definition.tooltip);
	let r = t, i, a, o = null, s = "pointer", c = null, l = null, u = null, d, f, p, m = !1, h, g = !1, _ = !1, v, y, b = !1, x = !1, S, C, w = !1, T, E = /* @__PURE__ */ new Map(), D, O, k, A, j, M, N = null, P = !1, ee = e.style.position, F = e.ownerDocument.defaultView, te = F?.getComputedStyle(e).position, ne = !te || te === "static", I = In(e), re = e.ownerDocument.fonts;
	ne && (e.style.position = "relative");
	let L = (t = !1, n = "update") => {
		if (g) return;
		t && !r.measureText && I.refresh();
		let d = o, f = N, p = j;
		i = fr(Ae()), a = i;
		let m = or(i, r.renderer);
		v ? v.renderer !== m && (y?.(), y = void 0, ze(), Me(), v.destroy(), e.replaceChildren(), v = m.mount(e, ue), Ne(), _ = !1) : (v = m.mount(e, ue), Ne()), b = !0;
		try {
			v.render(i, {
				ariaLabel: r.ariaLabel,
				ariaDescription: r.ariaDescription,
				className: r.className,
				tabIndex: Fn(r.definition, r.tabIndex),
				idPrefix: r.idPrefix,
				animation: _ ? xr(r.definition.svgAnimation, e, n) : void 0
			});
		} finally {
			b = !1;
		}
		je(), _ = !0;
		let h = W();
		T = r.definition.focus === !1 ? void 0 : r.definition.spatialIndex?.(Jt(i, i.points), { scene: i });
		let x = R();
		if (j = x, x) me(!0);
		else if (p) N = null, o = null, u = null, l = null, c = null, V(null, []), d && (r.onFocusChange?.(null), r.onFocusGroupChange?.([]));
		else {
			N = null;
			let e = (c === "pointer" || c === "controlled" && s === "pointer") && u === null ? l : null, t = e ? U(e.x, e.y, Fe()) : d ? (() => {
				let e = $n(h, d);
				return e ? G(e, h) : [];
			})() : [], n = t[0] ?? null;
			o = n, n || (u = null), (d || n || f) && (e || (s = "restored"), V(n, t), r.onFocusChange?.(n), r.onFocusGroupChange?.(t));
		}
		let S = r.onRender;
		S && S({
			container: e,
			scene: i,
			surface: v,
			interaction: ye
		});
	}, ie = () => r.width === void 0, ae = () => r.height === void 0 && !hr(r.aspectRatio), oe = (t) => {
		let n = F?.getComputedStyle(e), r = J(n?.paddingLeft) + J(n?.paddingRight), i = J(n?.paddingTop) + J(n?.paddingBottom), a = J(n?.borderLeftWidth) + J(n?.borderRightWidth), o = J(n?.borderTopWidth) + J(n?.borderBottomWidth);
		return {
			width: gr(n?.width, n?.boxSizing, t?.width, r, a),
			height: gr(n?.height, n?.boxSizing, t?.height, i, o)
		};
	}, se = () => {
		let t = ie(), n = ae(), i = (t || n) && !f ? e.getBoundingClientRect() : void 0, a = t || n ? f ?? oe(i) : void 0;
		return {
			width: r.width ?? a?.width,
			height: n ? a?.height : void 0
		};
	}, ce = () => {
		let e = se();
		return ie() && e.width !== void 0 && e.width !== i.width || ae() && e.height !== void 0 && e.height !== i.height;
	}, le = () => {
		if (d?.disconnect(), d = void 0, f = void 0, !ie() && !ae()) return;
		let t = F?.ResizeObserver;
		t && (d = new t((t) => {
			let n = t.find((t) => t.target === e) ?? t[0];
			f = n ? {
				width: vr(n.contentRect.width),
				height: vr(n.contentRect.height)
			} : void 0, ce() && ue(!1, "resize");
		}), d.observe(e));
	}, ue = (e = !1, t = "layout") => {
		if (m ||= e, h = h === "layout" || t === "layout" ? "layout" : "resize", p === void 0) {
			if (!F?.requestAnimationFrame) {
				let e = m || ce();
				m = !1;
				let t = h ?? "layout";
				h = void 0, e && L(!0, t);
				return;
			}
			p = F.requestAnimationFrame(() => {
				p = void 0;
				let e = m || ce();
				m = !1;
				let t = h ?? "layout";
				h = void 0, e && L(!0, t);
			});
		}
	}, de = () => {
		g || r.measureText || (I.invalidate(), ue(!0));
	}, R = () => r.definition.cursor, fe = () => D?.getState()?.pinned === !0, z = () => u !== null || fe(), pe = () => {
		let e = R();
		e && (P = !0);
		let t = e?.controller, n = e?.mode, r = e?.mode === "focus" ? e.match ?? "xy" : void 0;
		(t !== D?.controller || n !== O || r !== k || e?.use !== A) && (M?.(), M = void 0, D?.destroy(), D = e ? ar(e) : void 0, O = n, k = r, A = e?.use, M = D?.subscribe(() => {
			!g && _ && me(!1);
		}));
	}, me = (e) => {
		let t = R();
		if (!t) {
			N = null;
			return;
		}
		let n = D;
		if (!n) return;
		let a = n.getState();
		(a?.source !== "pointer" || !n.owns(a)) && (l = null), N = n.resolvePresentation(i, t, a);
		let c = o;
		if (t.mode === "focus") {
			let i = Xn(r.definition.focus), l = n.resolveFocus(W(), t, a, i), d = l[0] ?? null;
			a && (s = a.source), u = a?.pinned && d ? d.key : null, o = d, V(d, l), (!Qn(c, d) || e && (c !== null || d !== null)) && (r.onFocusChange?.(d), r.onFocusGroupChange?.(l));
			return;
		}
		u = null, o = null, V(null, []), c && (r.onFocusChange?.(null), r.onFocusGroupChange?.([]));
	}, he = (e, t = z()) => {
		let n = R();
		if (n?.mode !== "focus") return !1;
		let r = D;
		if (!r) return !1;
		let a = e[0];
		return a ? (r.publish(r.createFocusState(i, n, {
			primary: a,
			group: e,
			source: s,
			pinned: t
		})), !0) : (r.clearOwnedTransient(), !0);
	}, B = (e, t = !1) => {
		let n = e[0] ?? null;
		if (!he(e)) {
			if (Qn(n, o)) {
				o = n, t && V(n, e);
				return;
			}
			o = n, V(n, e), r.onFocusChange?.(n), r.onFocusGroupChange?.(e);
		}
	}, ge = () => {
		let t = R();
		if (!o && !u && !D?.getState()) return;
		let n = !!C?.contains(e.ownerDocument.activeElement);
		u = null, l = null, c = null, t ? D?.clear() : B([]);
		let r = v?.element;
		n && r && "focus" in r && typeof r.focus == "function" && (w = !0, r.focus());
	}, V = (e, t) => {
		x = !0;
		let n;
		try {
			let r = e ? {
				primary: e,
				group: t,
				source: s,
				pinned: z()
			} : null;
			n = P ? v?.paintFocus(r, l, N) : v?.paintFocus(r, l);
		} finally {
			x = !1;
		}
		a = n ?? i, Ie(e, t);
	}, _e = (e, t) => {
		let n = v?.clientToScene?.(i, e, t);
		return n ? {
			position: n,
			points: U(n.x, n.y, Fe())
		} : null;
	}, ve = (e, t) => {
		let n = _e(e, t);
		return l = n?.position ?? null, n?.points ?? [];
	}, ye = {
		clientToScene(e, t) {
			return g ? null : v?.clientToScene?.(i, e, t) ?? null;
		},
		resolvePointer(e, t) {
			if (g) return null;
			let n = _e(e, t), r = n?.points[0];
			return n && r ? {
				position: n.position,
				point: r,
				points: n.points
			} : null;
		},
		setControlledFocus(e, t = {}) {
			if (g) return;
			if (c = "controlled", !e) {
				s = t.source ?? "programmatic", l = null, u = null, B([]), c = null;
				return;
			}
			let n, r;
			pr(e) ? (n = e, r = e.point) : (n = null, r = e), s = t.source ?? (n === null ? "programmatic" : "pointer");
			let i = W(), a = $n(i, r);
			if (l = n?.position ?? null, !a) {
				u = null, B([]), c = null;
				return;
			}
			let d = G(a, i);
			if (u = t.pinned && (Be() || R()?.pin === !0) ? a.key : null, Qn(a, o)) {
				o = a, V(a, d);
				return;
			}
			B(d);
		}
	}, be = (e, t) => {
		let n = v?.clientToScene?.(i, e, t);
		return l = n ?? null, n;
	}, xe = (e, t) => {
		let n = R();
		if (n?.mode !== "free") return !1;
		if (fe()) return !0;
		let r = be(e, t);
		if (!r || !br(i, r)) return l = null, D?.clearOwnedTransient(), !0;
		let a = D;
		return a ? (a.publish(a.createFreeState(i, n, r, "pointer", !1)), !0) : !1;
	}, Se = (e) => {
		if (H(e.target)) {
			z() || (l = null, B([]));
			return;
		}
		r.definition.pointer === !1 || z() || (c = "pointer", s = "pointer", !xe(e.clientX, e.clientY) && B(ve(e.clientX, e.clientY), Ve()));
	}, Ce = (e) => {
		r.definition.pointer === !1 || z() || (c = "pointer", s = "pointer", xe(e.clientX, e.clientY));
	}, we = ({ relatedTarget: t }) => {
		r.definition.pointer !== !1 && c === "pointer" && !z() && !(F && t instanceof F.Node && e.contains(t)) && (l = null, R() ? D?.clearOwnedTransient() : B([]), c = null);
	}, Te = ({ relatedTarget: t }) => {
		c === "keyboard" && !u && !(F && t instanceof F.Node && e.contains(t)) && (l = null, R() ? D?.clearOwnedTransient() : B([]), c = null);
	}, Ee = (t) => {
		if (r.definition.pointer === !1 || u === null || fe()) return;
		let n = t.composedPath();
		n.includes(e) || n.some((e) => F && e instanceof F.Node && C?.contains(e)) || ge();
	}, De = (t) => {
		if (H(t.target) || r.definition.pointer === !1) return;
		let n = C, i = e.ownerDocument.defaultView?.Node, a = i ? t.composedPath().some((e) => e instanceof i && n?.contains(e)) : n?.contains(t.target);
		if (n && a) return;
		c = "pointer";
		let o = R();
		if (o?.mode === "free") {
			D?.getState() || xe(t.clientX, t.clientY);
			let e = D?.getState();
			o.pin && e && (e.pinned ? D?.clear() : D?.publish({
				...e,
				pinned: !0
			})), r.onSelect?.(null);
			return;
		}
		let l = ve(t.clientX, t.clientY);
		s = "pointer";
		let d = l[0] ?? null, f = !1, p = Be() || o?.pin === !0;
		p && (z() ? (u = null, f = !0, o && D?.clear()) : d && (u = d.key, f = !0)), o && p && f && !u || B(l, f), r.definition.selection?.change(d, "pointer"), r.onSelect?.(d);
	}, Oe = (e) => {
		if (H(e.target)) return;
		let t = R();
		if (e.key === "Escape" && D?.getState()) {
			e.preventDefault(), ge();
			return;
		}
		if (e.key === "Escape" && u) {
			e.preventDefault(), ge();
			return;
		}
		if (r.definition.keyboard === !1 || t?.mode === "free") return;
		let n = W();
		if (!n.length) return;
		if (e.key === "Enter" || e.key === " ") {
			if (!o) return;
			e.preventDefault();
			let n = o, i = Be() || t?.pin === !0;
			t?.mode === "focus" && i ? z() ? (u = null, D?.clear()) : (u = n.key, he(G(n), !0)) : Be() && (u = u ? null : n.key, V(n, G(n))), r.definition.selection?.change(n, "keyboard"), r.onSelect?.(n);
			return;
		}
		let i = yr(r.definition.focus), a = i ? er(i.navigation(n), o, e.key) : tr(n, o, e.key);
		a !== void 0 && (e.preventDefault(), l = null, c = "keyboard", s = "keyboard", B(a ? G(a) : []));
	}, ke = (e) => {
		if (H(e.target)) {
			u || (l = null, B([]));
			return;
		}
		if (e.target === v?.element && w) {
			w = !1;
			return;
		}
		if (r.definition.keyboard !== !1 && R()?.mode !== "free" && e.target === v?.element && !o) {
			let e = yr(r.definition.focus), t = W(), n = e ? e.navigation(t)[0] : tr(t, null, "Home");
			l = null, c = "keyboard", s = "keyboard", B(n ? G(n) : []);
		}
	};
	return e.addEventListener("pointermove", Se), e.addEventListener("pointerdown", Ce), e.addEventListener("pointercancel", we), e.addEventListener("mouseleave", we), e.addEventListener("click", De), e.addEventListener("keydown", Oe), e.addEventListener("focusin", ke), e.addEventListener("focusout", Te), re?.addEventListener?.("loadingdone", de), pe(), L(), le(), e.ownerDocument.addEventListener("pointerdown", Ee, !0), {
		interaction: ye,
		update(e) {
			if (g) return;
			mr(e.definition.tooltip);
			let t = e.measureText === void 0 && I.refresh(), n = r.definition !== e.definition, i = r.height !== e.height || r.aspectRatio !== e.aspectRatio || r.width !== e.width || r.initialWidth !== e.initialWidth, a = r.idPrefix !== e.idPrefix || r.renderer !== e.renderer || r.measureText !== e.measureText || t, s = n || i || r.ariaLabel !== e.ariaLabel || r.ariaDescription !== e.ariaDescription || r.className !== e.className || r.tabIndex !== e.tabIndex || r.idPrefix !== e.idPrefix || r.renderer !== e.renderer || r.measureText !== e.measureText || t, d = r.width !== e.width || r.height !== e.height || r.aspectRatio !== e.aspectRatio, f = r.definition.pointer !== !1 && e.definition.pointer === !1 && c === "pointer";
			r = e, pe(), Re(), f && (l = null, u = null, c = null, B([])), Be() || (u = null), s ? L(!1, a ? "layout" : i ? "resize" : "update") : R() ? me(!1) : o && V(o, G(o)), d && le();
		},
		getScene: () => i,
		destroy() {
			g || (g = !0, d?.disconnect(), M?.(), M = void 0, D?.destroy(), D = void 0, O = void 0, k = void 0, A = void 0, re?.removeEventListener?.("loadingdone", de), p !== void 0 && F?.cancelAnimationFrame?.(p), ze(), Me(), y?.(), y = void 0, v?.destroy(), n.destroy(), e.removeEventListener("pointermove", Se), e.removeEventListener("pointerdown", Ce), e.removeEventListener("pointercancel", we), e.removeEventListener("mouseleave", we), e.removeEventListener("click", De), e.removeEventListener("keydown", Oe), e.removeEventListener("focusin", ke), e.removeEventListener("focusout", Te), e.ownerDocument.removeEventListener("pointerdown", Ee, !0), e.replaceChildren(), ne && e.style.position === "relative" && (e.style.position = ee));
		}
	};
	function Ae() {
		let e = se(), t = e.width ?? (_ ? i.width : r.initialWidth ?? 640);
		return n.render(r.definition, {
			width: t,
			height: r.height ?? (hr(r.aspectRatio) ? t / r.aspectRatio : e.height ?? (_ ? i.height : 320))
		}, {
			measureText: r.measureText ?? I.measureText,
			typography: I.typography()
		});
	}
	function je() {
		let t = /* @__PURE__ */ new Set();
		for (let n of i.controls ?? []) {
			let r = n.extension, a = `${r.id}:${n.key}`;
			t.add(a);
			let o = E.get(a);
			o && o.extension !== r && (o.instance.destroy(), E.delete(a), o = void 0), o || (o = {
				extension: r,
				instance: r.create({
					container: e,
					surface: v
				})
			}, E.set(a, o)), o.instance.update(n, i);
		}
		for (let [e, n] of E) t.has(e) || (n.instance.destroy(), E.delete(e));
	}
	function Me() {
		for (let e of E.values()) e.instance.destroy();
		E.clear();
	}
	function H(e) {
		for (let t of E.values()) if (t.instance.contains?.(e)) return !0;
		return !1;
	}
	function U(e, t, n) {
		let o = W(), s = yr(r.definition.focus), c = Zn(a, s, e, t, n, o);
		if (c) return c;
		let l = v?.getPresentationPoints?.() === void 0 ? T && a === i ? T.findNearest(e, t, n) : qt(a, e, t, n, o) : et(o, e, t, n), u = l ? $n(o, l) : null;
		return u ? [u] : [];
	}
	function W() {
		let e = v?.getPresentationPoints?.() ?? a.points;
		return Jt(i, e);
	}
	function G(e, t = W()) {
		return yr(r.definition.focus)?.group(t, { point: e }) ?? [e];
	}
	function Ne() {
		y = v?.subscribePresentationPoints?.(Pe);
	}
	function Pe(e) {
		if (g || b || x) return;
		if (R()) {
			me(!1);
			return;
		}
		let t = Jt(i, e);
		if (l && u === null) {
			B(U(l.x, l.y, Fe()), !0);
			return;
		}
		if (!o) return;
		let n = $n(t, o);
		B(n ? G(n, t) : [], !0);
	}
	function Fe() {
		return r.definition.maxFocusDistance ?? 48;
	}
	function Ie(t, n) {
		let a = mr(r.definition.tooltip);
		if (!a || !t || !v) {
			C?.hide();
			return;
		}
		if (S !== a.extension || !C) {
			ze(), S = a.extension;
			let t = v.renderer.capabilities?.tooltipMotion;
			C = a.extension.create({
				container: e,
				motion: t?.protocol === 1 ? t.createController({
					container: e,
					transition: Le
				}) : void 0,
				dismiss: ge,
				bodyChange: () => r.onTooltipBodyChange
			});
		}
		let o = C;
		o.update(a.options), o.paint({
			point: t,
			points: n,
			scene: i,
			surface: v,
			pointer: l,
			focus: {
				primary: t,
				group: n,
				source: s,
				pinned: z()
			},
			pinned: z()
		});
	}
	function Le() {
		let e = r.definition.motion;
		return e === !1 ? !1 : typeof e == "function" ? void 0 : e?.transition;
	}
	function Re() {
		let e = mr(r.definition.tooltip);
		e ? e.extension === S ? C?.update(e.options) : ze() : (C?.update(dr), C?.hide());
	}
	function ze() {
		C?.destroy(), C = void 0, S = void 0;
	}
	function Be() {
		let e = mr(r.definition.tooltip);
		return !!(e && e.options.sticky !== !1);
	}
	function Ve() {
		let e = mr(r.definition.tooltip)?.options.anchor;
		return e === "pointer" || typeof e == "function" || typeof e == "object" && (e.x === "pointer" || e.y === "pointer");
	}
}
var dr = {};
function fr(e) {
	let t = new Set((e.controls ?? []).flatMap((e) => e.fallbackNodeKey ? [e.fallbackNodeKey] : []));
	return t.size ? {
		...e,
		nodes: e.nodes.filter((e) => !t.has(e.key))
	} : e;
}
function pr(e) {
	return "position" in e && "point" in e && "points" in e;
}
function mr(e) {
	if (!e) return null;
	let t = "create" in e ? e : e.use;
	if (t.__chartTooltipHost !== "dom") throw TypeError("DOM chart hosts require a tooltip extension from @tanstack/charts/tooltip.");
	let n = t;
	return "create" in e ? {
		extension: n,
		options: dr
	} : {
		extension: n,
		options: e
	};
}
function hr(e) {
	return typeof e == "number" && Number.isFinite(e) && e > 0;
}
function J(e) {
	return _r(e) ?? 0;
}
function gr(e, t, n, r, i) {
	let a = hr(n) ? _r(e) : void 0, o = a === void 0 ? (n ?? 0) - r - i : a - (t === "border-box" ? r + i : 0);
	return hr(o) ? o : void 0;
}
function _r(e) {
	let t = /^(-?(?:\d+(?:\.\d*)?|\.\d+))px$/i.exec(e?.trim() ?? "");
	if (!t) return;
	let n = Number(t[1]);
	return Number.isFinite(n) ? n : void 0;
}
function vr(e) {
	return hr(e) ? e : void 0;
}
function yr(e) {
	return e === !1 ? Un : Xn(e);
}
function br(e, t) {
	return t.x >= e.chart.x && t.x <= e.chart.x + e.chart.width && t.y >= e.chart.y && t.y <= e.chart.y + e.chart.height;
}
function xr(e, t, n) {
	let r = e === !0 ? {} : e || void 0;
	if (!r || n === "layout" || n === "resize" && r.resize !== !0 || (r.respectReducedMotion ?? !0) && t.ownerDocument.defaultView?.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
	let { resize: i, ...a } = r;
	return a;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/reconcile.js
var Sr = /* @__PURE__ */ new Set([
	"cx",
	"cy",
	"d",
	"fill-opacity",
	"font-size",
	"font-weight",
	"fx",
	"fy",
	"height",
	"opacity",
	"r",
	"rx",
	"stroke-opacity",
	"stroke-width",
	"transform",
	"width",
	"x",
	"x1",
	"x2",
	"y",
	"y1",
	"y2"
]);
function Cr(e, t, n) {
	let r = e.ownerDocument.createElement("template");
	r.innerHTML = t;
	let i = r.content.firstElementChild;
	if (!i) return () => {};
	let a = e.firstElementChild;
	if (!a || a.namespaceURI !== i.namespaceURI || a.localName !== i.localName) return e.replaceChildren(i), () => {};
	let o = [];
	return Tr(a, i, n ? o : void 0), n ? kr(e, o, n) : () => {};
}
function wr(e, t, n) {
	let r = e.ownerDocument.createElement("template");
	r.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg">${t}</svg>`;
	let i = r.content.firstElementChild?.firstElementChild;
	if (!i) return () => {};
	if (e.namespaceURI !== i.namespaceURI || e.localName !== i.localName) return e.replaceWith(i), () => {};
	let a = [];
	return Tr(e, i, n ? a : void 0), n ? kr(e, a, n) : () => {};
}
function Tr(e, t, n) {
	if (Er(e, t, n), !t.firstElementChild) {
		if (e.firstElementChild) for (let t of [...e.children]) n ? Or(t, n) : t.remove();
		else e.textContent !== t.textContent && (e.textContent = t.textContent);
		return;
	}
	let r = [...e.children], i = [...t.children], a = Nr(r), o = Pr(i), s = /* @__PURE__ */ new Set(), c = e.firstElementChild;
	i.forEach((t, r) => {
		let i = o[r], l = a.get(i), u;
		l && l.namespaceURI === t.namespaceURI && l.localName === t.localName ? (u = l, s.add(l), u !== c && e.insertBefore(u, c), Tr(u, t, n)) : l && e.localName === "defs" ? (u = t.cloneNode(!0), l.replaceWith(u), l !== c && e.insertBefore(u, c)) : (u = t.cloneNode(!0), e.insertBefore(u, c), Dr(u, t, n)), c = u.nextElementSibling;
	});
	for (let t of r) !s.has(t) && t.parentElement === e && (n ? Or(t, n) : t.remove());
}
function Er(e, t, n) {
	let r = new Set(t.getAttributeNames());
	for (let t of e.getAttributeNames()) r.has(t) || e.removeAttribute(t);
	for (let i of r) {
		let r = t.getAttribute(i), a = e.getAttribute(i);
		if (r === a) continue;
		let o = n && a !== null && r !== null && Sr.has(i) ? jr(i, a, r) : void 0;
		o && n ? n.push({
			element: e,
			name: i,
			interpolate: o,
			target: r
		}) : r !== null && e.setAttribute(i, r);
	}
}
function Dr(e, t, n) {
	if (!n) return;
	let r = t.getAttribute("opacity"), i = r ?? "1";
	e.setAttribute("opacity", "0"), n.push({
		element: e,
		name: "opacity",
		interpolate: (e) => String(Number(i) * Math.max(0, Math.min(1, e))),
		target: r
	});
}
function Or(e, t) {
	let n = Number(e.getAttribute("opacity") ?? 1), r = Number.isFinite(n) ? n : 1;
	t.push({
		element: e,
		name: "opacity",
		interpolate: (e) => String(r * (1 - e)),
		target: "0",
		removeOnFinish: !0
	});
}
function kr(e, t, n) {
	if (!t.length) return () => {};
	let r = e.ownerDocument.defaultView, i = r?.requestAnimationFrame?.bind(r), a = r?.cancelAnimationFrame?.bind(r), o = Math.max(0, n.duration ?? 240);
	if (!i || !a || o === 0) return Ar(t), () => {};
	let s = 0, c = !1, l, u = Fr(n.easing ?? "ease-out"), d = (e) => {
		if (c) return;
		l ??= e;
		let n = Math.min(1, (e - l) / o), r = u(n);
		for (let e of t) e.element.setAttribute(e.name, e.interpolate(r));
		n < 1 ? s = i(d) : Ar(t);
	};
	return s = i(d), () => {
		c = !0, a(s);
	};
}
function Ar(e) {
	for (let t of e) {
		if (t.removeOnFinish) {
			t.element.remove();
			continue;
		}
		t.target === null ? t.element.removeAttribute(t.name) : t.element.setAttribute(t.name, t.target);
	}
}
function jr(e, t, n) {
	let r = e === "d", i = Mr(t, r), a = Mr(n, r);
	if (i.skeleton !== a.skeleton || i.values.length !== a.values.length || !i.values.length) return;
	let o = a.skeleton;
	return (e) => {
		let t = 0;
		return o.replaceAll(/[#!]/g, (n) => {
			let r = i.values[t], o = a.values[t];
			return t += 1, Ir(n === "!" ? o : r + (o - r) * e);
		});
	};
}
function Mr(e, t = !1) {
	let n = [], r = "", i = "", a = 0, o = 0;
	for (; o < e.length;) {
		let s = e.slice(o), c = a % 7, l = t && /a/i.test(i) && c > 2 && c < 5, u = l ? /^[01]/u.exec(s) : /^-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/iu.exec(s);
		if (u) {
			n.push(Number(u[0])), r += l ? "!" : "#", a += 1, o += u[0].length;
			continue;
		}
		let d = e[o];
		r += d, t && /[a-z]/i.test(d) && (i = d, a = 0), o += 1;
	}
	return {
		skeleton: r,
		values: n
	};
}
function Nr(e) {
	let t = /* @__PURE__ */ new Map();
	return Pr(e).forEach((n, r) => {
		t.set(n, e[r]);
	}), t;
}
function Pr(e) {
	let t = /* @__PURE__ */ new Map();
	return e.map((e) => {
		let n = e.getAttribute("data-ts-key");
		if (n) return `key:${n}`;
		let r = t.get(e.localName) ?? 0;
		return t.set(e.localName, r + 1), `tag:${e.localName}:${r}`;
	});
}
function Fr(e) {
	if (typeof e == "function") return e;
	switch (e) {
		case "linear": return (e) => e;
		case "ease-in": return (e) => e * e;
		case "ease-in-out": return (e) => e < .5 ? 2 * e * e : 1 - (-2 * e + 2) ** 2 / 2;
		case "ease":
		case "ease-out": return (e) => 1 - (1 - e) ** 3;
	}
}
function Ir(e) {
	return String(Math.round(e * 1e3) / 1e3);
}
//#endregion
//#region node_modules/@tanstack/charts/dist/markup-internal.js
function Y(e) {
	return String(Math.round(e * 100) / 100);
}
var Lr = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;"
}, Rr = /[&<>\u0000-\u0008\u000b\u000c\u000e-\u001f\ufffe\uffff]|\p{Cs}/gu;
function zr(e) {
	return Lr[e] ?? "�";
}
function Br(e) {
	return e.replace(Rr, zr);
}
function X(e) {
	return e.replace(Rr, zr).replace(/"/g, Lr["\""]);
}
//#endregion
//#region node_modules/@tanstack/charts/dist/svg-render-context-internal.js
var Vr = /* @__PURE__ */ new WeakMap();
function Hr(e) {
	return Vr.get(e);
}
function Ur(e, t, n) {
	let r = Vr.get(e);
	Vr.set(e, t);
	try {
		return n();
	} finally {
		r ? Vr.set(e, r) : Vr.delete(e);
	}
}
//#endregion
//#region node_modules/@tanstack/charts/dist/svg-renderer.js
function Wr(e, t, n) {
	let r = t.idPrefix ?? "", i = t.className ? `ts-chart ${t.className}` : "ts-chart", a = t.ariaDescription ? `<desc>${Br(t.ariaDescription)}</desc>` : "", o = n?.renderDefinitions?.(e, r) ?? "", s = e.direction === "ltr" || e.direction === "rtl" ? ` direction="${e.direction}"` : "", c = e.theme.background === "transparent" ? "" : Jr({
		kind: "rect",
		key: "background",
		x: 0,
		y: 0,
		width: e.width,
		height: e.height,
		style: { fill: e.theme.background }
	}, n, r);
	return `<svg class="${X(i)}" width="100%" height="100%" viewBox="0 0 ${Y(e.width)} ${Y(e.height)}" role="img" aria-roledescription="chart" aria-label="${X(t.ariaLabel)}" tabindex="${Y(t.tabIndex ?? 0)}"${s} style="display:block;overflow:visible">${a}${o}${c}${Gr(e.nodes, r, n, Hr(t))}</svg>`;
}
function Gr(e, t = "", n, r) {
	let i = "";
	for (let a of e) i += Jr(a, n, t, r);
	return i;
}
function Kr(e, t, n = "", r) {
	return `<g data-ts-key="focus-guide-layer:${t}" class="ts-chart__focus-guide-layer ts-chart__focus-guide-layer--${t}" data-ts-focus-layer="${t}" data-ts-focus-guide-layer="${t}" aria-hidden="true" visibility="${e.length ? "visible" : "hidden"}">${Gr(e, n, r ?? qr)}</g>`;
}
var qr = { renderGroup: Zr };
function Jr(e, t, n, r) {
	let i = $r(e, t, n);
	switch (e.kind) {
		case "group": {
			let a = e.translateX === void 0 && e.translateY === void 0 ? "" : ` transform="translate(${Y(e.translateX ?? 0)} ${Y(e.translateY ?? 0)})"`, o = t?.renderGroup?.(e, n);
			return `<g${i}${a}${e.focus ? ` data-ts-focus-layer="${e.focus.placement}"${e.focus.retarget ? " data-ts-focus-retarget=\"true\"" : ""} visibility="hidden"` : ""}${o?.attributes ?? ""}>${o?.content ?? ""}${Gr(r?.(e) ?? e.children, n, t, r)}</g>`;
		}
		case "rule": return `<line${i} x1="${Y(e.x1)}" y1="${Y(e.y1)}" x2="${Y(e.x2)}" y2="${Y(e.y2)}"/>`;
		case "polyline": return `<path${i} d="${X(e.path ?? Xr(e.points, !1))}" vector-effect="non-scaling-stroke"/>`;
		case "area": {
			let t = e.polygons === void 0 ? e.path ?? Xr(e.points, !0) : Yr(e.polygons), n = e.polygons === void 0 ? "" : " fill-rule=\"evenodd\"";
			return `<path${i} d="${X(t)}"${n} vector-effect="non-scaling-stroke"/>`;
		}
		case "dot": return `<circle${i} cx="${Y(e.x)}" cy="${Y(e.y)}" r="${Y(e.radius)}"/>`;
		case "rect": return e.cornerRadii === void 0 ? `<rect${i} x="${Y(e.x)}" y="${Y(e.y)}" width="${Y(e.width)}" height="${Y(e.height)}"${e.radius === void 0 ? "" : ` rx="${Y(e.radius)}"`}/>` : `<path${i} d="${Be(e.x, e.y, e.width, e.height, e.cornerRadii)}"/>`;
		case "label": {
			let t = e.rotate === void 0 ? "" : ` transform="rotate(${Y(e.rotate)} ${Y(e.x)} ${Y(e.y)})"`, n = e.anchor ? ` text-anchor="${e.anchor}"` : "", r = e.baseline ? ` dominant-baseline="${e.baseline}"` : "", a = e.fontSize === void 0 ? "" : ` font-size="${Y(e.fontSize)}"`, o = e.fontWeight === void 0 ? "" : ` font-weight="${Y(e.fontWeight)}"`;
			return `<text${i} x="${Y(e.x)}" y="${Y(e.y)}"${n}${r}${t}${a}${o} font-family="inherit">${Br(e.text)}</text>`;
		}
	}
}
function Yr(e) {
	return e.flatMap((e) => e).filter((e) => e.length > 0).map((e) => Xr(e, !0)).join("");
}
function Xr(e, t) {
	return `${e.map(([e, t], n) => `${n === 0 ? "M" : "L"}${Y(e)},${Y(t)}`).join("")}${t ? "Z" : ""}`;
}
function Zr(e, t) {
	if (!e.clip) return;
	let n = t.replaceAll(/[^a-zA-Z0-9_-]/g, ""), r = `${n ? `${n}-` : ""}ts-chart-clip-${Qr(e.key)}`;
	return {
		attributes: ` clip-path="url(#${r})"`,
		content: `<defs data-ts-key="${X(`${e.key}:clip-defs`)}"><clipPath id="${r}"><rect x="${Y(e.clip.x)}" y="${Y(e.clip.y)}" width="${Y(e.clip.width)}" height="${Y(e.clip.height)}"/></clipPath></defs>`
	};
}
function Qr(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t = Math.imul(t ^ e.charCodeAt(n), 16777619);
	return (t >>> 0).toString(36);
}
function $r(e, t, n) {
	return `${` data-ts-key="${X(e.key)}"`}${e.className ? ` class="${X(e.className)}"` : ""}${e.ariaHidden ? " aria-hidden=\"true\"" : ""}${ei(e.style, t, n)}`;
}
function ei(e, t, n) {
	return e ? Z("fill", ti(e.fill, t, n)) + Z("fill-opacity", e.fillOpacity) + Z("stroke", ti(e.stroke, t, n)) + Z("stroke-opacity", e.strokeOpacity) + Z("stroke-width", e.strokeWidth) + Z("opacity", e.opacity) + Z("stroke-linecap", e.lineCap) + Z("stroke-linejoin", e.lineJoin) + Z("stroke-dasharray", e.strokeDasharray) : "";
}
function ti(e, t, n) {
	return e && t?.resolvePaint ? t.resolvePaint(e, n) : e;
}
function Z(e, t) {
	return t == null ? "" : ` ${e}="${typeof t == "number" ? Y(t) : X(t)}"`;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/svg.js
function ni(e, t) {
	let n = new Set(e.gradients.map((e) => e.id));
	return Wr(e, t, {
		renderDefinitions: (e, t) => ri(e, ai(t)),
		renderGroup: Zr,
		resolvePaint: n.size ? (e, t) => {
			let r = /^url\(#([^)]+)\)$/.exec(e)?.[1];
			return r && n.has(r) ? `url(#${ii(ai(t), r)})` : e;
		} : void 0
	});
}
function ri(e, t) {
	return e.gradients.length ? `<defs data-ts-key="gradients">${e.gradients.map((e) => {
		let n = 0, r = e.stops.map((t, r) => {
			let i = Math.max(n, oi(t.offset));
			return n = i, `<stop data-ts-key="gradient:${X(e.id)}:stop:${r}" offset="${Q(i)}" stop-color="${X(t.color)}"${t.opacity === void 0 ? "" : ` stop-opacity="${Y(t.opacity)}"`}/>`;
		}).join("");
		if (e.type === "radial") {
			let n = e.cx ?? .5, i = e.cy ?? .5;
			return `<radialGradient data-ts-key="gradient:${X(e.id)}" id="${X(ii(t, e.id))}" cx="${Q(n)}" cy="${Q(i)}" r="${Q(e.r ?? .5)}" fx="${Q(e.fx ?? n)}" fy="${Q(e.fy ?? i)}">${r}</radialGradient>`;
		}
		return `<linearGradient data-ts-key="gradient:${X(e.id)}" id="${X(ii(t, e.id))}" x1="${Q(e.x1 ?? 0)}" y1="${Q(e.y1 ?? 1)}" x2="${Q(e.x2 ?? 0)}" y2="${Q(e.y2 ?? 0)}">${r}</linearGradient>`;
	}).join("")}</defs>` : "";
}
function ii(e, t) {
	return e ? `${e}-${t}` : t;
}
function ai(e) {
	return e.replaceAll(/[^a-zA-Z0-9_-]/g, "");
}
function Q(e) {
	return `${Y(oi(e) * 100)}%`;
}
function oi(e) {
	return Number.isNaN(e) ? 0 : Math.max(0, Math.min(1, e));
}
//#endregion
//#region node_modules/@tanstack/charts/dist/scene-point-ownership-internal.js
function si(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = (e, t, n) => {
		let r = e.get(t);
		r ? r.push(n) : e.set(t, [n]);
	};
	for (let i of e) {
		r(n, i.markId, i);
		let e = i.key.length;
		for (; e > 0;) r(t, i.key.slice(0, e), i), e = i.key.lastIndexOf(":", e - 1);
	}
	return {
		points: e,
		keys: t,
		marks: n
	};
}
function ci(e, t, n, r = t) {
	if (e.kind === "group") {
		let n = e.focusCandidateIndex;
		if (n !== void 0 && Number.isInteger(n) && n >= 0) {
			let e = t[n];
			if (e) return [e];
		}
	}
	if (e.pointOwner) {
		let n = ui(e.pointOwner, t);
		if (n.length) return n;
	}
	if ("interaction" in e && e.interaction) {
		let n = (e.interaction.point ? [e.interaction.point] : e.interaction.points).flatMap((e) => ui(e, t));
		if (n.length) return n;
	}
	return li(e.key, t, n, r);
}
function li(e, t, n, r = t) {
	let i = (e) => e === void 0 ? [] : t === n.points ? e : e.filter((e) => t.includes(e)), a = i(n.keys.get(e)), o = a.filter((t) => t.key === e);
	if (o.length) return o;
	let s = e;
	for (; s.includes(":");) {
		let e = s.lastIndexOf(":");
		s = s.slice(0, e);
		let t = i(n.keys.get(s)).filter((e) => e.key === s);
		if (t.length) return t;
	}
	if (a.length) return a;
	let c = i(n.marks.get(e));
	return c.length ? c : r;
}
function ui(e, t) {
	let n = t.filter((t) => t === e);
	if (n.length) return n;
	let r = t.filter((t) => t.key === e.key);
	if (r.length) return r;
	let i = t.filter((t) => Object.is(t.datum, e.datum) && (di(e.datum) || t.datumIndex === e.datumIndex));
	return i.length === 1 ? i : [];
}
function di(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
//#endregion
//#region node_modules/@tanstack/charts/dist/focus-layer.js
var fi = [];
function pi(e, t, n, r) {
	let i = [], a = [];
	if (!r && !t) return {
		under: i,
		over: a
	};
	for (let o of e.focusGuides ?? []) {
		let s = t && ki(o, t) ? t : null;
		if (!r && t && !s) continue;
		let c = o.resolve({
			scene: e,
			guide: o,
			focus: s,
			pointer: n,
			cursor: r
		});
		c && (o.placement === "under" ? i : a).push(c);
	}
	return {
		under: i,
		over: a
	};
}
function mi(e, t) {
	if (!t) return {
		scene: e,
		retargeted: !1
	};
	let n = !1, r = (e) => e.map((e) => {
		if (e.kind !== "group") return e;
		if (e.focus?.retarget) {
			let r = e.focus.points.filter((n) => Ci(n, t, e.focus.match)), i = si(e.focus.points), a = bi(yi(e.focus.candidates ?? e.children, r, e.focus.points, i), r, e.focus.points, i, e.key);
			return a.length ? (n = !0, {
				...e,
				focus: {
					...e.focus,
					activePoints: r
				},
				children: a
			}) : e;
		}
		let i = r(e.children);
		return i.some((t, n) => t !== e.children[n]) ? {
			...e,
			children: i
		} : e;
	}), i = r(e.nodes);
	return n ? {
		scene: {
			...e,
			nodes: i
		},
		retargeted: n
	} : {
		scene: e,
		retargeted: n
	};
}
function hi(e, t) {
	if (!e.focus || !t) return /* @__PURE__ */ new Set();
	let n = /* @__PURE__ */ new Set();
	return Oi(gi(e, t), (e) => n.add(e.key)), n;
}
function gi(e, t) {
	let n = e.focus;
	if (n.retarget) return e.children;
	if (n.anchors) {
		let r = n.anchors.filter((e) => Ci(e, t, n.match));
		return vi(e.children, r);
	}
	let r = n.points.filter((e) => Ci(e, t, n.match));
	return _i(e.children, r, n.points);
}
function _i(e, t, n) {
	return yi(e, t, n, si(n));
}
function vi(e, t) {
	let n = [];
	for (let r of e) {
		if (r.kind !== "group") {
			t.some((e) => Ti(r.key, e.key)) && n.push(r);
			continue;
		}
		let e = vi(r.children, t);
		e.length ? n.push({
			...r,
			children: e
		}) : t.some((e) => e.key.startsWith(`${r.key}:`)) && n.push(r);
	}
	return n;
}
function yi(e, t, n, r) {
	let i = [];
	for (let a of e) {
		if (a.kind !== "group") {
			ci(a, n, r, fi).some((e) => t.includes(e)) && i.push(a);
			continue;
		}
		let e = Si(a, n);
		if (e) {
			t.includes(e) && i.push(a);
			continue;
		}
		let o = xi(a, n, r);
		if (o.length) {
			o.some((e) => t.includes(e)) && i.push(a);
			continue;
		}
		let s = ci(a, n, r, fi), c = s.length ? s : n, l = yi(a.children, t, c, r);
		l.length && i.push({
			...a,
			children: l
		});
	}
	return i;
}
function bi(e, t, n, r, i) {
	let a = new Map(t.map((e, t) => [e, t])), o = (e, t) => {
		let s = ci(e, n, r, fi).filter((e) => a.has(e)), c = s.length === 1 ? s[0] : void 0, l = e.key;
		if (c && e.key !== c.markId) {
			let n = `${i}:selection:${a.get(c) ?? 0}`;
			l = e.key === c.key ? n : e.key.startsWith(`${c.key}:`) ? `${n}${e.key.slice(c.key.length)}` : c.key.startsWith(`${e.key}:`) ? `${n}:ancestor:${t}` : `${n}:node:${t}`;
		}
		return e.kind === "group" ? {
			...e,
			key: l,
			children: e.children.map((e, n) => o(e, `${t}:${n}`))
		} : {
			...e,
			key: l
		};
	};
	return e.map((e, t) => o(e, String(t)));
}
function xi(e, t, n) {
	let r = Si(e, t);
	if (r) return [r];
	if (e.pointOwner) {
		let r = ci(e, t, n, fi);
		if (r.length) return r;
	}
	let i = n.keys.get(e.key)?.filter((t) => t.key === e.key);
	return i === void 0 ? fi : i.filter((e) => t.includes(e));
}
function Si(e, t) {
	let n = e.focusCandidateIndex;
	if (!(n === void 0 || !Number.isInteger(n) || n < 0)) return t[n];
}
function Ci(e, t, n) {
	return n === "x" ? e.xValue !== void 0 && Ei(e.xValue, t.primary.xValue) : n === "y" ? e.yValue !== void 0 && Ei(e.yValue, t.primary.yValue) : n === "series" ? Ei(e.group, t.primary.group) : n === "key" ? e.key === t.primary.key || e.datum === t.primary.datum : n === "group" ? t.group.some((t) => wi(e, t)) : wi(e, t.primary);
}
function wi(e, t) {
	return e === t || e.key === t.key ? !0 : Object.is(e.datum, t.datum) ? Di(e.datum) || e.datumIndex === t.datumIndex : !1;
}
function Ti(e, t) {
	return e === t || e.startsWith(`${t}:`) || t.startsWith(`${e}:`);
}
function Ei(e, t) {
	return j(e) === j(t);
}
function Di(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function Oi(e, t) {
	for (let n of e) t(n), n.kind === "group" && Oi(n.children, t);
}
function ki(e, t) {
	return e.scope === void 0 || t.primary.key === e.scope || t.primary.key.startsWith(`${e.scope}:`);
}
//#endregion
//#region node_modules/@tanstack/charts/dist/svg-focus-guide-serializer.js
function Ai(e, t, n, r, i, a) {
	let o = Li(e.ownerDocument, i({
		...t,
		nodes: [n]
	}, r)), s = o && zi(o, n.key);
	if (!o || !s || s.localName !== "g") throw Error(`The SVG renderer must preserve a g[data-ts-key="${n.key}"] element when serializing focus guides.`);
	return a && (s.classList.add("ts-chart__focus-guide-layer", `ts-chart__focus-guide-layer--${a}`), s.setAttribute("data-ts-focus-layer", a), s.setAttribute("data-ts-focus-guide-layer", a), s.setAttribute("aria-hidden", "true"), s.setAttribute("visibility", n.children.length ? "visible" : "hidden"), Mi(e.ownerDocument, s, n.children, a, r.idPrefix ?? "")), Ni(e, o, s, n.key), s.outerHTML;
}
function ji(e, t, n, r, i, a) {
	let o = {
		kind: "group",
		key: `focus-guide-layer:${r}`,
		className: `ts-chart__focus-guide-layer ts-chart__focus-guide-layer--${r}`,
		ariaHidden: !0,
		children: n
	};
	return Ai(e, {
		...t,
		focusGuides: void 0
	}, o, i, a, r);
}
function Mi(e, t, n, r, i) {
	let a = Ri(e, Kr(n, r, i));
	if (a) for (let e of Bi(a)) {
		let n = e.getAttribute("clip-path"), r = e.getAttribute("data-ts-key");
		if (!n || !r) continue;
		let i = zi(t, r);
		if (!i || i.hasAttribute("clip-path")) continue;
		i.setAttribute("clip-path", n);
		let o = zi(a, `${r}:clip-defs`);
		o && i.insertBefore(o.cloneNode(!0), i.firstChild);
	}
}
function Ni(e, t, n, r) {
	let i = [...Fi(n)], a = /* @__PURE__ */ new Set(), o;
	for (; i.length;) {
		let s = i.shift();
		if (!s || a.has(s) || (a.add(s), Ii(n, s) || Pi(e, s))) continue;
		let c = Ii(t, s);
		if (!c) continue;
		o || (o = e.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "defs"), o.setAttribute("data-ts-key", `${r}:renderer-defs`), n.insertBefore(o, n.firstChild));
		let l = c.cloneNode(!0);
		o.append(l), i.push(...Fi(l));
	}
}
function Pi(e, t) {
	let n = Ii(e, t);
	return n?.closest("[data-ts-focus-guide-layer]") ? void 0 : n;
}
function Fi(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of [e, ...e.querySelectorAll("*")]) for (let e of n.attributes) {
		for (let n of e.value.matchAll(/url\(#([^)]+)\)/g)) n[1] && t.add(n[1]);
		(e.localName === "href" || e.name === "xlink:href") && e.value.startsWith("#") && t.add(e.value.slice(1));
	}
	return t;
}
function Ii(e, t) {
	return [...e.getAttribute("id") === t ? [e] : [], ...e.querySelectorAll("[id]")].find((e) => e.getAttribute("id") === t);
}
function Li(e, t) {
	let n = e.createElement("template");
	n.innerHTML = t.trim();
	let r = n.content.firstElementChild;
	return r?.localName === "svg" ? r : void 0;
}
function Ri(e, t) {
	let n = e.createElement("template");
	return n.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg">${t}</svg>`, n.content.firstElementChild?.firstElementChild ?? void 0;
}
function zi(e, t) {
	return Bi(e).find((e) => e.getAttribute("data-ts-key") === t);
}
function Bi(e) {
	return [...e.hasAttribute("data-ts-key") ? [e] : [], ...e.querySelectorAll("[data-ts-key]")];
}
//#endregion
//#region node_modules/@tanstack/charts/dist/svg-focus-guide-layer.js
function Vi(e) {
	let t = {};
	if (!e) return t;
	for (let n of ["under", "over"]) {
		let r = Ki(e, n);
		r && (t[n] = r, r.remove());
	}
	return t;
}
function Hi(e, t, n = () => !0) {
	for (let r of ["under", "over"]) {
		let i = t[r];
		i && n(r) && Gi(e, i, r);
	}
}
function Ui(e, t) {
	let n = Ki(e, t);
	if (n) return n;
	let r = e.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "g");
	return r.dataset.tsKey = `focus-guide-layer:${t}`, r.dataset.tsFocusLayer = t, r.dataset.tsFocusGuideLayer = t, r.setAttribute("class", `ts-chart__focus-guide-layer ts-chart__focus-guide-layer--${t}`), r.setAttribute("aria-hidden", "true"), r.setAttribute("visibility", "hidden"), Gi(e, r, t), r;
}
function Wi(e, t) {
	Ki(e, t)?.remove();
}
function Gi(e, t, n) {
	if (n === "under") {
		let n = [...e.children].find((e) => e.getAttribute("data-ts-key") === "grid" || e.getAttribute("data-ts-key") === "marks" || e.classList.contains("ts-chart__grid") || e.classList.contains("ts-chart__marks"));
		e.insertBefore(t, n ?? null);
	} else e.append(t);
}
function Ki(e, t) {
	return [...e.children].find((e) => e.localName === "g" && e.getAttribute("data-ts-focus-guide-layer") === t);
}
//#endregion
//#region node_modules/@tanstack/charts/dist/mark-state.js
function qi(e, t, n = null) {
	if (!t || !Ji(e.nodes)) return { scene: e };
	let r, i = {}, a = (e, o, s, c, l) => e.map((e) => {
		let u = e.kind === "group" ? e.states : void 0, d = u?.points ?? o, f = u?.definitions ?? s, p = u?.data ?? c, m = u ? si(u.points) : l, h = d ? m ? ci(e, d, m) : d : ea, g = e.kind !== "group" && f && p && h.length ? Yi(e, h, p, f, t, n) : { node: e };
		if (g.transition) {
			r = ta(r, g.transition);
			for (let e of h) i[e.markId] = ta(i[e.markId], g.transition);
		}
		let _ = g.node;
		return _.kind === "group" ? {
			..._,
			children: a(_.children, h.length ? h : d, f, p, m)
		} : _;
	}), o = a(e.nodes);
	return {
		scene: {
			...e,
			nodes: o
		},
		transition: r,
		...Object.keys(i).length ? { transitions: i } : {}
	};
}
function Ji(e) {
	return e.some((e) => e.kind === "group" && (e.states !== void 0 || Ji(e.children)));
}
function Yi(e, t, n, r, i, a) {
	let o = e, s;
	for (let e of r) {
		let r = Xi(t, n, e, i, a);
		r && (o = Qi(o, e.style, r), e.transition && (s = ta(s, e.transition)));
	}
	return {
		node: o,
		transition: s
	};
}
function Xi(e, t, n, r, i) {
	if (!(typeof n.when != "function" && n.when.focus === "unmatched" && e.some((e) => Ci(e, r, "group")))) for (let a of e) {
		let e = {
			datum: a.datum,
			index: a.datumIndex,
			data: t,
			point: a,
			focus: r,
			pointer: i,
			matches: (e) => Ci(a, r, e)
		};
		if (typeof n.when == "function" ? n.when(e) : Zi(n.when, e)) return e;
	}
}
function Zi(e, t) {
	let n = e.source;
	return n !== void 0 && !(Array.isArray(n) ? n.includes(t.focus.source) : n === t.focus.source) || e.pinned !== void 0 && e.pinned !== t.focus.pinned ? !1 : e.focus === "unmatched" ? !t.matches("group") : t.matches(e.focus);
}
function Qi(e, t, n) {
	let r = { ...e.style };
	for (let e of $i) {
		let i = $(t[e], n);
		i !== void 0 && (r[e] = i);
	}
	let i = {
		...e,
		style: r
	}, a = $(t.dx, n) ?? 0, o = $(t.dy, n) ?? 0, s = $(t.r, n), c = $(t.radius, n), l = $(t.inset, n), u = $(t.fontSize, n), d = $(t.fontWeight, n), f = $(t.rotate, n);
	switch (i.kind) {
		case "dot":
			i = {
				...i,
				x: i.x + a,
				y: i.y + o,
				radius: s ?? i.radius
			};
			break;
		case "rect": {
			let e = i.inset ?? 0, t = Math.max(0, l ?? e);
			if (Number.isFinite(i.maxThickness) && (i.insetAxis === "x" || i.insetAxis === "y")) {
				let n = (i.insetAxis === "x" ? i.width : i.height) + e * 2, r = Math.max(0, n - t * 2);
				t = (n - Math.min(r, Math.max(0, i.maxThickness))) / 2;
			}
			let n = t - e, r = i.insetAxis === "y" ? 0 : n, s = i.insetAxis === "x" ? 0 : n, u = Math.max(0, i.width - r * 2), d = Math.max(0, i.height - s * 2), f = i.cornerRadii !== void 0, p = c === void 0 ? i.cornerRadii : typeof c == "number" ? f ? [
				c,
				c,
				c,
				c
			] : void 0 : c;
			i = {
				...i,
				x: i.x + r + a,
				y: i.y + s + o,
				width: u,
				height: d,
				radius: c === void 0 ? i.radius : typeof c == "number" && !f ? c : void 0,
				cornerRadii: p,
				inset: t
			};
			break;
		}
		case "label": i = {
			...i,
			x: i.x + a,
			y: i.y + o,
			fontSize: u ?? i.fontSize,
			fontWeight: d ?? i.fontWeight,
			rotate: f ?? i.rotate
		};
	}
	return i;
}
var $i = [
	"fill",
	"fillOpacity",
	"stroke",
	"strokeOpacity",
	"strokeWidth",
	"opacity",
	"strokeDasharray"
];
function $(e, t) {
	return typeof e == "function" ? e(t) : e;
}
var ea = [];
function ta(e, t) {
	return !e || e.type !== t.type ? t : e.type === "spring" && t.type === "spring" ? {
		...e,
		...t
	} : e.type !== "tween" || t.type !== "tween" ? t : {
		...e,
		...t,
		duration: Math.max(e.duration ?? 250, t.duration ?? 250)
	};
}
//#endregion
//#region node_modules/@tanstack/charts/dist/mark-state-transition.js
function na(e, t) {
	if (!e || e.type !== "tween" || (e.respectReducedMotion ?? !0) && t.ownerDocument.defaultView?.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
	let { type: n, ...r } = e;
	return r;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/svg-coordinates.js
function ra(e, t, n, r) {
	let i = e.getScreenCTM?.();
	if (!i) {
		let i = e.getBoundingClientRect();
		return !i.width || !i.height ? null : {
			x: (n - i.left) / i.width * t.width,
			y: (r - i.top) / i.height * t.height
		};
	}
	let a;
	try {
		a = i.inverse();
	} catch {
		return null;
	}
	let o = a.a * n + a.c * r + a.e, s = a.b * n + a.d * r + a.f;
	return !Number.isFinite(o) || !Number.isFinite(s) ? null : {
		x: o,
		y: s
	};
}
//#endregion
//#region node_modules/@tanstack/charts/dist/svg-surface.js
function ia(e = ni) {
	let t = {
		id: "svg",
		prerender: (t, n) => oa(t, n, null, e),
		mount(n) {
			let r = () => {}, i = () => {}, a, o, s, c = !1, l = !1, u = null, d = !1, f = () => {
				let e = n.querySelector("svg.ts-chart");
				if (!e) throw Error("The SVG renderer must produce an svg.ts-chart root element.");
				return e;
			}, p = () => {
				d || (d = !0, a && o && aa(f(), a, u, o, e, "all"));
			};
			return {
				renderer: t,
				get element() {
					return f();
				},
				render(t, m) {
					let h = !!(a && Mt(a, t));
					m.animation && p(), r(), i(), i = () => {};
					let g = !!a?.focusGuides?.length, _ = g ? Vi(f()) : {};
					r = Cr(n, d ? e(t, m) : oa(t, m, u, e), h ? void 0 : m.animation), g && Hi(f(), _, (e) => t.focusGuides?.some((t) => t.placement === e) === !0), a = t, o = m, s = void 0, c = !1, l = !1;
				},
				clientToScene(e, t, n) {
					return ra(f(), e, t, n);
				},
				paintFocus(t, m, h) {
					if (!a || !o) return;
					let g = qi(a, t, m), _ = mi(g.scene, t), v = s, y = na(g.transition ?? v, n);
					if (y && p(), _.scene !== a || c || l || v) {
						i(), i = () => {};
						let a = Vi(f());
						r(), r = Cr(n, d ? e(_.scene, o) : oa(_.scene, o, t, e), y), Hi(f(), a);
					}
					return l = _.retargeted, c = !!(t && g.scene !== a), s = t ? g.transition ?? v : void 0, u = t, aa(f(), _.scene, t, o, e, !d), i(), i = sa(f(), _.scene, t, m, h, o, e), _.scene;
				},
				destroy() {
					r(), i();
				}
			};
		}
	};
	return t;
}
function aa(e, t, n, r, i, a) {
	let o = ca(t.nodes);
	e.querySelectorAll("[data-ts-focus-layer]:not([data-ts-focus-guide-layer])").forEach((s, c) => {
		let l = o[c];
		if (l && a && Lt(l)) {
			let o = a === "all" ? l.children : n ? gi(l, n) : [], c = [...s.children].filter((e) => e.localName === "circle");
			(c.length !== o.length || c.some((e, t) => e.getAttribute("data-ts-key") !== o[t]?.key)) && wr(s, Ai(e, t, {
				...l,
				children: o
			}, r, i));
		}
		let u = l ? hi(l, n) : /* @__PURE__ */ new Set();
		s.setAttribute("visibility", n && u.size ? "visible" : "hidden"), s.querySelectorAll("[data-ts-key]").forEach((e) => {
			let t = e.dataset.tsKey;
			e.setAttribute("visibility", t && u.has(t) ? "visible" : "hidden");
		});
	});
}
function oa(e, t, n, r) {
	return Ur(t, (e) => Lt(e) ? n ? gi(e, n) : [] : void 0, () => r(e, t));
}
function sa(e, t, n, r, i, a, o) {
	let s = pi(t, n, r, i), c = [];
	for (let n of ["under", "over"]) {
		if (!t.focusGuides?.some((e) => e.placement === n)) {
			Wi(e, n);
			continue;
		}
		let r = Ui(e, n), i = s[n];
		if (!i.length) {
			r.setAttribute("visibility", "hidden");
			continue;
		}
		let l = o === ni ? Kr(i, n, a.idPrefix ?? "") : ji(e, t, i, n, a, o);
		c.push(wr(r, l));
	}
	return () => c.forEach((e) => e());
}
function ca(e) {
	let t = [];
	for (let n of e) n.kind === "group" && (n.focus ? t.push(n) : t.push(...ca(n.children)));
	return t;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/dom.js
function la(e, t, n = Nn()) {
	let r = t.renderSvg ?? ni, i = ia(r), a = (t) => {
		let n = t.renderSvg ?? ni;
		n !== r && (r = n, i = ia(r));
		let { renderSvg: a, onRender: o, ...s } = t;
		return {
			...s,
			renderer: i,
			onRender: o ? ({ container: t, scene: n, surface: r, interaction: i }) => {
				let a = r.defaultElement ?? r.element, s = e.ownerDocument.defaultView?.SVGSVGElement;
				if (!s || !(a instanceof s)) throw TypeError("Expected the SVG chart surface.");
				o({
					container: t,
					scene: n,
					surface: r,
					svg: a,
					interaction: i
				});
			} : void 0
		};
	}, o = ur(e, a(t), n);
	return {
		interaction: o.interaction,
		update(e) {
			o.update(a(e));
		},
		getScene: o.getScene,
		destroy: o.destroy
	};
}
//#endregion
//#region node_modules/@tanstack/charts/dist/rect-radius-state-internal.js
function ua(e) {
	return e?.some(({ style: e }) => {
		let t = e.radius;
		return typeof t == "function" || Array.isArray(t);
	}) ?? !1;
}
function da(e, t) {
	return e === void 0 ? t ? { cornerRadii: [
		0,
		0,
		0,
		0
	] } : {} : typeof e == "number" ? t ? { cornerRadii: [
		e,
		e,
		e,
		e
	] } : { radius: e } : { cornerRadii: e };
}
//#endregion
//#region node_modules/@tanstack/charts/dist/scene-motion-internal.js
var fa = /* @__PURE__ */ Symbol("scene-motion-node");
//#endregion
//#region node_modules/@tanstack/charts/dist/stack-ends-internal.js
function pa(e, t, n, r, i, a = {}, o = "value") {
	let s = ga(e, t, n, r, i, o), c = _a(s, a.order);
	a.reverse && c.reverse();
	let l = new Map(c.map((e, t) => [j(e), t])), u = [...s].sort((e, t) => l.get(j(e.series)) - l.get(j(t.series))), d = Array.from({ length: e.length }), f = ma(s), p = ma(u), m = a.offset === void 0 || a.offset === "diverging";
	for (let [e, t] of p) {
		let n = f.get(e);
		if (m) {
			let e = Math.min(...t.flatMap((e) => [e.start, e.end]));
			Math.max(...t.flatMap((e) => [e.start, e.end])) > 0 && ha(t, n, "max", d), e < 0 && ha(t, n, "min", d);
		} else {
			let e = t[0].start, r = t.at(-1).end, i;
			if (r < e) i = "min";
			else if (r > e) i = "max";
			else {
				let n = Math.min(...t.flatMap((e) => [e.start, e.end])), r = Math.max(...t.flatMap((e) => [e.start, e.end]));
				i = e - n > r - e ? "min" : "max";
			}
			ha(t, n, i, d);
		}
	}
	return d;
}
function ma(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		if (n.value === 0 || n.start === n.end) continue;
		let e = j(n.position), r = t.get(e);
		r ? r.push(n) : t.set(e, [n]);
	}
	return t;
}
function ha(e, t, n, r) {
	if (e.length === 0) return;
	let i = Math[n](...e.flatMap((e) => [e.start, e.end]));
	for (let e of t) {
		let t = e.start === i, n = e.end === i;
		if (!t && !n) continue;
		let a = r[e.index];
		r[e.index] = {
			start: a?.start === !0 || t,
			end: a?.end === !0 || n
		};
	}
}
function ga(e, t, n, r, i, a) {
	let o = [];
	for (let s = 0; s < e.length; s += 1) {
		let c = e[s], l = t[s], u = r[s], d = i[s];
		if (!ya(c) || !ba(l) || !ba(u) || !ba(d)) continue;
		let f = n[s];
		o.push({
			index: s,
			position: c,
			value: l,
			start: u,
			end: d,
			series: va(f) ? f : a === "index" ? s : "value"
		});
	}
	return o;
}
function _a(e, t) {
	let n = [], r = /* @__PURE__ */ new Set();
	for (let t of e) {
		let e = j(t.series);
		r.has(e) || (r.add(e), n.push(t.series));
	}
	if (Array.isArray(t)) {
		let e = [...t], r = new Set(e.map(j));
		return [...e, ...n.filter((e) => !r.has(j(e)))];
	}
	if (t === "inside-out") {
		let t = [], r = /* @__PURE__ */ new Map();
		for (let n of e) {
			let e = j(n.position);
			r.has(e) || (r.set(e, t.length), t.push(n.position));
		}
		return h(n.map((n) => {
			let i = j(n), a = t.map(() => [0, 0]);
			for (let t of e) j(t.series) === i && (a[r.get(j(t.position))][1] = t.value);
			return a;
		})).map((e) => n[e]);
	}
	if (t !== "ascending" && t !== "descending") return n;
	let i = new Map(n.map((e) => [j(e), 0]));
	for (let t of e) {
		let e = j(t.series);
		i.set(e, (i.get(e) ?? 0) + Math.abs(t.value));
	}
	return n.sort((e, n) => {
		let r = (i.get(j(e)) ?? 0) - (i.get(j(n)) ?? 0);
		return t === "ascending" ? r : -r;
	});
}
function va(e) {
	return typeof e == "string" || typeof e == "number";
}
function ya(e) {
	return typeof e == "string" || ba(e) || e instanceof Date && Number.isFinite(e.getTime());
}
function ba(e) {
	return typeof e == "number" && Number.isFinite(e);
}
//#endregion
//#region node_modules/@tanstack/charts/dist/bar.js
function xa(e, t = {}) {
	let n = Array.isArray(e) ? e : Array.from(e), r = t.xScale ?? "x", i = t.yScale ?? "y", a = typeof t.radius == "function" || ua(t.states);
	return ee(({ markIndex: e }) => {
		let o = t.id ?? `bar-y-${e}`, s = L(n, t.x, (e, { index: t }) => t), c = Aa(n, t.y ?? t.y2, (e) => typeof e == "number" ? e : void 0), l = L(n, t.z, () => null), u = t.color === void 0 ? l : L(n, t.color, () => null), d = t.z === void 0 && t.color !== void 0 ? u : l, f = t.y1 !== void 0 || t.y2 !== void 0;
		if (f && t.layout?.type === "stack") throw TypeError("A bar with explicit y1 or y2 endpoints cannot also configure a stack layout");
		let p = t.layout?.type === "group";
		Sa(t.radius, f, p, "y");
		let m = t.layout?.type === "stack" ? t.layout : void 0, h = wa(t.radius) ? t.radius : void 0, g = m?.offset === void 0 || m.offset === "diverging", _ = !f && !p ? fe(s, c, d, m, "index") : void 0, v = _ && h && (h.stack ?? "outer") === "outer" ? pa(s, c, d, _.starts, _.ends, m, "index") : void 0, y = f ? Aa(n, t.y1, () => 0) : _?.starts ?? n.map(() => 0), b = f ? Aa(n, t.y2 ?? t.y, () => void 0) : p ? c : _.ends, x = Oa(s), S = p || !f && x ? d : l, C = ie(n, t.key, {
			groups: S,
			candidates: [s],
			markId: o,
			warningIdentity: t
		});
		return {
			id: o,
			states: I(n, t.states),
			seriesFromColor: t.z === void 0 && t.color !== void 0 && (p || x),
			channels: {
				x: {
					scale: r,
					values: s.filter(N)
				},
				y: {
					scale: i,
					values: [...b.filter(P), ...y.filter(P)],
					includeZero: t.y1 === void 0
				},
				color: {
					scale: "color",
					values: u.filter(T)
				}
			},
			render: ({ scales: e, chart: l, color: d }) => {
				let f = e[r].bandwidth || ka(e[r], s, l.width, n.length), p = Da(t.layout?.type === "group" ? t.layout : void 0, S, f), m = p?.bandwidth ?? f, h = Ea(m, t.inset, t.maxThickness), x = [];
				return n.forEach((l, w) => {
					let T = s[w], E = c[w], D = y[w], O = b[w];
					if (!N(T) || !P(E) || !P(D) || !P(O)) return;
					let k = S[w] ?? null, A = p?.map(k) ?? 0, M = d(u[w]), ee = re(t.fill, l, w, n, M), F = re(t.stroke, l, w, n, "none"), te = re(t.strokeDasharray, l, w, n, "none"), ne = e[r].map(T), I = e[i].map(D), L = e[i].map(O), ie = _ && g && E < 0 ? "start" : "end", ae = ie === "start" ? I : L, oe = ie === "start" ? L : I, se = v?.[w], ce = ne - f / 2 + A + h.inset, le = Math.min(I, L), ue = h.size, de = Math.abs(I - L), R = `${o}:${j(k)}:${j(C[w])}`, fe = Ca(t.radius, l, w, n, "y", ae, oe, v !== void 0, se, I, L, a), z = {
						key: R,
						markId: o,
						group: k,
						groupLabel: k == null ? o : String(k),
						datum: l,
						datumIndex: w,
						xValue: T,
						yValue: E,
						y1Value: D,
						y2Value: O,
						yInterval: "difference",
						x: ne - f / 2 + A + m / 2,
						y: ae,
						color: ee
					}, pe = {
						kind: "rect",
						key: R,
						x: ce,
						y: le,
						width: ue,
						height: de,
						...fe,
						inset: h.inset,
						insetAxis: "x",
						...h.maximum === void 0 ? {} : { maxThickness: h.maximum },
						interaction: {
							point: z,
							affinity: "x"
						},
						style: {
							fill: ee,
							fillOpacity: t.fillOpacity,
							stroke: F,
							strokeOpacity: t.strokeOpacity,
							strokeWidth: t.strokeWidth,
							strokeDasharray: te
						},
						[fa]: { bar: { baseline: oe } }
					};
					x.push(pe);
				}), { nodes: [{
					kind: "group",
					key: o,
					className: "ts-chart__bar ts-chart__bar-y",
					ariaHidden: !0,
					children: x
				}] };
			}
		};
	}, t.motion, t.renderer);
}
function Sa(e, t, n, r) {
	if (wa(e) && e.stack === "outer") {
		if (t) throw TypeError(`Bar radius stack "outer" requires an implicit ${r} extent`);
		if (n) throw TypeError("Bar radius stack \"outer\" cannot be used with a group layout");
	}
}
function Ca(e, t, n, r, i, a, o, s, c, l, u, d) {
	if (e === void 0) return da(void 0, d);
	if (wa(e)) {
		let d = re(e.end, t, n, r, 0);
		if (a === o) return { cornerRadii: [
			0,
			0,
			0,
			0
		] };
		if (s) {
			if (!c) return { cornerRadii: [
				0,
				0,
				0,
				0
			] };
			if (c.start && c.end) return { cornerRadii: [
				d,
				d,
				d,
				d
			] };
			let e = c.start;
			return { cornerRadii: Ta(d, i, e ? l : u, e ? u : l) };
		}
		return { cornerRadii: Ta(d, i, a, o) };
	}
	return da(re(e, t, n, r, 0), d);
}
function wa(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Ta(e, t, n, r) {
	return t === "y" ? n <= r ? [
		e,
		e,
		0,
		0
	] : [
		0,
		0,
		e,
		e
	] : n <= r ? [
		e,
		0,
		0,
		e
	] : [
		0,
		e,
		e,
		0
	];
}
function Ea(e, t, n) {
	let r = Math.max(0, t ?? 0), i = Math.max(0, e), a = Math.max(0, i - r * 2), o = Number.isFinite(n), s = o ? Math.max(0, n) : a, c = Math.min(a, s);
	return {
		inset: (i - c) / 2,
		maximum: o ? s : void 0,
		size: c
	};
}
function Da(e, n, r) {
	if (!e) return;
	let i = _(e.scale ?? (() => t().padding(Number.isFinite(e.padding) ? Math.max(0, e.padding) : .1)), { values: n });
	i.range([0, r]);
	let a = i.bandwidth?.();
	if (a === void 0) throw TypeError("A grouped bar layout requires a D3 band scale");
	return {
		bandwidth: a,
		map(e) {
			if (e === null) throw TypeError("A grouped bar requires an explicit z channel or a discrete color channel");
			let t = i(e);
			if (t === void 0 || !Number.isFinite(t)) throw TypeError(`Bar group value "${String(e)}" is outside the group layout scale domain`);
			return t;
		}
	};
}
function Oa(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		if (!N(n)) continue;
		let e = j(n);
		if (t.has(e)) return !0;
		t.add(e);
	}
	return !1;
}
function ka(e, t, n, r) {
	let i = [...new Set(t.filter(N).map(e.map).filter((e) => Number.isFinite(e)))].sort((e, t) => e - t), a = Infinity;
	for (let e = 1; e < i.length; e += 1) a = Math.min(a, i[e] - i[e - 1]);
	return Number.isFinite(a) ? a * .8 : Math.min(48, n / Math.max(2, r + 1) * .8);
}
function Aa(e, t, n) {
	return typeof t == "number" ? e.map(() => t) : L(e, t, n);
}
//#endregion
//#region src/tanStackCharts.ts
function ja(n, r) {
	let i = {
		ariaLabel: "Bar chart",
		definition: zt({
			marks: [xa(Ma(n), {
				color: "seriesName",
				fill: "seriesName",
				layout: g(),
				x: "category",
				y: "value",
				z: "seriesName"
			})],
			x: { scale: () => t().padding(.2) },
			y: {
				grid: !0,
				nice: !0,
				scale: e
			}
		})
	}, a = la(r, i);
	function o() {
		let e = r.querySelector("svg");
		if (e == null) throw Error("Failed to create TanStack Charts SVG element.");
		return e;
	}
	return {
		destroy: () => {
			a.destroy();
		},
		resize: () => {
			a.update(i);
		},
		get svg() {
			return o();
		}
	};
}
function Ma(e) {
	let t = [];
	for (let n of e.series) for (let [r, i] of e.categories.entries()) t.push({
		category: i,
		seriesName: n.name,
		value: n.values[r] ?? 0
	});
	return t;
}
//#endregion
export { ja as renderTanStackCharts };
