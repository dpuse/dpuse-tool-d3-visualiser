import { t as e } from "./linear-C-jur735.js";
import { t } from "./band-BFcwtSdG.js";
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
//#region node_modules/d3-shape/src/offset/diverging.js
function u(e, t) {
	if ((c = e.length) > 0) for (var n, r = 0, i, a, o, s, c, l = e[t[0]].length; r < l; ++r) for (o = s = 0, n = 0; n < c; ++n) (a = (i = e[t[n]][r])[1] - i[0]) > 0 ? (i[0] = o, i[1] = o += a) : a < 0 ? (i[1] = s, i[0] = s += a) : (i[0] = 0, i[1] = a);
}
//#endregion
//#region node_modules/d3-shape/src/offset/silhouette.js
function d(e, t) {
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
function f(e, t) {
	if (!(!((s = e.length) > 0) || !((o = (a = e[t[0]]).length) > 0))) {
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
function p(e) {
	var t = e.map(m);
	return a(e).sort(function(e, n) {
		return t[e] - t[n];
	});
}
function m(e) {
	for (var t = -1, n = 0, r = e.length, i, a = -Infinity; ++t < r;) (i = +e[t][1]) > a && (a = i, n = t);
	return n;
}
//#endregion
//#region node_modules/d3-shape/src/order/ascending.js
function h(e) {
	for (var t = 0, n = -1, r = e.length, i; ++n < r;) (i = +e[n][1]) && (t += i);
	return t;
}
//#endregion
//#region node_modules/d3-shape/src/order/insideOut.js
function g(e) {
	var t = e.length, n, r, i = e.map(h), a = p(e), o = 0, s = 0, c = [], l = [];
	for (n = 0; n < t; ++n) r = a[n], o < s ? (o += i[r], c.push(r)) : (s += i[r], l.push(r));
	return l.reverse().concat(c);
}
//#endregion
//#region node_modules/@tanstack/charts/dist/group.js
function _(e = {}) {
	return {
		type: "group",
		...e
	};
}
//#endregion
//#region node_modules/@tanstack/charts/dist/scale-input.js
function v(e, t) {
	let n = y(e), r = n ? e() : e;
	if (typeof r != "function" || typeof r.copy != "function" || typeof r.domain != "function" || typeof r.range != "function") throw TypeError("A scale factory must return a copyable scale with domain and range methods");
	let i = r.copy();
	if (n) {
		let e = b(i, t.values, t.includeZero);
		e && i.domain(e);
	}
	return C(i, t.nice, t.niceCount), i;
}
function y(e) {
	return typeof e == "function" && !("copy" in e);
}
function b(e, t, n = !1) {
	let r = t.filter(te);
	if (!r.length) return;
	if (typeof e.bandwidth == "function" || typeof e.ticks != "function") {
		let e = [], t = /* @__PURE__ */ new Set();
		for (let n of r) {
			let r = n instanceof Date ? `date:${n.getTime()}` : `${typeof n}:${String(n)}`;
			t.has(r) || (t.add(r), e.push(n));
		}
		return e;
	}
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
		if (!N(e)) throw TypeError("A quantitative scale factory requires numeric values");
		i = Math.min(i, e), a = Math.max(a, e);
	}
	if (!Number.isFinite(i) || !Number.isFinite(a)) throw TypeError("A quantitative scale factory requires numeric values");
	let o = x(e);
	if (n) {
		if (o) throw TypeError("An inferred log scale cannot include an implicit zero baseline");
		i = Math.min(0, i), a = Math.max(0, a);
	}
	if (S(e, i, a), i === a) {
		if (i === 0) return [0, 1];
		let e = Math.abs(i) * .05 || 1;
		i -= e, a += e;
	}
	return [i, a];
}
function x(e) {
	return "base" in e && typeof e.base == "function";
}
function S(e, t, n) {
	if (x(e) && (t === 0 || n === 0 || t < 0 && n > 0)) throw TypeError("An inferred log domain cannot include or cross zero");
}
function C(e, t, n = 5) {
	if (!t) return;
	let r = e;
	if (typeof r.nice != "function") throw TypeError("This scale does not support nicening");
	r.nice(typeof t == "number" ? t : n);
}
//#endregion
//#region node_modules/@tanstack/charts/dist/scales.js
function w(e, t, n) {
	if (t?.scale) {
		let r = D(t.scale), i = r ? t.scale() : t.scale;
		if (typeof i != "function" || typeof i.copy != "function") throw TypeError("A color scale must be callable and copyable");
		if (r && (typeof i.domain != "function" || typeof i.range != "function")) throw TypeError("A color scale factory must return a scale with domain and range methods");
		let a = i.copy(), o = j(a);
		if (r) {
			let n = a;
			t.range?.length && n.range(t.range);
			let r = t.domain ?? O(n, e);
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
	let r = t?.range?.length ? t.range : n.palette, i = T(t?.domain ?? e), a = i.map(M);
	return {
		type: "ordinal",
		kind: "categorical",
		domain: i,
		range: r,
		map: (e) => {
			if (e == null) return r[0] ?? "currentColor";
			let t = a.indexOf(M(e));
			return t < 0 && (t = a.push(M(e)) - 1), r[t % r.length] ?? "currentColor";
		}
	};
}
function T(e) {
	return [...new Set(e.filter(E))];
}
function E(e) {
	return typeof e == "string" || typeof e == "number";
}
function D(e) {
	return typeof e == "function" && !("copy" in e);
}
function O(e, t) {
	let n = t.filter(E), r = e.quantiles, i = e.thresholds;
	if (r) return k(n);
	if (e.invertExtent && !i) throw TypeError("Threshold color-scale factory requires an explicit domain");
	if (e.ticks || i) {
		let t = k(n), r = Infinity, a = -Infinity;
		for (let e of t) r = Math.min(r, e), a = Math.max(a, e);
		if (!Number.isFinite(r) || !Number.isFinite(a)) return [];
		if (S(e, r, a), r === a) {
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
	return T(n);
}
function k(e) {
	let t = e.filter((e) => typeof e == "number" && Number.isFinite(e));
	return t.length !== e.length && A(), t;
}
function A() {
	throw TypeError("A quantitative color-scale factory requires numeric values");
}
function j(e) {
	return e.quantiles ? e.invertExtent ? "quantile" : "continuous" : e.thresholds ? "quantize" : e.invertExtent ? "threshold" : e.ticks ? "continuous" : "categorical";
}
function M(e) {
	return e instanceof Date ? `date:${e.getTime()}` : typeof e == "string" ? `string:${e.length}:${e}` : `${typeof e}:${String(e)}`;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/mark.js
var ee = /* @__PURE__ */ new WeakSet();
function te(e) {
	return typeof e == "string" || e instanceof Date && Number.isFinite(e.getTime()) || N(e);
}
function N(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function ne(e, t) {
	let n = (n) => {
		let r = re(e(n));
		return t === void 0 || r.motion !== void 0 ? r : {
			...r,
			motion: t
		};
	};
	return t === void 0 ? { initialize: n } : {
		initialize: n,
		motion: t
	};
}
function re(e) {
	return typeof e.render == "function" ? e : {
		...e,
		render: () => {
			throw TypeError(`Mark "${e.id}" must resolve its layout before rendering`);
		}
	};
}
function P(e, t) {
	return t?.length ? {
		data: e,
		definitions: t
	} : void 0;
}
function ie(e, t, n, r, i) {
	return typeof e == "function" ? e(t, {
		index: n,
		data: r
	}) : e ?? i;
}
function F(e, t, n) {
	return typeof t == "function" ? e.map((n, r) => t(n, {
		index: r,
		data: e
	})) : t === void 0 ? e.map((t, r) => n(t, {
		index: r,
		data: e
	})) : e.map((e) => typeof e == "object" && e ? e[t] : void 0);
}
function I(e, t, n = {}) {
	if (t !== void 0) return F(e, t, (e, { index: t }) => t);
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
	if (E(e)) return e;
	if (e instanceof Date && Number.isFinite(e.getTime())) return `date:${e.getTime()}`;
}
function oe(e, t) {
	let n = /* @__PURE__ */ new Set();
	for (let r = 0; r < e.length; r += 1) {
		let i = JSON.stringify([M(t?.[r] ?? null), M(e[r])]);
		if (n.has(i)) return !1;
		n.add(i);
	}
	return !0;
}
function se(e, t, n) {
	!e || !t?.length || !n || ee.has(n) || typeof process > "u" || process.env.NODE_ENV === "production" || (ee.add(n), console.warn(`TanStack Charts could not infer a unique key for mark "${e}". Using row position; supply key for stable identity across updates.`));
}
//#endregion
//#region node_modules/@tanstack/charts/dist/stack-internal.js
function L(e, t = {}) {
	let n = ce(t);
	if (e.length === 0) return /* @__PURE__ */ new Map();
	let r = [], a = /* @__PURE__ */ new Map(), o = [], s = /* @__PURE__ */ new Set();
	for (let t of e) {
		let e = M(t.position);
		a.has(e) || (a.set(e, r.length), r.push(t.position));
		let n = M(t.series);
		s.has(n) || (s.add(n), o.push(t.series));
	}
	let p = r.map(() => /* @__PURE__ */ Object.create(null)), m = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = a.get(M(t.position)), n = M(t.series), r = `${e}:${n}`;
		if (m.has(r)) throw TypeError(`A stack requires at most one value for each position and series; duplicate ${String(t.position)} / ${String(t.series)}`);
		m.set(r, t.index), p[e][n] = t.value;
	}
	let h = t.order === "inside-out";
	if (n !== void 0 && e.some(({ value: e }) => e < 0)) throw TypeError("A stack anchor requires nonnegative values");
	let _ = B(e, o, t.order);
	t.reverse && !h && _.reverse();
	let v = _.map(M), y = t.anchor ? i : t.offset === "normalize" ? l : t.offset === "center" ? d : t.offset === "wiggle" ? f : u, b = c().keys(v).value((e, t) => e[t] ?? 0).offset(y);
	h && b.order(t.reverse ? (e) => g(e).reverse() : g);
	let x = b(p);
	t.anchor && n !== void 0 && R(x, t.anchor.series, n), t.offset === "wiggle" && le(x);
	let S = /* @__PURE__ */ new Map();
	return x.forEach((e) => {
		let t = e.key;
		e.forEach((e, n) => {
			let r = m.get(`${n}:${t}`);
			r !== void 0 && S.set(r, {
				start: e[0],
				end: e[1]
			});
		});
	}), S;
}
function ce(e) {
	let t = e.anchor;
	if (!t) return;
	if (e.offset !== void 0 && e.offset !== "diverging") throw TypeError("A stack anchor can only be used with the diverging offset");
	let n = t.fraction ?? .5;
	if (!Number.isFinite(n) || n < 0 || n > 1) throw TypeError("A stack anchor fraction must be between zero and one");
	return n;
}
function R(e, t, n) {
	let r = M(t), i = e.find((e) => e.key === r);
	if (!i) throw TypeError(`Stack anchor series "${String(t)}" is not in the resolved series order`);
	i.forEach((t, r) => {
		let i = t[0] + (t[1] - t[0]) * n;
		for (let t of e) {
			let e = t[r];
			e && (e[0] -= i, e[1] -= i);
		}
	});
}
function le(e) {
	let t = Infinity;
	for (let n of e) for (let e of n) t = Math.min(t, e[0]);
	if (!(!Number.isFinite(t) || t === 0)) for (let n of e) for (let e of n) e[0] -= t, e[1] -= t;
}
function ue(e, t, n, r = {}, i = "value") {
	let a = [];
	for (let r = 0; r < e.length; r += 1) {
		let o = e[r], s = t[r];
		if (!z(o) || !fe(s)) continue;
		let c = n[r];
		a.push({
			index: r,
			position: o,
			value: s,
			series: de(c) ? c : i === "index" ? r : "value"
		});
	}
	let o = L(a, r), s = Array.from({ length: e.length }, () => void 0), c = Array.from({ length: e.length }, () => void 0);
	for (let [e, t] of o) s[e] = t.start, c[e] = t.end;
	return {
		starts: s,
		ends: c
	};
}
function de(e) {
	return typeof e == "string" || typeof e == "number";
}
function z(e) {
	return typeof e == "string" || fe(e) || e instanceof Date && Number.isFinite(e.getTime());
}
function fe(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function B(e, t, n) {
	if (Array.isArray(n)) {
		let e = [...n], r = new Set(e.map(M));
		return [...e, ...t.filter((e) => !r.has(M(e)))];
	}
	if (n !== "ascending" && n !== "descending") return [...t];
	let r = new Map(t.map((e) => [M(e), 0]));
	for (let t of e) {
		let e = M(t.series);
		r.set(e, (r.get(e) ?? 0) + Math.abs(t.value));
	}
	return [...t].sort((e, t) => {
		let i = (r.get(M(e)) ?? 0) - (r.get(M(t)) ?? 0);
		return n === "ascending" ? i : -i;
	});
}
//#endregion
//#region node_modules/@tanstack/charts/dist/configured-scale.js
function pe(e, t) {
	let n = v(e, {
		values: t.values,
		includeZero: t.includeZero,
		nice: t.options?.nice,
		niceCount: t.tickCount
	}), r = ve(n.domain()), i = me(n, t, r), a = n.bandwidth !== void 0, o = a && t.id === "y" ? [Math.min(...t.range), Math.max(...t.range)] : t.range, s = t.options?.reverse ? [o[1], o[0]] : o;
	n.range(s);
	let c = ve(n.domain());
	if (i && (!ge(c, i.domain) || !_e(n, i.domain, s))) throw TypeError(`Chart viewport "${t.id}" requires independent configurable domain and range capabilities`);
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
			label: u?.format?.(e) ?? f?.(e) ?? Ee(e)
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
function me(e, t, n) {
	let r = t.options?.viewport;
	if (!r) return;
	let i = e;
	if (e.bandwidth !== void 0 || typeof e.ticks != "function" || typeof i.invert != "function") throw TypeError(`Chart viewport "${t.id}" requires a continuous numeric or temporal scale`);
	if (typeof i.clamp == "function" && i.clamp() === !0) throw TypeError(`Chart viewport "${t.id}" does not support a clamped scale`);
	let a = r.domain;
	(a.length !== 2 || !Se(a[0], a[1])) && Te(t.id);
	let o = Ce(a[0]), s = Ce(a[1]);
	(!Number.isFinite(o) || !Number.isFinite(s) || o === s) && Te(t.id), be(e, t.id, n, a);
	let c = r.translate ?? 0;
	if (!Number.isFinite(c)) throw TypeError(`Chart viewport "${t.id}" translate must be a finite number`);
	ge(e.domain(), a) && he(e, [a[1], a[0]], t.id), he(e, a, t.id);
	let l = ve(e.domain());
	return (l.length !== 2 || !Se(l[0], l[1])) && ye(t.id), {
		domain: l,
		translate: c
	};
}
function he(e, t, n) {
	let r = e.domain;
	try {
		r.call(e, [...t]);
	} catch {
		ye(n);
	}
	ge(e.domain(), t) || ye(n);
}
function ge(e, t) {
	return e.length === t.length && e.every((e, n) => we(e, t[n]));
}
function _e(e, t, n) {
	let r = e(t[0]), i = e(t[1]);
	return r !== void 0 && i !== void 0 && Number.isFinite(r) && Number.isFinite(i) && Math.abs(r - n[0]) <= 1e-6 && Math.abs(i - n[1]) <= 1e-6;
}
function ve(e) {
	return e.map((e) => e instanceof Date ? new Date(e.getTime()) : e);
}
function ye(e) {
	throw TypeError(`Chart viewport "${e}" requires a scale with a configurable domain`);
}
function be(e, t, n, r) {
	if (!x(e)) return;
	let i = xe(n), a = xe(r);
	if (i === void 0 || a === void 0 || i !== a) throw TypeError(`Chart viewport "${t}" logarithmic content and viewport domains must be finite, nonzero, and stay on the same side of zero`);
}
function xe(e) {
	let t;
	for (let n of e) {
		if (typeof n != "number" || !Number.isFinite(n) || n === 0) return;
		let e = Math.sign(n);
		if (t !== void 0 && e !== t) return;
		t = e;
	}
	return t;
}
function Se(e, t) {
	return typeof e == "number" && typeof t == "number" || e instanceof Date && t instanceof Date;
}
function Ce(e) {
	return e instanceof Date ? e.getTime() : e;
}
function we(e, t) {
	return e instanceof Date && t instanceof Date ? e.getTime() === t.getTime() : Object.is(e, t);
}
function Te(e) {
	throw TypeError(`Chart viewport "${e}" domain must contain two distinct finite numbers or Dates`);
}
function Ee(e) {
	return e instanceof Date ? e.toLocaleDateString() : String(e);
}
//#endregion
//#region node_modules/@tanstack/charts/dist/guide-layout.js
var De = 16, Oe = 400, V = {
	fontFamily: "sans-serif",
	fontStyle: "normal",
	fontStretch: "normal",
	letterSpacing: 0,
	direction: "inherit",
	fontScale: 1
};
function H(e, t) {
	let n = Ne(t.fontScale, 1), r = W(t.fontSize, De) * n, i = W(t.fontWeight, Oe), a = Me(t.letterSpacing, 0) * n;
	if (!e || r === 0) return {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	let o = 0;
	for (let t of e) o += je(t);
	let s = 1 + (Math.min(900, Math.max(100, i)) - 400) / 12500, c = Math.max(0, o * r * s + Math.max(0, Array.from(e).length - 1) * a), l = r;
	return {
		x: t.anchor === "middle" ? -c / 2 : t.anchor === "end" ? -c : 0,
		y: t.baseline === "middle" ? -l / 2 : t.baseline === "hanging" ? 0 : -r * .8,
		width: c,
		height: l
	};
}
function U(e, t = H) {
	let n = W(e.fontSize, De), r = e.anchor ?? "start", i = e.baseline ?? "auto", a = e.text.length === 0 ? {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	} : t(e.text, {
		fontSize: n,
		fontWeight: e.fontWeight,
		...V,
		anchor: r,
		baseline: i
	}), o = Me(a.x, 0), s = Me(a.y, 0), c = W(a.width, 0), l = W(a.height, 0), u = {
		x: e.x + o,
		y: e.y + s,
		width: c,
		height: l
	};
	return e.rotate ? Ae(u, e.x, e.y, e.rotate) : u;
}
function ke(e = H, t = {}) {
	let n = {
		...V,
		...t,
		fontFamily: t.fontFamily || V.fontFamily,
		fontStyle: t.fontStyle || V.fontStyle,
		fontStretch: t.fontStretch || V.fontStretch,
		letterSpacing: Me(t.letterSpacing, 0),
		fontScale: Ne(t.fontScale, 1)
	};
	return (t, r) => e(t, {
		...r,
		...n
	});
}
function Ae(e, t, n, r) {
	let i = r * Math.PI / 180, a = Math.cos(i), o = Math.sin(i), s = e.x + e.width / 2 - t, c = e.y + e.height / 2 - n, l = Math.abs(e.width * a) + Math.abs(e.height * o), u = Math.abs(e.width * o) + Math.abs(e.height * a), d = s * a - c * o + t, f = s * o + c * a + n;
	return {
		x: d - l / 2,
		y: f - u / 2,
		width: l,
		height: u
	};
}
function je(e) {
	return /\s/u.test(e) ? .33 : /[\u0300-\u036f]/u.test(e) ? 0 : /[ilI1|!.,:;'`]/u.test(e) ? .28 : /[mwMW@#%&]/u.test(e) ? .9 : /[A-Z]/u.test(e) ? .64 : /[0-9]/u.test(e) ? .56 : e.codePointAt(0) > 127 ? 1 : .54;
}
function W(e, t) {
	return e !== void 0 && Number.isFinite(e) && e >= 0 ? e : t;
}
function Me(e, t) {
	return e !== void 0 && Number.isFinite(e) ? e : t;
}
function Ne(e, t) {
	return e !== void 0 && Number.isFinite(e) && e > 0 ? e : t;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/nearest.js
var G = /* @__PURE__ */ new WeakMap();
function Pe(e, t, n, r) {
	let i, a = Infinity;
	for (let r = e.length; r--;) {
		let o = e[r], s = o.x - t, c = o.y - n, l = s * s + c * c;
		l <= a && (i = o, a = l);
	}
	return i && a <= Math.max(0, r) ** 2 ? i : null;
}
function K(e, t, n, r, i = e.points) {
	let a = Ie(e), o = i === e.points ? void 0 : new Set(i);
	if (!a.targets.length && !a.attachedPoints.size) return Pe(i, t, n, r);
	let s = Fe(e, t, n, i);
	if (s) return s.point;
	let c, l, u = Infinity, d = Infinity;
	for (let e of a.targets) {
		let r = e.node.interaction;
		if (!ze(r, o)) continue;
		let i = r.affinity ?? "xy";
		if (i === "geometry") continue;
		let a = i === "x" ? "x" : i === "y" ? "y" : void 0, s = a ? rt(e.bounds, a === "x" ? t : n, a) : Ve(e, t, n);
		if (s > u) continue;
		let f = a ? Ve(e, t, n) : s;
		(s < u || s === u && f < d) && (l = r, c = void 0, u = s, d = f);
	}
	if (u !== 0) for (let e of i) {
		if (a.attachedPoints.has(e)) continue;
		let r = e.x - t, i = e.y - n, o = r * r + i * i;
		o < u && (c = e, l = void 0, u = o, d = o);
	}
	return u > Math.max(0, r) ** 2 ? null : c ?? (l ? Re(l, t, n, o) : void 0) ?? null;
}
function Fe(e, t, n, r = e.points) {
	let i = Ie(e), a = r === e.points ? void 0 : new Set(r);
	for (let e = i.targets.length; e--;) {
		let r = i.targets[e];
		if (nt(r.bounds, t, n) && Be(r, t, n)) {
			let e = r.node.interaction, i = Re(e, t, n, a), o = e.point ? !0 : e.points.length > 0;
			if (i || !a || !o) return { point: i };
		}
	}
	return null;
}
function Ie(e) {
	let t = G.get(e);
	if (t) return t;
	let n = [], r = /* @__PURE__ */ new Set();
	Le(e.nodes, 0, 0, void 0, n, r);
	let i = {
		targets: n,
		attachedPoints: r
	};
	return G.set(e, i), i;
}
function Le(e, t, n, r, i, a) {
	for (let o of e) {
		if (o.kind === "group") {
			if (o.focus) continue;
			let e = t + (o.translateX ?? 0), s = n + (o.translateY ?? 0), c = o.clip ? $e(o.clip, e, s) : void 0, l = r === null ? null : tt(r, c);
			Le(o.children, e, s, l, i, a);
			continue;
		}
		if (o.kind === "label" || !o.interaction) continue;
		if (o.interaction.point) a.add(o.interaction.point);
		else for (let e of o.interaction.points) a.add(e);
		if (r === null) continue;
		let e = He(o);
		if (!e) continue;
		let s = $e(e, t, n), c = r ? tt(s, r) : s;
		c != null && i.push({
			node: o,
			offsetX: t,
			offsetY: n,
			bounds: c,
			clip: r
		});
	}
}
function Re(e, t, n, r) {
	if (e.point) return !r || r.has(e.point) ? e.point : null;
	let i = e.affinity ?? "xy", a, o = Infinity, s = Infinity;
	for (let c of e.points) {
		if (r && !r.has(c)) continue;
		let e = c.x - t, l = c.y - n, u = e * e + l * l, d = i === "x" ? e * e : i === "y" ? l * l : u;
		(d < o || d === o && u < s) && (a = c, o = d, s = u);
	}
	return a ?? null;
}
function ze(e, t) {
	return t ? e.point ? t.has(e.point) : e.points.some((e) => t.has(e)) : !0;
}
function Be(e, t, n) {
	let r = t - e.offsetX, i = n - e.offsetY, { node: a } = e;
	switch (a.kind) {
		case "rect": return Ue(a, r, i);
		case "dot": {
			let e = r - a.x, t = i - a.y, n = Math.max(0, a.radius);
			return e * e + t * t <= n * n;
		}
		case "area": return a.polygons === void 0 ? Ge(a.points, r, i) : Ke(a.polygons, r, i);
		case "polyline": return Je(a.points, r, i, !1) <= q(a) ** 2;
		case "rule": return Ye(a.x1, a.y1, a.x2, a.y2, r, i) <= q(a) ** 2;
	}
}
function Ve(e, t, n) {
	let r = t - e.offsetX, i = n - e.offsetY, { node: a } = e, o;
	switch (a.kind) {
		case "rect":
			o = a.radius ? We(a, r, i) : it(a, r, i);
			break;
		case "dot": {
			let e = r - a.x, t = i - a.y, n = Math.max(0, Math.sqrt(e * e + t * t) - Math.max(0, a.radius));
			o = n * n;
			break;
		}
		case "area":
			o = a.polygons === void 0 ? Je(a.points, r, i, !0) : qe(a.polygons, r, i);
			break;
		case "polyline": {
			let e = Je(a.points, r, i, !1), t = Math.max(0, Math.sqrt(e) - q(a));
			o = t * t;
			break;
		}
		case "rule": {
			let e = Ye(a.x1, a.y1, a.x2, a.y2, r, i), t = Math.max(0, Math.sqrt(e) - q(a));
			o = t * t;
			break;
		}
	}
	return e.clip ? Math.max(o, it(e.clip, t, n)) : o;
}
function He(e) {
	switch (e.kind) {
		case "rect": return Qe(e);
		case "dot": {
			let t = Math.max(0, e.radius);
			return {
				x: e.x - t,
				y: e.y - t,
				width: t * 2,
				height: t * 2
			};
		}
		case "area": return e.polygons === void 0 ? Xe(e.points) : Ze(e.polygons);
		case "polyline": {
			let t = Xe(e.points);
			return t ? et(t, q(e)) : null;
		}
		case "rule": return et({
			x: Math.min(e.x1, e.x2),
			y: Math.min(e.y1, e.y2),
			width: Math.abs(e.x2 - e.x1),
			height: Math.abs(e.y2 - e.y1)
		}, q(e));
	}
}
function Ue(e, t, n) {
	let r = Qe(e);
	if (!nt(r, t, n)) return !1;
	let i = Math.max(0, Math.min(e.radius ?? 0, r.width / 2, r.height / 2));
	if (i === 0 || t >= r.x + i && t <= r.x + r.width - i || n >= r.y + i && n <= r.y + r.height - i) return !0;
	let a = t < r.x + i ? r.x + i : r.x + r.width - i, o = n < r.y + i ? r.y + i : r.y + r.height - i, s = t - a, c = n - o;
	return s * s + c * c <= i * i;
}
function We(e, t, n) {
	let r = Qe(e), i = r.width / 2, a = r.height / 2, o = Math.max(0, Math.min(e.radius ?? 0, i, a)), s = Math.abs(t - (r.x + i)) - (i - o), c = Math.abs(n - (r.y + a)) - (a - o), l = Math.sqrt(Math.max(0, s) ** 2 + Math.max(0, c) ** 2) - o;
	return Math.max(0, l) ** 2;
}
function Ge(e, t, n) {
	let r = !1;
	for (let i = 0, a = e.length - 1; i < e.length; a = i++) {
		let o = e[i], s = e[a];
		o[1] > n != s[1] > n && t < (s[0] - o[0]) * (n - o[1]) / (s[1] - o[1]) + o[0] && (r = !r);
	}
	return r;
}
function Ke(e, t, n) {
	return e.some(([e, ...r]) => !e || !Ge(e, t, n) ? !1 : !r.some((e) => Ge(e, t, n)));
}
function qe(e, t, n) {
	let r = Infinity;
	for (let i of e) for (let e of i) r = Math.min(r, Je(e, t, n, !0));
	return r;
}
function Je(e, t, n, r) {
	if (!e.length) return Infinity;
	if (e.length === 1) {
		let r = e[0];
		return (r[0] - t) ** 2 + (r[1] - n) ** 2;
	}
	let i = Infinity, a = r ? e.length : Math.max(0, e.length - 1);
	for (let r = 0; r < a; r += 1) {
		let a = e[r], o = e[(r + 1) % e.length];
		i = Math.min(i, Ye(a[0], a[1], o[0], o[1], t, n));
	}
	return i;
}
function Ye(e, t, n, r, i, a) {
	let o = n - e, s = r - t, c = o * o + s * s, l = c ? Math.max(0, Math.min(1, ((i - e) * o + (a - t) * s) / c)) : 0, u = i - (e + l * o), d = a - (t + l * s);
	return u * u + d * d;
}
function Xe(e) {
	let t = Infinity, n = Infinity, r = -Infinity, i = -Infinity;
	for (let a of e) !Number.isFinite(a[0]) || !Number.isFinite(a[1]) || (t = Math.min(t, a[0]), n = Math.min(n, a[1]), r = Math.max(r, a[0]), i = Math.max(i, a[1]));
	return Number.isFinite(t) ? {
		x: t,
		y: n,
		width: r - t,
		height: i - n
	} : null;
}
function Ze(e) {
	return Xe(e.flatMap((e) => e.flat()));
}
function Qe(e) {
	return {
		x: Math.min(e.x, e.x + e.width),
		y: Math.min(e.y, e.y + e.height),
		width: Math.abs(e.width),
		height: Math.abs(e.height)
	};
}
function $e(e, t, n) {
	let r = Qe(e);
	return {
		...r,
		x: r.x + t,
		y: r.y + n
	};
}
function et(e, t) {
	return {
		x: e.x - t,
		y: e.y - t,
		width: e.width + t * 2,
		height: e.height + t * 2
	};
}
function tt(e, t) {
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
function nt(e, t, n) {
	return t >= e.x && t <= e.x + e.width && n >= e.y && n <= e.y + e.height;
}
function rt(e, t, n) {
	let r = n === "x" ? e.x : e.y, i = n === "x" ? e.width : e.height, a = t < r ? r - t : t > r + i ? t - r - i : 0;
	return a * a;
}
function it(e, t, n) {
	let r = Qe(e), i = t < r.x ? r.x - t : t > r.x + r.width ? t - r.x - r.width : 0, a = n < r.y ? r.y - n : n > r.y + r.height ? n - r.y - r.height : 0;
	return i * i + a * a;
}
function q(e) {
	return Math.max(0, e.style?.strokeWidth ?? 1) / 2;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/scene-point-map.js
function at(e, t) {
	return ["x", "y"].some((n) => (e.scales[n]?.viewport?.translate ?? 0) !== (t.scales[n]?.viewport?.translate ?? 0));
}
function ot(e, t) {
	return e.map((e) => e.kind === "group" ? {
		...e,
		children: ot(e.children, t),
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
var st = /* @__PURE__ */ Symbol("chart-scene-source"), ct = {
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
function lt(e, t) {
	return t ? typeof e == "function" ? {
		chart: e,
		...t
	} : {
		...e,
		...t
	} : typeof e == "function" ? { chart: e } : e;
}
function ut(e, t, n = {}) {
	return ft(e, t, (e) => {
		if (!e.options?.scale) throw TypeError(`Chart scale "${e.id}" requires a configured scale`);
		return dt(e.options.scale, e);
	}, n);
}
function dt(e, t) {
	if (typeof e == "function") return pe(e, t);
	if (t.options?.viewport) throw TypeError(`Chart viewport "${t.id}" requires a configured or inferable continuous scale`);
	return e.resolve(t);
}
function ft(e, t, n, r) {
	let i = Gt(t.width), a = Gt(t.height), o = {
		...r,
		measureText: ke(r.measureText, r.typography)
	}, s = {
		...ct,
		...o.defaultTheme,
		palette: o.defaultTheme?.palette ?? ct.palette
	}, c = {
		...s,
		...e.theme,
		palette: e.theme?.palette ?? s.palette
	}, l = e.marks.map((e, t) => e.initialize({ markIndex: t })), u = vt(l, "x"), d = vt(l, "y"), f = e.guides === !1 ? 0 : (e.x != null && e.x.axis !== !1) | (e.y != null && e.y.axis !== !1) << 1, { margin: p, chart: m, scales: h, axes: g, marks: _, colors: v, legend: y, legendBounds: b } = xt(e, l, i, a, c, u, d, f, n, o), x = [], S = [], C = [], w = h.x.viewport?.translate ?? 0, T = h.y.viewport?.translate ?? 0, E = [], D = _.findIndex((e) => !e.focus && !e.focusGuideOnly);
	_.forEach((e, t) => {
		let n = !!(h.x.viewport && J(e, "x")), r = !!(h.y.viewport && J(e, "y")), s = /* @__PURE__ */ new Map(), l = (e) => {
			let t = s.get(e);
			if (t) return t;
			let i = n || r ? {
				...e,
				x: e.x + (n ? w : 0),
				y: e.y + (r ? T : 0)
			} : e;
			return s.set(e, i), i;
		}, u = e.render({
			markIndex: t,
			surface: {
				x: 0,
				y: 0,
				width: i,
				height: a
			},
			chart: m,
			scales: h,
			theme: c,
			color: v.map,
			colors: v,
			layout: o
		});
		y?.filterMark && (u = y.filterMark(u, { seriesFromColor: e.seriesFromColor })), e.postDomain && (u = e.postDomain(u));
		let d = _t(u.nodes, u.points), f = n || r ? ot(u.nodes, l) : u.nodes, p = d.map(l), g = [], _ = D < 0 || t < D ? "under" : "over";
		for (let e of u.focusGuides ?? []) E.push({
			...e,
			placement: e.placement ?? _
		});
		if (e.focus) {
			let t = e.focus.retarget === !0;
			g.push({
				kind: "group",
				key: `focus:${e.id}`,
				className: "ts-chart__focus-layer",
				ariaHidden: !0,
				focus: {
					match: e.focus.match ?? "primary",
					anchors: u.focusAnchors ?? d,
					points: p,
					placement: _,
					...t ? {
						retarget: !0,
						candidates: f
					} : {}
				},
				children: t ? [] : f
			});
		} else {
			let t = p;
			if (e.states) g.push({
				kind: "group",
				key: `states:${e.id}`,
				children: f,
				states: {
					data: e.states.data,
					definitions: e.states.definitions,
					points: t
				}
			});
			else for (let e of f) g.push(e);
			for (let e of t) C.push(e);
			t.length && S.push({
				markId: e.id,
				points: t,
				clipped: n || r
			});
		}
		x.push({
			key: e.id,
			nodes: g,
			viewportX: n,
			viewportY: r
		});
	});
	let O = pt(x, w, T, m), k = [{
		kind: "group",
		key: "marks",
		className: "ts-chart__marks",
		clip: e.clip ? m : void 0,
		children: O
	}];
	e.guides !== !1 && (e.x?.grid || e.y?.grid) && k.unshift(At(m, h, e, c)), f && k.push(g);
	let A = [], j = /* @__PURE__ */ new Set();
	for (let t of e.controls ?? []) {
		if (!t.id.trim()) throw TypeError("Chart control ids must be nonempty");
		if (j.has(t.id)) throw TypeError(`Duplicate chart control id "${t.id}"`);
		j.add(t.id);
		let e = t.resolve({
			chart: m,
			scales: h,
			colors: v,
			theme: c,
			width: i,
			height: a
		});
		e.nodes && k.push(...e.nodes), e.controls && A.push(...e.controls);
	}
	if (y && b) {
		let e = {
			colors: v,
			chart: m,
			bounds: b,
			theme: c,
			width: i,
			height: a
		};
		k.push(y.render(e)), y.control && A.push(y.control(e));
	}
	let M = /* @__PURE__ */ new Set();
	for (let e of A) {
		let t = `${e.extension.id}:${e.key}`;
		if (M.has(t)) throw TypeError(`Duplicate chart host control "${t}"`);
		M.add(t);
	}
	if (e.focus !== !1 && e.focusRing !== !1 && C.length) for (let e of S) k.push({
		kind: "group",
		key: `default-focus:${e.markId}`,
		className: "ts-chart__focus-layer ts-chart__focus-layer--default",
		ariaHidden: !0,
		clip: e.clipped ? m : void 0,
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
			radius: 5,
			style: {
				fill: "var(--ts-chart-focus-fill, Canvas)",
				stroke: e.color,
				strokeWidth: 2.5
			}
		}))
	});
	return {
		width: i,
		height: a,
		margin: p,
		chart: m,
		nodes: k,
		points: C,
		scales: h,
		colors: v,
		gradients: e.gradients ?? [],
		theme: c,
		...A.length ? { controls: A } : {},
		...E.length ? { focusGuides: E } : {},
		[st]: [e, l]
	};
}
function J(e, t) {
	let n = e.viewport?.[t];
	return n ? n === "content" : Object.values(e.channels).some((e) => e.scale === t);
}
function pt(e, t, n, r) {
	return e.flatMap((e) => !e.viewportX && !e.viewportY ? [...e.nodes] : [{
		kind: "group",
		key: `viewport-clip:${e.key}`,
		className: "ts-chart__viewport-clip",
		clip: r,
		children: [{
			kind: "group",
			key: `viewport-content:${e.key}`,
			className: "ts-chart__viewport-content",
			...e.viewportX ? { translateX: t } : {},
			...e.viewportY ? { translateY: n } : {},
			children: e.nodes
		}]
	}]);
}
function mt(e, t, n, r = Infinity, i = e.points) {
	return K(e, t, n, r, i);
}
function ht(e, t = e.points) {
	if (!e.scales.x?.viewport && !e.scales.y?.viewport) return t;
	let { x: n, y: r, width: i, height: a } = e.chart, o = n + i, s = r + a, c = t.filter((t) => !gt(e, t) || t.x >= n && t.x <= o && t.y >= r && t.y <= s);
	return c.length === t.length ? t : c;
}
function gt(e, t) {
	let n = e[st]?.[1].find((e) => e.id === t.markId);
	return !n || !!(e.scales.x?.viewport && J(n, "x") || e.scales.y?.viewport && J(n, "y"));
}
function _t(e, t) {
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
function vt(e, t) {
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
var Y = 4, yt = 4, bt = .25;
function xt(e, t, n, r, i, a, o, s, c, l) {
	let u = wt(e.margin), d = Et(Ot(s ? Y : 0), u), f = d;
	for (let e = 0; e < yt; e += 1) {
		let e = h(d), t = g(e);
		if (f = Et(t, u, f), Dt(d, t)) return e;
		d = t;
	}
	let p = h(f), m = Et(g(p), u, f);
	return Dt(f, m) || (p = h(m)), p;
	function h(u) {
		let d = {
			x: u.left,
			y: u.top,
			width: Math.max(1, n - u.left - u.right),
			height: Math.max(1, r - u.top - u.bottom)
		}, f = Mt(e.x, d.width, 92, 8), p = Mt(e.y, d.height, 48, 7), m = {
			x: e.x == null ? kt("x", a.materialized, e.x) : c({
				id: "x",
				values: a.values,
				range: [d.x, d.x + d.width],
				options: e.x,
				tickCount: f,
				includeZero: a.includeZero
			}),
			y: e.y == null ? kt("y", o.materialized, e.y) : c({
				id: "y",
				values: o.values,
				range: [d.y + d.height, d.y],
				options: e.y,
				tickCount: p,
				includeZero: o.includeZero
			})
		}, h = St(t, {
			chart: d,
			scales: m,
			theme: i,
			layout: l
		}), g = w(vt(h, "color").values, e.color, i);
		if (g.kind !== "categorical" && h.some((e) => e.seriesFromColor)) throw TypeError("A continuous color channel cannot infer series identity; supply z explicitly");
		let _ = g.domain.length ? e.color?.legend : void 0;
		if (_?.seriesVisible && g.kind !== "categorical") throw TypeError("An interactive color legend requires a categorical color scale");
		let v = _?.height(g.domain.length, {
			colors: g,
			chart: d,
			bounds: {
				x: d.x,
				y: 0,
				width: d.width,
				height: 0
			},
			theme: i,
			width: n,
			height: r
		}), y = _ && v !== void 0 ? {
			x: d.x,
			y: _.placement === "bottom" ? r - v : 0,
			width: d.width,
			height: v
		} : void 0, b = jt(d, m, e, i, n, s, l.measureText);
		return {
			margin: u,
			chart: d,
			scales: m,
			axes: b.axes,
			guideMargin: b.margin,
			marks: h,
			colors: g,
			legend: _,
			legendBounds: y
		};
	}
	function g(t) {
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
				width: n,
				height: r
			});
			t.legend.placement === "bottom" ? u.bottom === void 0 && (a.bottom += e) : u.top === void 0 && (a.top = Math.max(a.top, e));
		}
		return e.clip || t.marks.forEach((e, o) => {
			if (t.scales.x.viewport && J(e, "x") || t.scales.y.viewport && J(e, "y")) return;
			let s = e.layoutLabels?.({
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
				layout: l
			});
			for (let e of s ?? []) Ct(a, t.chart, e, l.measureText);
		}), Et(a, u);
	}
}
function St(e, t) {
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
function Ct(e, t, n, r) {
	let i = U(n, r);
	return n.text ? (e.top = Math.max(e.top, t.y - i.y + Y), e.right = Math.max(e.right, i.x + i.width - t.x - t.width + Y), e.bottom = Math.max(e.bottom, i.y + i.height - t.y - t.height + Y), e.left = Math.max(e.left, t.x - i.x + Y), i) : i;
}
function wt(e) {
	if (typeof e == "number") return Ot(X(e));
	if (!e) return {};
	let t = {};
	for (let n of Tt) e[n] !== void 0 && (t[n] = X(e[n]));
	return t;
}
var Tt = [
	"top",
	"right",
	"bottom",
	"left"
];
function Et(e, t, n) {
	let r = { ...e };
	for (let i of Tt) r[i] = t[i] ?? (n ? Math.max(n[i], e[i]) : e[i]);
	return r;
}
function Dt(e, t) {
	return Tt.every((n) => Math.abs(e[n] - t[n]) <= bt);
}
function X(e) {
	return e !== void 0 && Number.isFinite(e) ? Math.max(0, e) : 0;
}
function Ot(e) {
	return {
		top: e,
		right: e,
		bottom: e,
		left: e
	};
}
function kt(e, t, n) {
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
function At(e, t, n, r) {
	let i = [];
	if (n.y?.grid) for (let n of t.y.ticks) i.push({
		kind: "rule",
		key: `y-grid:${M(n.value)}`,
		x1: e.x,
		x2: e.x + e.width,
		y1: n.position,
		y2: n.position
	});
	if (n.x?.grid) for (let n of t.x.ticks) i.push({
		kind: "rule",
		key: `x-grid:${M(n.value)}`,
		x1: n.position,
		x2: n.position,
		y1: e.y,
		y2: e.y + e.height
	});
	return {
		kind: "group",
		key: "grid",
		className: "ts-chart__grid",
		ariaHidden: !0,
		children: i,
		style: {
			stroke: r.grid,
			strokeOpacity: .11,
			strokeWidth: 1
		}
	};
}
function jt(e, t, n, r, i, a, o) {
	let s = a & 1, c = a & 2, l = Nt(n.x), u = Nt(n.y), d = !s || l?.line === !1 ? [] : [{
		kind: "rule",
		key: "x-axis",
		x1: e.x,
		x2: e.x + e.width,
		y1: e.y + e.height,
		y2: e.y + e.height,
		style: {
			stroke: r.foreground,
			strokeOpacity: .28
		}
	}];
	c && u?.line !== !1 && d.push({
		kind: "rule",
		key: "y-axis",
		x1: e.x,
		x2: e.x,
		y1: e.y,
		y2: e.y + e.height,
		style: {
			stroke: r.foreground,
			strokeOpacity: .28
		}
	});
	let f = Pt(l), p = Pt(u), m = e.y + e.height, h = e.x, g = Ot(a ? Y : 0), _ = (t) => Ct(g, e, t, o), v = l?.ticks === !1 ? [] : t.x.ticks, y = u?.ticks === !1 ? [] : t.y.ticks, b = X(l?.ticks === !1 ? 0 : l?.ticks?.size ?? 4), x = X(u?.ticks === !1 ? 0 : u?.ticks?.size ?? 4), S = X(l?.ticks === !1 ? 0 : l?.ticks?.padding ?? 4), C = X(u?.ticks === !1 ? 0 : u?.ticks?.padding ?? 4), w = f === !1 ? [] : Rt("x", Lt(t.x, n.x, f), e, b, S, f, t.x.bandwidth, i, r, o), T = p === !1 ? [] : Rt("y", Lt(t.y, n.y, p), e, x, C, p, t.y.bandwidth, i, r, o), E = f === !1 ? [] : Bt(w, f, t.x.type === "band"), D = p === !1 ? [] : Bt(T, p, !1);
	for (let t of s ? v : []) {
		let n = M(t.value);
		b > 0 && d.push({
			kind: "rule",
			key: `x-tick-rule:${n}`,
			x1: t.position,
			x2: t.position,
			y1: e.y + e.height,
			y2: e.y + e.height + b,
			style: {
				stroke: r.foreground,
				strokeOpacity: .28
			}
		});
	}
	for (let e of s ? E : []) {
		let t = _(e.label);
		Ft(l) && It(l) === "auto" && (m = Math.max(m, t.y + t.height)), d.push(e.label);
	}
	for (let t of c ? y : []) {
		let n = M(t.value);
		x > 0 && d.push({
			kind: "rule",
			key: `y-tick-rule:${n}`,
			x1: e.x - x,
			x2: e.x,
			y1: t.position,
			y2: t.position,
			style: {
				stroke: r.foreground,
				strokeOpacity: .28
			}
		});
	}
	for (let e of c ? D : []) {
		let t = _(e.label);
		Ft(u) && It(u) === "auto" && (h = Math.min(h, t.x)), d.push(e.label);
	}
	let O = Ft(l);
	if (s && O) {
		let t = It(l), n = t !== "auto", a = {
			kind: "label",
			key: "x-label",
			x: e.x + e.width / 2,
			y: n ? e.y + e.height + Math.max(0, X(t)) : m + 8,
			text: O,
			anchor: "middle",
			baseline: n ? "auto" : "hanging",
			fontSize: i < 360 ? 10 : 11,
			fontWeight: 600,
			style: {
				fill: r.foreground,
				fillOpacity: .76
			}
		};
		_(a), d.push(a);
	}
	let k = Ft(u);
	if (c && k) {
		let t = {
			kind: "label",
			key: "y-label",
			x: e.x,
			y: e.y + e.height / 2,
			text: k,
			anchor: "middle",
			baseline: "middle",
			rotate: -90,
			fontSize: 11,
			fontWeight: 600,
			style: {
				fill: r.foreground,
				fillOpacity: .76
			}
		}, n = It(u);
		if (n !== "auto") t.x = e.x - Math.max(0, X(n));
		else {
			let e = U({
				...t,
				x: 0,
				y: 0
			}, o);
			t.x = h - 8 - (e.x + e.width);
		}
		_(t), d.push(t);
	}
	return {
		axes: {
			kind: "group",
			key: "axes",
			className: "ts-chart__axes",
			ariaHidden: !0,
			children: d
		},
		margin: g
	};
}
function Mt(e, t, n, r) {
	let i = e?.axis === !1 ? void 0 : e?.axis?.ticks;
	if (i === !1) return Math.max(2, Math.min(r, Math.floor(t / n)));
	let a = i ?? {};
	if ([
		a.count !== void 0,
		a.spacing !== void 0,
		a.values !== void 0
	].filter(Boolean).length > 1) throw TypeError("Axis ticks accept only one candidate policy: count, spacing, or values");
	if (a.values) return Math.max(1, a.values.length);
	if (a.count !== void 0) return Math.max(1, Math.floor(X(a.count)));
	if (a.spacing !== void 0) {
		let e = Math.max(1, X(a.spacing));
		return Math.max(1, Math.floor(t / e));
	}
	return Math.max(2, Math.min(r, Math.floor(t / n)));
}
function Nt(e) {
	if (!(!e || e.axis === !1)) return e.axis ?? {};
}
function Pt(e) {
	return e?.ticks === !1 || e?.tickLabels === !1 ? !1 : e?.tickLabels ?? {};
}
function Ft(e) {
	return typeof e?.label == "string" ? e.label : e?.label?.text;
}
function It(e) {
	return typeof e?.label == "object" ? e.label.offset ?? "auto" : "auto";
}
function Lt(e, t, n) {
	let r = (typeof n.thin == "object" ? n.thin : void 0)?.keep ?? [];
	if (!r.length) return e.ticks;
	let i = t?.axis === !1 || t?.axis?.ticks === !1 ? void 0 : t?.axis?.ticks?.format, a = e.ticks.map((e) => ({
		...e,
		hard: r.some((t) => M(t) === M(e.value))
	})), o = new Set(a.map((e) => M(e.value)));
	for (let t of r) {
		let n = e.map(t);
		o.has(M(t)) || !Number.isFinite(n) || a.push({
			value: t,
			position: n,
			label: i?.(t) ?? Wt(t),
			hard: !0
		});
	}
	return a;
}
function Rt(e, t, n, r, i, a, o, s, c, l) {
	let u = s < 360 ? 10 : 11;
	return t.map((t, s) => {
		let d = {
			value: t.value,
			index: s,
			position: t.position,
			bandwidth: o
		}, f = a.rotate, p = zt(a.fontSize, d) ?? u, m = zt(a.fontWeight, d), h = zt(a.opacity, d), g = zt(a.dx, d) ?? 0, _ = zt(a.dy, d) ?? 0, v = e === "y" || (f ?? 0) < 0 ? "end" : (f ?? 0) > 0 ? "start" : "middle", y = zt(a.anchor, d) ?? v, b = e === "x" ? {
			kind: "label",
			key: `x-tick-label:${M(t.value)}`,
			x: t.position + g,
			y: n.y + n.height + r + i + p * .8 + _,
			text: t.label,
			anchor: y,
			rotate: f,
			fontSize: p,
			fontWeight: m,
			style: {
				fill: c.muted,
				...h === void 0 ? { fillOpacity: .68 } : { opacity: h }
			}
		} : {
			kind: "label",
			key: `y-tick-label:${M(t.value)}`,
			x: n.x - r - i + g,
			y: t.position + _,
			text: t.label,
			anchor: y,
			baseline: "middle",
			rotate: f,
			fontSize: p,
			fontWeight: m,
			style: {
				fill: c.muted,
				...h === void 0 ? { fillOpacity: .68 } : { opacity: h }
			}
		};
		return {
			value: t.value,
			label: b,
			bounds: U(b, l),
			hard: t.hard ?? !1
		};
	});
}
function zt(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Bt(e, t, n) {
	if (t.thin === !1 || e.length < 2) return [...e];
	let r = typeof t.thin == "object" ? t.thin : {}, i = Math.max(0, X(r.minGap ?? 4)), a = e.filter((e) => e.hard), o = e.filter((e) => !e.hard);
	if ((r.priority === "ends" || n) && o.length) {
		let e = o[0], t = o.at(-1);
		Ht(e, a, i) || a.push(e), t !== e && !Ht(t, a, i) && a.push(t);
	}
	let s = Vt(o.filter((e) => !a.includes(e)));
	for (let e of s) Ht(e, a, i) || a.push(e);
	let c = new Set(a);
	return e.filter((e) => c.has(e));
}
function Vt(e) {
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
function Ht(e, t, n) {
	return t.some((t) => Ut(e.bounds, t.bounds, n));
}
function Ut(e, t, n) {
	return !(e.x + e.width + n <= t.x || t.x + t.width + n <= e.x || e.y + e.height + n <= t.y || t.y + t.height + n <= e.y);
}
function Wt(e) {
	return e instanceof Date ? e.toLocaleDateString() : String(e);
}
function Gt(e) {
	return Number.isFinite(e) ? Math.max(1, e) : 1;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/runtime.js
function Kt(e = {}) {
	let t = {
		...ct,
		...e.defaultTheme,
		palette: e.defaultTheme?.palette ?? ct.palette
	};
	return {
		render(e, n, r) {
			if (!qt(e)) return ut(e, n, {
				...r,
				defaultTheme: t
			});
			let { chart: i, ...a } = e;
			return ut({
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
function qt(e) {
	return "chart" in e && typeof e.chart == "function";
}
//#endregion
//#region node_modules/@tanstack/charts/dist/adapter-shared.js
function Jt(e, t = 0) {
	return e.keyboard === !1 || e.focus === !1 || e.cursor?.mode === "free" ? -1 : t;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/dom-text.js
function Yt(e) {
	let t = e.ownerDocument.defaultView, n = t?.CanvasRenderingContext2D ? e.ownerDocument.createElement("canvas").getContext("2d") : null, r = o(), i = Qt(r), a = /* @__PURE__ */ new Map();
	return {
		measureText(e, t) {
			if (!n) return H(e, t);
			let o = `${i}\0${t.fontSize}\0${t.fontWeight ?? ""}\0${t.fontFamily}\0${t.fontStyle}\0${t.fontStretch}\0${t.letterSpacing}\0${t.direction}\0${t.locale ?? ""}\0${t.fontScale}\0${t.anchor}\0${t.baseline}\0${e}`, s = a.get(o);
			if (s) return s;
			Xt(n, r.weight, t);
			let c = Zt(n.measureText(e), t);
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
			let e = o(), t = Qt(e);
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
			stretch: $t(n?.fontStretch),
			weight: n?.fontWeight || "400",
			direction: n?.direction === "rtl" ? "rtl" : n?.direction === "ltr" ? "ltr" : "inherit",
			letterSpacing: en(n?.letterSpacing)
		};
	}
}
function Xt(e, t, n) {
	let r = tn(n.fontScale, 1), i = n.fontSize * r, a = n.fontWeight ?? t;
	e.font = [
		n.fontStyle,
		a,
		`${i}px`,
		n.fontFamily
	].join(" "), "fontStretch" in e && (e.fontStretch = $t(n.fontStretch)), e.textAlign = n.anchor === "middle" ? "center" : n.anchor, e.textBaseline = n.baseline === "auto" ? "alphabetic" : n.baseline, e.direction = n.direction, "letterSpacing" in e && (e.letterSpacing = `${n.letterSpacing * r}px`);
}
function Zt(e, t) {
	let n = t.fontSize * tn(t.fontScale, 1), r = e.actualBoundingBoxLeft, i = e.actualBoundingBoxRight, a = e.actualBoundingBoxAscent, o = e.actualBoundingBoxDescent;
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
		x: t.anchor === "middle" ? -s / 2 : t.anchor === "end" ? -s : 0,
		y: t.baseline === "middle" ? -n / 2 : t.baseline === "hanging" ? 0 : -n * .8,
		width: s,
		height: n
	};
}
function Qt(e) {
	return [
		e.family,
		e.style,
		e.stretch,
		e.weight,
		e.direction,
		e.letterSpacing
	].join("\0");
}
function $t(e) {
	if (e === "ultra-condensed" || e === "extra-condensed" || e === "condensed" || e === "semi-condensed" || e === "normal" || e === "semi-expanded" || e === "expanded" || e === "extra-expanded" || e === "ultra-expanded") return e;
	let t = Number.parseFloat(e ?? "");
	return Number.isFinite(t) ? t <= 50 ? "ultra-condensed" : t <= 62.5 ? "extra-condensed" : t <= 75 ? "condensed" : t <= 87.5 ? "semi-condensed" : t < 112.5 ? "normal" : t < 125 ? "semi-expanded" : t < 150 ? "expanded" : t < 200 ? "extra-expanded" : "ultra-expanded" : "normal";
}
function en(e) {
	let t = Number.parseFloat(e ?? "");
	return Number.isFinite(t) ? t : 0;
}
function tn(e, t) {
	return e !== void 0 && Number.isFinite(e) && e > 0 ? e : t;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/focus-disabled.js
var nn = {
	resolve: () => [],
	group: () => [],
	navigation: () => []
}, rn = cn("x", !0), an = cn("y", !0), on = cn("x", !1), sn = cn("y", !1);
function cn(e, t) {
	let n = (t) => e === "x" ? t.x : t.y, r = (t) => e === "x" ? t.xValue : t.yValue, i = (t) => e === "x" ? t.y : t.x;
	return {
		resolve(a, o) {
			let { x: s, y: c, maxDistance: l } = o, u = e === "x" ? s : c, d, f = l;
			for (let e of a) {
				let t = Math.abs(n(e) - u);
				t >= f || (d = e, f = t);
			}
			if (!d) return [];
			let p = ln(a, d, r), m = e === "x" ? c : s, h = p.reduce((e, t) => Math.abs(i(t) - m) < Math.abs(i(e) - m) ? t : e, d);
			return t ? [h, ...p.filter((e) => e !== h)] : [h];
		},
		group(e, n) {
			let { point: i } = n;
			return t ? ln(e, i, r) : [i];
		},
		navigation(e) {
			let n = [...e].sort((e, t) => e.x - t.x || e.y - t.y);
			if (!t) return n;
			let i = /* @__PURE__ */ new Map();
			for (let e of n) {
				let t = M(r(e));
				i.has(t) || i.set(t, e);
			}
			return [...i.values()];
		}
	};
}
function ln(e, t, n) {
	let r = M(n(t)), i = /* @__PURE__ */ new Map();
	i.set(M(t.group), t);
	for (let t of e) {
		if (M(n(t)) !== r) continue;
		let e = M(t.group);
		i.has(e) || i.set(e, t);
	}
	return [t, ...[...i.values()].sort((e, t) => e.y - t.y).filter((e) => e !== t)];
}
//#endregion
//#region node_modules/@tanstack/charts/dist/interaction.js
function un(e) {
	if (e !== !1) {
		if (typeof e != "string") return e;
		switch (e) {
			case "nearest-x": return on;
			case "nearest-y": return sn;
			case "group-x": return rn;
			case "group-y": return an;
			case "nearest": return;
		}
	}
}
function dn(e, t, n, r, i, a = e.points) {
	let o = un(t);
	if (o) {
		if (a === e.points && (o === on || o === sn || o === rn || o === an)) {
			let t = Fe(e, n, r);
			if (t) return t.point ? o.group(a, { point: t.point }) : [];
		}
		return o.resolve(a, {
			x: n,
			y: r,
			maxDistance: i
		});
	}
}
function fn(e, t) {
	return e === t || e !== null && t !== null && e.key === t.key && e.markId === t.markId && e.datumIndex === t.datumIndex;
}
function pn(e, t) {
	let n = e.filter((e) => e.key === t.key);
	if (n.length < 2) return n[0] ?? null;
	let r = typeof t.datum;
	if (t.datum !== null && (r === "object" || r === "function")) {
		let e = n.find((e) => e.datum === t.datum);
		if (e) return e;
	}
	return n.find((e) => e.markId === t.markId && Object.is(e.group, t.group) && vn(e.xValue, t.xValue) && vn(e.yValue, t.yValue)) ?? n.find((e) => e.markId === t.markId && e.datumIndex === t.datumIndex) ?? n[0] ?? null;
}
function mn(e, t, n) {
	let r = t ? e.findIndex((e) => fn(e, t)) : -1, i;
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
function hn(e, t, n) {
	let r = n === "ArrowRight" || n === "ArrowDown" ? 1 : n === "ArrowLeft" || n === "ArrowUp" ? -1 : n === "Home" ? 0 : n === "End" ? 2 : void 0;
	if (r === void 0) return;
	if (!e.length) return null;
	let i = t ? e.findIndex((e) => fn(e, t)) : -1;
	if (!t || i < 0 || r === 0 || r === 2) return gn(e, r === 2);
	let a = null, o = -1;
	for (let n = 0; n < e.length; n += 1) {
		let s = e[n];
		if (!s) continue;
		let c = _n(s, n, t, i);
		r > 0 && c <= 0 || r < 0 && c >= 0 || (!a || r * _n(s, n, a, o) < 0) && (a = s, o = n);
	}
	return a ?? t;
}
function gn(e, t) {
	let n = e[0] ?? null, r = 0;
	for (let i = 1; i < e.length; i += 1) {
		let a = e[i];
		if (!a || !n) continue;
		let o = _n(a, i, n, r);
		(t && o > 0 || !t && o < 0) && (n = a, r = i);
	}
	return n;
}
function _n(e, t, n, r) {
	return e.x - n.x || e.y - n.y || t - r;
}
function vn(e, t) {
	return e instanceof Date && t instanceof Date ? e.getTime() === t.getTime() : Object.is(e, t);
}
//#endregion
//#region node_modules/@tanstack/charts/dist/cursor-host-contract.js
function yn(e) {
	let t = e.use;
	if (t.__chartExtensionType !== "cursor") throw TypeError("A chart cursor requires a cursor host extension.");
	return t.create(e.controller);
}
//#endregion
//#region node_modules/@tanstack/charts/dist/renderer.js
function bn(e, t, n = Kt()) {
	wn(t.definition.tooltip);
	let r = t, i, a, o = null, s = "pointer", c = null, l = null, u = null, d, f, p = !1, m, h = !1, g = !1, _, v, y = !1, b = !1, x, S, C = !1, w, T = /* @__PURE__ */ new Map(), E, D, O, k, A, j, M = null, ee = !1, te = e.style.position, N = e.ownerDocument.defaultView, ne = N?.getComputedStyle(e).position, re = !ne || ne === "static", P = Yt(e), ie = e.ownerDocument.fonts;
	re && (e.style.position = "relative");
	let F = (t = !1, n = "update") => {
		if (h) return;
		t && !r.measureText && P.refresh();
		let d = o, f = M, p = A;
		i = Sn(Te()), a = i, _ ? _.renderer !== r.renderer && (v?.(), v = void 0, G(), De(), _.destroy(), e.replaceChildren(), _ = r.renderer.mount(e, oe), ke(), g = !1) : (_ = r.renderer.mount(e, oe), ke()), y = !0;
		try {
			_.render(i, {
				ariaLabel: r.ariaLabel,
				ariaDescription: r.ariaDescription,
				className: r.className,
				tabIndex: Jt(r.definition, r.tabIndex),
				idPrefix: r.idPrefix,
				animation: g ? On(r.definition.svgAnimation, e, n) : void 0
			});
		} finally {
			y = !1;
		}
		Ee(), g = !0;
		let m = H();
		w = r.definition.focus === !1 ? void 0 : r.definition.spatialIndex?.(ht(i, i.points), { scene: i });
		let b = L();
		if (A = b, b) ue(!0);
		else if (p) M = null, o = null, u = null, l = null, c = null, B(null, []), d && (r.onFocusChange?.(null), r.onFocusGroupChange?.([]));
		else {
			M = null;
			let e = (c === "pointer" || c === "controlled" && s === "pointer") && u === null ? l : null, t = e ? V(e.x, e.y, je()) : d ? (() => {
				let e = pn(m, d);
				return e ? U(e, m) : [];
			})() : [], n = t[0] ?? null;
			o = n, n || (u = null), (d || n || f) && (e || (s = "restored"), B(n, t), r.onFocusChange?.(n), r.onFocusGroupChange?.(t));
		}
		let x = r.onRender;
		x && x({
			container: e,
			scene: i,
			surface: _,
			interaction: he
		});
	}, I = () => {
		let t = r.width ?? e.getBoundingClientRect().width;
		return r.width !== void 0 || t > 0 ? t : void 0;
	}, ae = () => {
		if (d?.disconnect(), d = void 0, r.width !== void 0) return;
		let t = N?.ResizeObserver;
		t && (d = new t(() => {
			let e = I();
			e !== void 0 && e !== i.width && oe(!1, "resize");
		}), d.observe(e));
	}, oe = (e = !1, t = "layout") => {
		if (p ||= e, m = m === "layout" || t === "layout" ? "layout" : "resize", f === void 0) {
			if (!N?.requestAnimationFrame) {
				let e = I(), t = p || e !== void 0 && e !== i.width;
				p = !1;
				let n = m ?? "layout";
				m = void 0, t && F(!0, n);
				return;
			}
			f = N.requestAnimationFrame(() => {
				f = void 0;
				let e = I(), t = p || e !== void 0 && e !== i.width;
				p = !1;
				let n = m ?? "layout";
				m = void 0, t && F(!0, n);
			});
		}
	}, se = () => {
		h || r.measureText || (P.invalidate(), oe(!0));
	}, L = () => r.definition.cursor, ce = () => E?.getState()?.pinned === !0, R = () => u !== null || ce(), le = () => {
		let e = L();
		e && (ee = !0);
		let t = e?.controller, n = e?.mode, r = e?.mode === "focus" ? e.match ?? "xy" : void 0;
		(t !== E?.controller || n !== D || r !== O || e?.use !== k) && (j?.(), j = void 0, E?.destroy(), E = e ? yn(e) : void 0, D = n, O = r, k = e?.use, j = E?.subscribe(() => {
			!h && g && ue(!1);
		}));
	}, ue = (e) => {
		let t = L();
		if (!t) {
			M = null;
			return;
		}
		let n = E;
		if (!n) return;
		let a = n.getState();
		(a?.source !== "pointer" || !n.owns(a)) && (l = null), M = n.resolvePresentation(i, t, a);
		let c = o;
		if (t.mode === "focus") {
			let i = un(r.definition.focus), l = n.resolveFocus(H(), t, a, i), d = l[0] ?? null;
			a && (s = a.source), u = a?.pinned && d ? d.key : null, o = d, B(d, l), (!fn(c, d) || e && (c !== null || d !== null)) && (r.onFocusChange?.(d), r.onFocusGroupChange?.(l));
			return;
		}
		u = null, o = null, B(null, []), c && (r.onFocusChange?.(null), r.onFocusGroupChange?.([]));
	}, de = (e, t = R()) => {
		let n = L();
		if (n?.mode !== "focus") return !1;
		let r = E;
		if (!r) return !1;
		let a = e[0];
		return a ? (r.publish(r.createFocusState(i, n, {
			primary: a,
			group: e,
			source: s,
			pinned: t
		})), !0) : (r.clearOwnedTransient(), !0);
	}, z = (e, t = !1) => {
		let n = e[0] ?? null;
		if (!de(e)) {
			if (fn(n, o)) {
				o = n, t && B(n, e);
				return;
			}
			o = n, B(n, e), r.onFocusChange?.(n), r.onFocusGroupChange?.(e);
		}
	}, fe = () => {
		let t = L();
		if (!o && !u && !E?.getState()) return;
		let n = !!S?.contains(e.ownerDocument.activeElement);
		u = null, l = null, c = null, t ? E?.clear() : z([]);
		let r = _?.element;
		n && r && "focus" in r && typeof r.focus == "function" && (C = !0, r.focus());
	}, B = (e, t) => {
		b = !0;
		let n;
		try {
			let r = e ? {
				primary: e,
				group: t,
				source: s,
				pinned: R()
			} : null;
			n = ee ? _?.paintFocus(r, l, M) : _?.paintFocus(r, l);
		} finally {
			b = !1;
		}
		a = n ?? i, W(e, t);
	}, pe = (e, t) => {
		let n = _?.clientToScene?.(i, e, t);
		return n ? {
			position: n,
			points: V(n.x, n.y, je())
		} : null;
	}, me = (e, t) => {
		let n = pe(e, t);
		return l = n?.position ?? null, n?.points ?? [];
	}, he = {
		clientToScene(e, t) {
			return h ? null : _?.clientToScene?.(i, e, t) ?? null;
		},
		resolvePointer(e, t) {
			if (h) return null;
			let n = pe(e, t), r = n?.points[0];
			return n && r ? {
				position: n.position,
				point: r,
				points: n.points
			} : null;
		},
		setControlledFocus(e, t = {}) {
			if (h) return;
			if (c = "controlled", !e) {
				s = t.source ?? "programmatic", l = null, u = null, z([]), c = null;
				return;
			}
			let n, r;
			Cn(e) ? (n = e, r = e.point) : (n = null, r = e), s = t.source ?? (n === null ? "programmatic" : "pointer");
			let i = H(), a = pn(i, r);
			if (l = n?.position ?? null, !a) {
				u = null, z([]), c = null;
				return;
			}
			let d = U(a, i);
			if (u = t.pinned && (K() || L()?.pin === !0) ? a.key : null, fn(a, o)) {
				o = a, B(a, d);
				return;
			}
			z(d);
		}
	}, ge = (e, t) => {
		let n = _?.clientToScene?.(i, e, t);
		return l = n ?? null, n;
	}, _e = (e, t) => {
		let n = L();
		if (n?.mode !== "free") return !1;
		if (ce()) return !0;
		let r = ge(e, t);
		if (!r || !Dn(i, r)) return l = null, E?.clearOwnedTransient(), !0;
		let a = E;
		return a ? (a.publish(a.createFreeState(i, n, r, "pointer", !1)), !0) : !1;
	}, ve = (e) => {
		if (Oe(e.target)) {
			R() || (l = null, z([]));
			return;
		}
		r.definition.pointer === !1 || R() || (c = "pointer", s = "pointer", !_e(e.clientX, e.clientY) && z(me(e.clientX, e.clientY), Fe()));
	}, ye = (e) => {
		r.definition.pointer === !1 || R() || (c = "pointer", s = "pointer", _e(e.clientX, e.clientY));
	}, be = ({ relatedTarget: t }) => {
		r.definition.pointer !== !1 && c === "pointer" && !R() && !(N && t instanceof N.Node && e.contains(t)) && (l = null, L() ? E?.clearOwnedTransient() : z([]), c = null);
	}, xe = ({ relatedTarget: t }) => {
		c === "keyboard" && !u && !(N && t instanceof N.Node && e.contains(t)) && (l = null, L() ? E?.clearOwnedTransient() : z([]), c = null);
	}, Se = (t) => {
		if (Oe(t.target) || r.definition.pointer === !1) return;
		let n = S, i = e.ownerDocument.defaultView?.Node, a = i ? t.composedPath().some((e) => e instanceof i && n?.contains(e)) : n?.contains(t.target);
		if (n && a) return;
		c = "pointer";
		let o = L();
		if (o?.mode === "free") {
			E?.getState() || _e(t.clientX, t.clientY);
			let e = E?.getState();
			o.pin && e && (e.pinned ? E?.clear() : E?.publish({
				...e,
				pinned: !0
			})), r.onSelect?.(null);
			return;
		}
		let l = me(t.clientX, t.clientY);
		s = "pointer";
		let d = l[0] ?? null, f = !1, p = K() || o?.pin === !0;
		p && (R() ? (u = null, f = !0, o && E?.clear()) : d && (u = d.key, f = !0)), o && p && f && !u || z(l, f), r.definition.selection?.change(d, "pointer"), r.onSelect?.(d);
	}, Ce = (e) => {
		if (Oe(e.target)) return;
		let t = L();
		if (e.key === "Escape" && E?.getState()) {
			e.preventDefault(), fe();
			return;
		}
		if (e.key === "Escape" && u) {
			e.preventDefault(), fe();
			return;
		}
		if (r.definition.keyboard === !1 || t?.mode === "free") return;
		let n = H();
		if (!n.length) return;
		if (e.key === "Enter" || e.key === " ") {
			if (!o) return;
			e.preventDefault();
			let n = o, i = K() || t?.pin === !0;
			t?.mode === "focus" && i ? R() ? (u = null, E?.clear()) : (u = n.key, de(U(n), !0)) : K() && (u = u ? null : n.key, B(n, U(n))), r.definition.selection?.change(n, "keyboard"), r.onSelect?.(n);
			return;
		}
		let i = En(r.definition.focus), a = i ? mn(i.navigation(n), o, e.key) : hn(n, o, e.key);
		a !== void 0 && (e.preventDefault(), l = null, c = "keyboard", s = "keyboard", z(a ? U(a) : []));
	}, we = (e) => {
		if (Oe(e.target)) {
			u || (l = null, z([]));
			return;
		}
		if (e.target === _?.element && C) {
			C = !1;
			return;
		}
		if (r.definition.keyboard !== !1 && L()?.mode !== "free" && e.target === _?.element && !o) {
			let e = En(r.definition.focus), t = H(), n = e ? e.navigation(t)[0] : hn(t, null, "Home");
			l = null, c = "keyboard", s = "keyboard", z(n ? U(n) : []);
		}
	};
	return e.addEventListener("pointermove", ve), e.addEventListener("pointerdown", ye), e.addEventListener("pointercancel", be), e.addEventListener("mouseleave", be), e.addEventListener("click", Se), e.addEventListener("keydown", Ce), e.addEventListener("focusin", we), e.addEventListener("focusout", xe), ie?.addEventListener?.("loadingdone", se), le(), F(), ae(), {
		interaction: he,
		update(e) {
			if (h) return;
			wn(e.definition.tooltip);
			let t = e.measureText === void 0 && P.refresh(), n = r.definition !== e.definition, i = r.height !== e.height || r.aspectRatio !== e.aspectRatio || r.width !== e.width || r.initialWidth !== e.initialWidth, a = r.idPrefix !== e.idPrefix || r.renderer !== e.renderer || r.measureText !== e.measureText || t, s = n || i || r.ariaLabel !== e.ariaLabel || r.ariaDescription !== e.ariaDescription || r.className !== e.className || r.tabIndex !== e.tabIndex || r.idPrefix !== e.idPrefix || r.renderer !== e.renderer || r.measureText !== e.measureText || t, d = r.width !== e.width, f = r.definition.pointer !== !1 && e.definition.pointer === !1 && c === "pointer";
			r = e, le(), Ne(), f && (l = null, u = null, c = null, z([])), K() || (u = null), s ? F(!1, a ? "layout" : i ? "resize" : "update") : L() ? ue(!1) : o && B(o, U(o)), d && ae();
		},
		getScene: () => i,
		destroy() {
			h || (h = !0, d?.disconnect(), j?.(), j = void 0, E?.destroy(), E = void 0, D = void 0, O = void 0, k = void 0, ie?.removeEventListener?.("loadingdone", se), f !== void 0 && N?.cancelAnimationFrame?.(f), G(), De(), v?.(), v = void 0, _?.destroy(), n.destroy(), e.removeEventListener("pointermove", ve), e.removeEventListener("pointerdown", ye), e.removeEventListener("pointercancel", be), e.removeEventListener("mouseleave", be), e.removeEventListener("click", Se), e.removeEventListener("keydown", Ce), e.removeEventListener("focusin", we), e.removeEventListener("focusout", xe), e.replaceChildren(), re && e.style.position === "relative" && (e.style.position = te));
		}
	};
	function Te() {
		let e = I() ?? r.initialWidth ?? 640;
		return n.render(r.definition, {
			width: e,
			height: r.height ?? (Tn(r.aspectRatio) ? e / r.aspectRatio : 320)
		}, {
			measureText: r.measureText ?? P.measureText,
			typography: P.typography()
		});
	}
	function Ee() {
		let t = /* @__PURE__ */ new Set();
		for (let n of i.controls ?? []) {
			let r = n.extension, a = `${r.id}:${n.key}`;
			t.add(a);
			let o = T.get(a);
			o && o.extension !== r && (o.instance.destroy(), T.delete(a), o = void 0), o || (o = {
				extension: r,
				instance: r.create({
					container: e,
					surface: _
				})
			}, T.set(a, o)), o.instance.update(n, i);
		}
		for (let [e, n] of T) t.has(e) || (n.instance.destroy(), T.delete(e));
	}
	function De() {
		for (let e of T.values()) e.instance.destroy();
		T.clear();
	}
	function Oe(e) {
		for (let t of T.values()) if (t.instance.contains?.(e)) return !0;
		return !1;
	}
	function V(e, t, n) {
		let o = H(), s = En(r.definition.focus), c = dn(a, s, e, t, n, o);
		if (c) return c;
		let l = _?.getPresentationPoints?.() === void 0 ? w && a === i ? w.findNearest(e, t, n) : mt(a, e, t, n, o) : Pe(o, e, t, n), u = l ? pn(o, l) : null;
		return u ? [u] : [];
	}
	function H() {
		let e = _?.getPresentationPoints?.() ?? a.points;
		return ht(i, e);
	}
	function U(e, t = H()) {
		return En(r.definition.focus)?.group(t, { point: e }) ?? [e];
	}
	function ke() {
		v = _?.subscribePresentationPoints?.(Ae);
	}
	function Ae(e) {
		if (h || y || b) return;
		if (L()) {
			ue(!1);
			return;
		}
		let t = ht(i, e);
		if (l && u === null) {
			z(V(l.x, l.y, je()), !0);
			return;
		}
		if (!o) return;
		let n = pn(t, o);
		z(n ? U(n, t) : [], !0);
	}
	function je() {
		return r.definition.maxFocusDistance ?? 48;
	}
	function W(t, n) {
		let a = wn(r.definition.tooltip);
		if (!a || !t || !_) {
			S?.hide();
			return;
		}
		if (x !== a.extension || !S) {
			G(), x = a.extension;
			let t = _.renderer.capabilities?.tooltipMotion;
			S = a.extension.create({
				container: e,
				motion: t?.protocol === 1 ? t.createController({
					container: e,
					transition: Me
				}) : void 0,
				dismiss: fe,
				bodyChange: () => r.onTooltipBodyChange
			});
		}
		let o = S;
		o.update(a.options), o.paint({
			point: t,
			points: n,
			scene: i,
			surface: _,
			pointer: l,
			focus: {
				primary: t,
				group: n,
				source: s,
				pinned: R()
			},
			pinned: R()
		});
	}
	function Me() {
		let e = r.definition.motion;
		return e === !1 ? !1 : typeof e == "function" ? void 0 : e?.transition;
	}
	function Ne() {
		let e = wn(r.definition.tooltip);
		e ? e.extension === x ? S?.update(e.options) : G() : (S?.update(xn), S?.hide());
	}
	function G() {
		S?.destroy(), S = void 0, x = void 0;
	}
	function K() {
		let e = wn(r.definition.tooltip);
		return !!(e && e.options.sticky !== !1);
	}
	function Fe() {
		let e = wn(r.definition.tooltip)?.options.anchor;
		return e === "pointer" || typeof e == "function" || typeof e == "object" && (e.x === "pointer" || e.y === "pointer");
	}
}
var xn = {};
function Sn(e) {
	let t = new Set((e.controls ?? []).flatMap((e) => e.fallbackNodeKey ? [e.fallbackNodeKey] : []));
	return t.size ? {
		...e,
		nodes: e.nodes.filter((e) => !t.has(e.key))
	} : e;
}
function Cn(e) {
	return "position" in e && "point" in e && "points" in e;
}
function wn(e) {
	if (!e) return null;
	let t = "create" in e ? e : e.use;
	if (t.__chartTooltipHost !== "dom") throw TypeError("DOM chart hosts require a tooltip extension from @tanstack/charts/tooltip.");
	let n = t;
	return "create" in e ? {
		extension: n,
		options: xn
	} : {
		extension: n,
		options: e
	};
}
function Tn(e) {
	return typeof e == "number" && Number.isFinite(e) && e > 0;
}
function En(e) {
	return e === !1 ? nn : un(e);
}
function Dn(e, t) {
	return t.x >= e.chart.x && t.x <= e.chart.x + e.chart.width && t.y >= e.chart.y && t.y <= e.chart.y + e.chart.height;
}
function On(e, t, n) {
	let r = e === !0 ? {} : e || void 0;
	if (!r || n === "layout" || n === "resize" && r.resize !== !0 || (r.respectReducedMotion ?? !0) && t.ownerDocument.defaultView?.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
	let { resize: i, ...a } = r;
	return a;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/reconcile.js
var kn = /* @__PURE__ */ new Set([
	"cx",
	"cy",
	"d",
	"fill-opacity",
	"font-size",
	"font-weight",
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
function An(e, t, n) {
	let r = e.ownerDocument.createElement("template");
	r.innerHTML = t;
	let i = r.content.firstElementChild;
	if (!i) return () => {};
	let a = e.firstElementChild;
	if (!a || a.namespaceURI !== i.namespaceURI || a.localName !== i.localName) return e.replaceChildren(i), () => {};
	let o = [];
	return Mn(a, i, n ? o : void 0), n ? In(e, o, n) : () => {};
}
function jn(e, t, n) {
	let r = e.ownerDocument.createElement("template");
	r.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg">${t}</svg>`;
	let i = r.content.firstElementChild?.firstElementChild;
	if (!i) return () => {};
	if (e.namespaceURI !== i.namespaceURI || e.localName !== i.localName) return e.replaceWith(i), () => {};
	let a = [];
	return Mn(e, i, n ? a : void 0), n ? In(e, a, n) : () => {};
}
function Mn(e, t, n) {
	if (Nn(e, t, n), !t.firstElementChild) {
		if (e.firstElementChild) for (let t of [...e.children]) n ? Fn(t, n) : t.remove();
		else e.textContent !== t.textContent && (e.textContent = t.textContent);
		return;
	}
	let r = [...e.children], i = [...t.children], a = Bn(r), o = Vn(i), s = /* @__PURE__ */ new Set(), c = e.firstElementChild;
	i.forEach((t, r) => {
		let i = o[r], l = a.get(i), u;
		l && l.namespaceURI === t.namespaceURI && l.localName === t.localName ? (u = l, s.add(l), u !== c && e.insertBefore(u, c), Mn(u, t, n)) : (u = t.cloneNode(!0), e.insertBefore(u, c), Pn(u, t, n)), c = u.nextElementSibling;
	});
	for (let t of r) !s.has(t) && t.parentElement === e && (n ? Fn(t, n) : t.remove());
}
function Nn(e, t, n) {
	let r = new Set(t.getAttributeNames());
	for (let t of e.getAttributeNames()) r.has(t) || e.removeAttribute(t);
	for (let i of r) {
		let r = t.getAttribute(i), a = e.getAttribute(i);
		if (r === a) continue;
		let o = n && a !== null && r !== null && kn.has(i) ? Rn(i, a, r) : void 0;
		o && n ? n.push({
			element: e,
			name: i,
			interpolate: o,
			target: r
		}) : r !== null && e.setAttribute(i, r);
	}
}
function Pn(e, t, n) {
	if (!n) return;
	let r = t.getAttribute("opacity"), i = r ?? "1";
	e.setAttribute("opacity", "0"), n.push({
		element: e,
		name: "opacity",
		interpolate: (e) => String(Number(i) * Math.max(0, Math.min(1, e))),
		target: r
	});
}
function Fn(e, t) {
	let n = Number(e.getAttribute("opacity") ?? 1), r = Number.isFinite(n) ? n : 1;
	t.push({
		element: e,
		name: "opacity",
		interpolate: (e) => String(r * (1 - e)),
		target: "0",
		removeOnFinish: !0
	});
}
function In(e, t, n) {
	if (!t.length) return () => {};
	let r = e.ownerDocument.defaultView, i = r?.requestAnimationFrame?.bind(r), a = r?.cancelAnimationFrame?.bind(r), o = Math.max(0, n.duration ?? 240);
	if (!i || !a || o === 0) return Ln(t), () => {};
	let s = 0, c = !1, l, u = Hn(n.easing ?? "ease-out"), d = (e) => {
		if (c) return;
		l ??= e;
		let n = Math.min(1, (e - l) / o), r = u(n);
		for (let e of t) e.element.setAttribute(e.name, e.interpolate(r));
		n < 1 ? s = i(d) : Ln(t);
	};
	return s = i(d), () => {
		c = !0, a(s);
	};
}
function Ln(e) {
	for (let t of e) {
		if (t.removeOnFinish) {
			t.element.remove();
			continue;
		}
		t.target === null ? t.element.removeAttribute(t.name) : t.element.setAttribute(t.name, t.target);
	}
}
function Rn(e, t, n) {
	let r = e === "d", i = zn(t, r), a = zn(n, r);
	if (i.skeleton !== a.skeleton || i.values.length !== a.values.length || !i.values.length) return;
	let o = a.skeleton;
	return (e) => {
		let t = 0;
		return o.replaceAll(/[#!]/g, (n) => {
			let r = i.values[t], o = a.values[t];
			return t += 1, Un(n === "!" ? o : r + (o - r) * e);
		});
	};
}
function zn(e, t = !1) {
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
function Bn(e) {
	let t = /* @__PURE__ */ new Map();
	return Vn(e).forEach((n, r) => {
		t.set(n, e[r]);
	}), t;
}
function Vn(e) {
	let t = /* @__PURE__ */ new Map();
	return e.map((e) => {
		let n = e.getAttribute("data-ts-key");
		if (n) return `key:${n}`;
		let r = t.get(e.localName) ?? 0;
		return t.set(e.localName, r + 1), `tag:${e.localName}:${r}`;
	});
}
function Hn(e) {
	if (typeof e == "function") return e;
	switch (e) {
		case "linear": return (e) => e;
		case "ease-in": return (e) => e * e;
		case "ease-in-out": return (e) => e < .5 ? 2 * e * e : 1 - (-2 * e + 2) ** 2 / 2;
		case "ease":
		case "ease-out": return (e) => 1 - (1 - e) ** 3;
	}
}
function Un(e) {
	return String(Math.round(e * 1e3) / 1e3);
}
//#endregion
//#region node_modules/@tanstack/charts/dist/svg-renderer.js
function Wn(e, t, n) {
	let r = t.idPrefix ?? "", i = t.className ? `ts-chart ${t.className}` : "ts-chart", a = t.ariaDescription ? `<desc>${tr(t.ariaDescription)}</desc>` : "", o = n?.renderDefinitions?.(e, r) ?? "", s = e.theme.background === "transparent" ? "" : Jn({
		kind: "rect",
		key: "background",
		x: 0,
		y: 0,
		width: e.width,
		height: e.height,
		style: { fill: e.theme.background }
	}, n, r);
	return `<svg class="${Q(i)}" width="100%" height="100%" viewBox="0 0 ${Z(e.width)} ${Z(e.height)}" role="img" aria-roledescription="chart" aria-label="${Q(t.ariaLabel)}" tabindex="${Z(t.tabIndex ?? 0)}" style="display:block;overflow:visible">${a}${o}${s}${Gn(e.nodes, r, n)}</svg>`;
}
function Gn(e, t = "", n) {
	return e.map((e) => Jn(e, n, t)).join("");
}
function Kn(e, t, n = "", r) {
	return `<g data-ts-key="focus-guide-layer:${t}" class="ts-chart__focus-guide-layer ts-chart__focus-guide-layer--${t}" data-ts-focus-layer="${t}" data-ts-focus-guide-layer="${t}" aria-hidden="true" visibility="${e.length ? "visible" : "hidden"}">${Gn(e, n, r ?? qn)}</g>`;
}
var qn = { renderGroup: Zn };
function Jn(e, t, n) {
	let r = $n(e, t, n);
	switch (e.kind) {
		case "group": {
			let i = e.translateX === void 0 && e.translateY === void 0 ? "" : ` transform="translate(${Z(e.translateX ?? 0)} ${Z(e.translateY ?? 0)})"`, a = t?.renderGroup?.(e, n);
			return `<g${r}${i}${e.focus ? ` data-ts-focus-layer="${e.focus.placement}"${e.focus.retarget ? " data-ts-focus-retarget=\"true\"" : ""} visibility="hidden"` : ""}${a?.attributes ?? ""}>${a?.content ?? ""}${e.children.map((e) => Jn(e, t, n)).join("")}</g>`;
		}
		case "rule": return `<line${r} x1="${Z(e.x1)}" y1="${Z(e.y1)}" x2="${Z(e.x2)}" y2="${Z(e.y2)}"/>`;
		case "polyline": return `<path${r} d="${e.path ?? e.points.map(([e, t], n) => `${n === 0 ? "M" : "L"}${Z(e)},${Z(t)}`).join("")}" vector-effect="non-scaling-stroke"/>`;
		case "area": return `<path${r} d="${e.polygons === void 0 ? e.path ?? Xn(e.points, !0) : Yn(e.polygons)}"${e.polygons === void 0 ? "" : " fill-rule=\"evenodd\""} vector-effect="non-scaling-stroke"/>`;
		case "dot": return `<circle${r} cx="${Z(e.x)}" cy="${Z(e.y)}" r="${Z(e.radius)}"/>`;
		case "rect": return `<rect${r} x="${Z(e.x)}" y="${Z(e.y)}" width="${Z(e.width)}" height="${Z(e.height)}"${e.radius === void 0 ? "" : ` rx="${Z(e.radius)}"`}/>`;
		case "label": {
			let t = e.rotate === void 0 ? "" : ` transform="rotate(${Z(e.rotate)} ${Z(e.x)} ${Z(e.y)})"`, n = e.anchor ? ` text-anchor="${e.anchor}"` : "", i = e.baseline ? ` dominant-baseline="${e.baseline}"` : "", a = e.fontSize === void 0 ? "" : ` font-size="${Z(e.fontSize)}"`, o = e.fontWeight === void 0 ? "" : ` font-weight="${Z(e.fontWeight)}"`;
			return `<text${r} x="${Z(e.x)}" y="${Z(e.y)}"${n}${i}${t}${a}${o} font-family="inherit">${tr(e.text)}</text>`;
		}
	}
}
function Yn(e) {
	return e.flatMap((e) => e).filter((e) => e.length > 0).map((e) => Xn(e, !0)).join("");
}
function Xn(e, t) {
	return `${e.map(([e, t], n) => `${n === 0 ? "M" : "L"}${Z(e)},${Z(t)}`).join("")}${t ? "Z" : ""}`;
}
function Zn(e, t) {
	if (!e.clip) return;
	let n = t.replaceAll(/[^a-zA-Z0-9_-]/g, ""), r = `${n ? `${n}-` : ""}ts-chart-clip-${Qn(e.key)}`;
	return {
		attributes: ` clip-path="url(#${r})"`,
		content: `<defs data-ts-key="${Q(`${e.key}:clip-defs`)}"><clipPath id="${r}"><rect x="${Z(e.clip.x)}" y="${Z(e.clip.y)}" width="${Z(e.clip.width)}" height="${Z(e.clip.height)}"/></clipPath></defs>`
	};
}
function Qn(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t = Math.imul(t ^ e.charCodeAt(n), 16777619);
	return (t >>> 0).toString(36);
}
function $n(e, t, n) {
	return `${` data-ts-key="${Q(e.key)}"`}${e.className ? ` class="${Q(e.className)}"` : ""}${e.ariaHidden ? " aria-hidden=\"true\"" : ""}${er(e.style, t, n)}`;
}
function er(e, t, n) {
	if (!e) return "";
	let r = (e) => e && t?.resolvePaint ? t.resolvePaint(e, n) : e;
	return [
		["fill", r(e.fill)],
		["fill-opacity", e.fillOpacity],
		["stroke", r(e.stroke)],
		["stroke-opacity", e.strokeOpacity],
		["stroke-width", e.strokeWidth],
		["opacity", e.opacity],
		["stroke-linecap", e.lineCap],
		["stroke-linejoin", e.lineJoin],
		["stroke-dasharray", e.strokeDasharray]
	].filter((e) => e[1] != null).map(([e, t]) => ` ${e}="${typeof t == "number" ? Z(t) : Q(t)}"`).join("");
}
function Z(e) {
	return String(Math.round(e * 100) / 100);
}
function tr(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function Q(e) {
	return tr(e).replaceAll("\"", "&quot;");
}
//#endregion
//#region node_modules/@tanstack/charts/dist/svg.js
function nr(e, t) {
	let n = new Set(e.gradients.map((e) => e.id));
	return Wn(e, t, {
		renderDefinitions: (e, t) => rr(e, or(t)),
		renderGroup: (e, t) => ir(e, or(t)),
		resolvePaint: (e, t) => {
			let r = /^url\(#([^)]+)\)$/.exec(e)?.[1];
			return r && n.has(r) ? `url(#${ar(or(t), r)})` : e;
		}
	});
}
function rr(e, t) {
	return e.gradients.length ? `<defs data-ts-key="gradients">${e.gradients.map((e) => `<linearGradient data-ts-key="gradient:${ur(e.id)}" id="${ur(ar(t, e.id))}" x1="${sr(e.x1 ?? 0)}" y1="${sr(e.y1 ?? 1)}" x2="${sr(e.x2 ?? 0)}" y2="${sr(e.y2 ?? 0)}">${e.stops.map((t, n) => `<stop data-ts-key="gradient:${ur(e.id)}:stop:${n}" offset="${sr(t.offset)}" stop-color="${ur(t.color)}"${t.opacity === void 0 ? "" : ` stop-opacity="${lr(t.opacity)}"`}/>`).join("")}</linearGradient>`).join("")}</defs>` : "";
}
function ir(e, t) {
	if (!e.clip) return;
	let n = ar(t, `ts-chart-clip-${cr(e.key)}`);
	return {
		attributes: ` clip-path="url(#${n})"`,
		content: `<defs data-ts-key="${ur(`${e.key}:clip-defs`)}"><clipPath id="${n}"><rect x="${lr(e.clip.x)}" y="${lr(e.clip.y)}" width="${lr(e.clip.width)}" height="${lr(e.clip.height)}"/></clipPath></defs>`
	};
}
function ar(e, t) {
	return e ? `${e}-${t}` : t;
}
function or(e) {
	return e.replaceAll(/[^a-zA-Z0-9_-]/g, "");
}
function sr(e) {
	return `${lr(Math.max(0, Math.min(1, e)) * 100)}%`;
}
function cr(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t = Math.imul(t ^ e.charCodeAt(n), 16777619);
	return (t >>> 0).toString(36);
}
function lr(e) {
	return String(Math.round(e * 100) / 100);
}
function ur(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}
//#endregion
//#region node_modules/@tanstack/charts/dist/scene-point-ownership-internal.js
function dr(e) {
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
function fr(e, t, n, r = t) {
	if (e.kind === "group") {
		let n = e.focusCandidateIndex;
		if (n !== void 0 && Number.isInteger(n) && n >= 0) {
			let e = t[n];
			if (e) return [e];
		}
	}
	if (e.pointOwner) {
		let n = mr(e.pointOwner, t);
		if (n.length) return n;
	}
	if ("interaction" in e && e.interaction) {
		let n = (e.interaction.point ? [e.interaction.point] : e.interaction.points).flatMap((e) => mr(e, t));
		if (n.length) return n;
	}
	return pr(e.key, t, n, r);
}
function pr(e, t, n, r = t) {
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
function mr(e, t) {
	let n = t.filter((t) => t === e);
	if (n.length) return n;
	let r = t.filter((t) => t.key === e.key);
	if (r.length) return r;
	let i = t.filter((t) => Object.is(t.datum, e.datum) && (hr(e.datum) || t.datumIndex === e.datumIndex));
	return i.length === 1 ? i : [];
}
function hr(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
//#endregion
//#region node_modules/@tanstack/charts/dist/focus-layer.js
var gr = [];
function _r(e, t, n, r) {
	let i = [], a = [];
	if (!r && !t) return {
		under: i,
		over: a
	};
	for (let o of e.focusGuides ?? []) {
		let s = t && Nr(o, t) ? t : null;
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
function vr(e, t) {
	if (!t) return {
		scene: e,
		retargeted: !1
	};
	let n = !1, r = (e) => e.map((e) => {
		if (e.kind !== "group") return e;
		if (e.focus?.retarget) {
			let r = e.focus.points.filter((n) => Dr(n, t, e.focus.match)), i = dr(e.focus.points), a = wr(Cr(e.focus.candidates ?? e.children, r, e.focus.points, i), r, e.focus.points, i, e.key);
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
function yr(e, t) {
	if (!e.focus || !t) return /* @__PURE__ */ new Set();
	let n = /* @__PURE__ */ new Set();
	return Mr(br(e, t), (e) => n.add(e.key)), n;
}
function br(e, t) {
	let n = e.focus;
	if (n.retarget) return e.children;
	if (n.anchors) {
		let r = n.anchors.filter((e) => Dr(e, t, n.match));
		return Sr(e.children, r);
	}
	let r = n.points.filter((e) => Dr(e, t, n.match));
	return xr(e.children, r, n.points);
}
function xr(e, t, n) {
	return Cr(e, t, n, dr(n));
}
function Sr(e, t) {
	let n = [];
	for (let r of e) {
		if (r.kind !== "group") {
			t.some((e) => kr(r.key, e.key)) && n.push(r);
			continue;
		}
		let e = Sr(r.children, t);
		e.length ? n.push({
			...r,
			children: e
		}) : t.some((e) => e.key.startsWith(`${r.key}:`)) && n.push(r);
	}
	return n;
}
function Cr(e, t, n, r) {
	let i = [];
	for (let a of e) {
		if (a.kind !== "group") {
			fr(a, n, r, gr).some((e) => t.includes(e)) && i.push(a);
			continue;
		}
		let e = Er(a, n);
		if (e) {
			t.includes(e) && i.push(a);
			continue;
		}
		let o = Tr(a, n, r);
		if (o.length) {
			o.some((e) => t.includes(e)) && i.push(a);
			continue;
		}
		let s = fr(a, n, r, gr), c = s.length ? s : n, l = Cr(a.children, t, c, r);
		l.length && i.push({
			...a,
			children: l
		});
	}
	return i;
}
function wr(e, t, n, r, i) {
	let a = new Map(t.map((e, t) => [e, t])), o = (e, t) => {
		let s = fr(e, n, r, gr).filter((e) => a.has(e)), c = s.length === 1 ? s[0] : void 0, l = e.key;
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
function Tr(e, t, n) {
	let r = Er(e, t);
	if (r) return [r];
	if (e.pointOwner) {
		let r = fr(e, t, n, gr);
		if (r.length) return r;
	}
	let i = n.keys.get(e.key)?.filter((t) => t.key === e.key);
	return i === void 0 ? gr : i.filter((e) => t.includes(e));
}
function Er(e, t) {
	let n = e.focusCandidateIndex;
	if (!(n === void 0 || !Number.isInteger(n) || n < 0)) return t[n];
}
function Dr(e, t, n) {
	return n === "x" ? e.xValue !== void 0 && Ar(e.xValue, t.primary.xValue) : n === "y" ? e.yValue !== void 0 && Ar(e.yValue, t.primary.yValue) : n === "series" ? Ar(e.group, t.primary.group) : n === "key" ? e.key === t.primary.key || e.datum === t.primary.datum : n === "group" ? t.group.some((t) => Or(e, t)) : Or(e, t.primary);
}
function Or(e, t) {
	return e === t || e.key === t.key ? !0 : Object.is(e.datum, t.datum) ? jr(e.datum) || e.datumIndex === t.datumIndex : !1;
}
function kr(e, t) {
	return e === t || e.startsWith(`${t}:`) || t.startsWith(`${e}:`);
}
function Ar(e, t) {
	return M(e) === M(t);
}
function jr(e) {
	return typeof e == "object" && !!e || typeof e == "function";
}
function Mr(e, t) {
	for (let n of e) t(n), n.kind === "group" && Mr(n.children, t);
}
function Nr(e, t) {
	return e.scope === void 0 || t.primary.key === e.scope || t.primary.key.startsWith(`${e.scope}:`);
}
//#endregion
//#region node_modules/@tanstack/charts/dist/svg-focus-guide-serializer.js
function Pr(e, t, n, r, i, a) {
	let o = e.ownerDocument, s = `focus-guide-layer:${r}`, c = {
		kind: "group",
		key: s,
		className: `ts-chart__focus-guide-layer ts-chart__focus-guide-layer--${r}`,
		ariaHidden: !0,
		children: n
	}, l = Br(o, a({
		...t,
		nodes: [c],
		focusGuides: void 0
	}, i)), u = l ? Hr(l, s) : void 0;
	if (!l || !u || u.localName !== "g") throw Error(`The SVG renderer must preserve a g[data-ts-key="${s}"] element when serializing focus guides.`);
	return u.classList.add("ts-chart__focus-guide-layer", `ts-chart__focus-guide-layer--${r}`), u.setAttribute("data-ts-focus-layer", r), u.setAttribute("data-ts-focus-guide-layer", r), u.setAttribute("aria-hidden", "true"), u.setAttribute("visibility", n.length ? "visible" : "hidden"), Fr(o, u, n, r, i.idPrefix ?? ""), Ir(e, l, u, s), u.outerHTML;
}
function Fr(e, t, n, r, i) {
	let a = Vr(e, Kn(n, r, i));
	if (a) for (let e of Ur(a)) {
		let n = e.getAttribute("clip-path"), r = e.getAttribute("data-ts-key");
		if (!n || !r) continue;
		let i = Hr(t, r);
		if (!i || i.hasAttribute("clip-path")) continue;
		i.setAttribute("clip-path", n);
		let o = Hr(a, `${r}:clip-defs`);
		o && i.insertBefore(o.cloneNode(!0), i.firstChild);
	}
}
function Ir(e, t, n, r) {
	let i = [...Rr(n)], a = /* @__PURE__ */ new Set(), o;
	for (; i.length;) {
		let s = i.shift();
		if (!s || a.has(s) || (a.add(s), zr(n, s) || Lr(e, s))) continue;
		let c = zr(t, s);
		if (!c) continue;
		o || (o = e.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "defs"), o.setAttribute("data-ts-key", `${r}:renderer-defs`), n.insertBefore(o, n.firstChild));
		let l = c.cloneNode(!0);
		o.append(l), i.push(...Rr(l));
	}
}
function Lr(e, t) {
	let n = zr(e, t);
	return n?.closest("[data-ts-focus-guide-layer]") ? void 0 : n;
}
function Rr(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of [e, ...e.querySelectorAll("*")]) for (let e of n.attributes) {
		for (let n of e.value.matchAll(/url\(#([^)]+)\)/g)) n[1] && t.add(n[1]);
		(e.localName === "href" || e.name === "xlink:href") && e.value.startsWith("#") && t.add(e.value.slice(1));
	}
	return t;
}
function zr(e, t) {
	return [...e.getAttribute("id") === t ? [e] : [], ...e.querySelectorAll("[id]")].find((e) => e.getAttribute("id") === t);
}
function Br(e, t) {
	let n = e.createElement("template");
	n.innerHTML = t.trim();
	let r = n.content.firstElementChild;
	return r?.localName === "svg" ? r : void 0;
}
function Vr(e, t) {
	let n = e.createElement("template");
	return n.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg">${t}</svg>`, n.content.firstElementChild?.firstElementChild ?? void 0;
}
function Hr(e, t) {
	return Ur(e).find((e) => e.getAttribute("data-ts-key") === t);
}
function Ur(e) {
	return [...e.hasAttribute("data-ts-key") ? [e] : [], ...e.querySelectorAll("[data-ts-key]")];
}
//#endregion
//#region node_modules/@tanstack/charts/dist/svg-focus-guide-layer.js
function Wr(e) {
	let t = {};
	if (!e) return t;
	for (let n of ["under", "over"]) {
		let r = Yr(e, n);
		r && (t[n] = r, r.remove());
	}
	return t;
}
function Gr(e, t, n = () => !0) {
	for (let r of ["under", "over"]) {
		let i = t[r];
		i && n(r) && Jr(e, i, r);
	}
}
function Kr(e, t) {
	let n = Yr(e, t);
	if (n) return n;
	let r = e.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "g");
	return r.dataset.tsKey = `focus-guide-layer:${t}`, r.dataset.tsFocusLayer = t, r.dataset.tsFocusGuideLayer = t, r.setAttribute("class", `ts-chart__focus-guide-layer ts-chart__focus-guide-layer--${t}`), r.setAttribute("aria-hidden", "true"), r.setAttribute("visibility", "hidden"), Jr(e, r, t), r;
}
function qr(e, t) {
	Yr(e, t)?.remove();
}
function Jr(e, t, n) {
	if (n === "under") {
		let n = [...e.children].find((e) => e.getAttribute("data-ts-key") === "grid" || e.getAttribute("data-ts-key") === "marks" || e.classList.contains("ts-chart__grid") || e.classList.contains("ts-chart__marks"));
		e.insertBefore(t, n ?? null);
	} else e.append(t);
}
function Yr(e, t) {
	return [...e.children].find((e) => e.localName === "g" && e.getAttribute("data-ts-focus-guide-layer") === t);
}
//#endregion
//#region node_modules/@tanstack/charts/dist/mark-state.js
function Xr(e, t, n = null) {
	if (!t || !Zr(e.nodes)) return { scene: e };
	let r, i = {}, a = (e, o, s, c, l) => e.map((e) => {
		let u = e.kind === "group" ? e.states : void 0, d = u?.points ?? o, f = u?.definitions ?? s, p = u?.data ?? c, m = u ? dr(u.points) : l, h = d ? m ? fr(e, d, m) : d : ri, g = e.kind !== "group" && f && p && h.length ? Qr(e, h, p, f, t, n) : { node: e };
		if (g.transition) {
			r = ii(r, g.transition);
			for (let e of h) i[e.markId] = ii(i[e.markId], g.transition);
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
function Zr(e) {
	return e.some((e) => e.kind === "group" && (e.states !== void 0 || Zr(e.children)));
}
function Qr(e, t, n, r, i, a) {
	let o = e, s;
	for (let e of r) {
		let r = $r(t, n, e, i, a);
		r && (o = ti(o, e.style, r), e.transition && (s = ii(s, e.transition)));
	}
	return {
		node: o,
		transition: s
	};
}
function $r(e, t, n, r, i) {
	if (!(typeof n.when != "function" && n.when.focus === "unmatched" && e.some((e) => Dr(e, r, "group")))) for (let a of e) {
		let e = {
			datum: a.datum,
			index: a.datumIndex,
			data: t,
			point: a,
			focus: r,
			pointer: i,
			matches: (e) => Dr(a, r, e)
		};
		if (typeof n.when == "function" ? n.when(e) : ei(n.when, e)) return e;
	}
}
function ei(e, t) {
	let n = e.source;
	return n !== void 0 && !(Array.isArray(n) ? n.includes(t.focus.source) : n === t.focus.source) || e.pinned !== void 0 && e.pinned !== t.focus.pinned ? !1 : e.focus === "unmatched" ? !t.matches("group") : t.matches(e.focus);
}
function ti(e, t, n) {
	let r = { ...e.style };
	for (let e of ni) {
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
			let n = t - e, r = i.insetAxis === "y" ? 0 : n, s = i.insetAxis === "x" ? 0 : n;
			i = {
				...i,
				x: i.x + r + a,
				y: i.y + s + o,
				width: Math.max(0, i.width - r * 2),
				height: Math.max(0, i.height - s * 2),
				radius: c ?? i.radius,
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
var ni = [
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
var ri = [];
function ii(e, t) {
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
function ai(e, t) {
	if (!e || e.type !== "tween" || (e.respectReducedMotion ?? !0) && t.ownerDocument.defaultView?.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
	let { type: n, ...r } = e;
	return r;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/svg-coordinates.js
function oi(e, t, n, r) {
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
function si(e = nr) {
	let t = {
		id: "svg",
		prerender: e,
		mount(n) {
			let r = () => {}, i = () => {}, a, o, s, c = !1, l = !1, u = () => {
				let e = n.querySelector("svg.ts-chart");
				if (!e) throw Error("The SVG renderer must produce an svg.ts-chart root element.");
				return e;
			};
			return {
				renderer: t,
				get element() {
					return u();
				},
				render(t, d) {
					let f = !!(a && at(a, t));
					r(), i(), i = () => {};
					let p = !!a?.focusGuides?.length, m = p ? Wr(u()) : {};
					r = An(n, e(t, d), f ? void 0 : d.animation), p && Gr(u(), m, (e) => t.focusGuides?.some((t) => t.placement === e) === !0), a = t, o = d, s = void 0, c = !1, l = !1;
				},
				clientToScene(e, t, n) {
					return oi(u(), e, t, n);
				},
				paintFocus(t, d, f) {
					if (!a || !o) return;
					let p = Xr(a, t, d), m = vr(p.scene, t), h = s;
					if (m.scene !== a || c || l || h) {
						i(), i = () => {};
						let t = Wr(u());
						r(), r = An(n, e(m.scene, o), ai(p.transition ?? h, n)), Gr(u(), t);
					}
					return l = m.retargeted, c = !!(t && p.scene !== a), s = t ? p.transition ?? h : void 0, ci(u(), m.scene, t), i(), i = li(u(), m.scene, t, d, f, o, e), m.scene;
				},
				destroy() {
					r(), i();
				}
			};
		}
	};
	return t;
}
function ci(e, t, n) {
	let r = ui(t.nodes);
	e.querySelectorAll("[data-ts-focus-layer]:not([data-ts-focus-guide-layer])").forEach((e, t) => {
		let i = r[t], a = i ? yr(i, n) : /* @__PURE__ */ new Set();
		e.setAttribute("visibility", n && a.size ? "visible" : "hidden"), e.querySelectorAll("[data-ts-key]").forEach((e) => {
			let t = e.dataset.tsKey;
			e.setAttribute("visibility", t && a.has(t) ? "visible" : "hidden");
		});
	});
}
function li(e, t, n, r, i, a, o) {
	let s = _r(t, n, r, i), c = [];
	for (let n of ["under", "over"]) {
		if (!t.focusGuides?.some((e) => e.placement === n)) {
			qr(e, n);
			continue;
		}
		let r = Kr(e, n), i = s[n];
		if (!i.length) {
			r.setAttribute("visibility", "hidden");
			continue;
		}
		let l = o === nr ? Kn(i, n, a.idPrefix ?? "") : Pr(e, t, i, n, a, o);
		c.push(jn(r, l));
	}
	return () => c.forEach((e) => e());
}
function ui(e) {
	let t = [];
	for (let n of e) n.kind === "group" && (n.focus ? t.push(n) : t.push(...ui(n.children)));
	return t;
}
//#endregion
//#region node_modules/@tanstack/charts/dist/dom.js
function di(e, t, n = Kt()) {
	let r = t.renderSvg ?? nr, i = si(r), a = (t) => {
		let n = t.renderSvg ?? nr;
		n !== r && (r = n, i = si(r));
		let { renderSvg: a, onRender: o, ...s } = t;
		return {
			...s,
			renderer: i,
			onRender: o ? ({ container: t, scene: n, surface: r, interaction: i }) => {
				let a = r.element, s = e.ownerDocument.defaultView?.SVGSVGElement;
				if (!s || !(a instanceof s)) throw TypeError("Expected the SVG chart surface.");
				o({
					container: t,
					scene: n,
					svg: a,
					interaction: i
				});
			} : void 0
		};
	}, o = bn(e, a(t), n);
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
//#region node_modules/@tanstack/charts/dist/bar.js
function fi(e, t = {}) {
	let n = Array.isArray(e) ? e : Array.from(e);
	return ne(({ markIndex: e }) => {
		let r = t.id ?? `bar-y-${e}`, i = F(n, t.x, (e, { index: t }) => t), a = _i(n, t.y ?? t.y2, (e) => typeof e == "number" ? e : void 0), o = F(n, t.z, () => null), s = t.color === void 0 ? o : F(n, t.color, () => null), c = t.z === void 0 && t.color !== void 0 ? s : o, l = t.y1 !== void 0 || t.y2 !== void 0;
		if (l && t.layout?.type === "stack") throw TypeError("A bar with explicit y1 or y2 endpoints cannot also configure a stack layout");
		let u = t.layout?.type === "group", d = t.layout?.type === "stack" ? t.layout : {}, f = !l && !u ? ue(i, a, c, d, "index") : void 0, p = l ? _i(n, t.y1, () => 0) : f?.starts ?? n.map(() => 0), m = l ? _i(n, t.y2 ?? t.y, () => void 0) : u ? a : f.ends, h = hi(i), g = u || !l && h ? c : o, _ = I(n, t.key, {
			groups: g,
			candidates: [i],
			markId: r,
			warningIdentity: t
		});
		return {
			id: r,
			states: P(n, t.states),
			seriesFromColor: t.z === void 0 && t.color !== void 0 && (u || h),
			channels: {
				x: {
					scale: "x",
					values: i.filter(te)
				},
				y: {
					scale: "y",
					values: [...m.filter(N), ...p.filter(N)],
					includeZero: t.y1 === void 0
				},
				color: {
					scale: "color",
					values: s.filter(E)
				}
			},
			render: ({ scales: e, chart: o, color: c }) => {
				let l = e.x.bandwidth || gi(e.x, i, o.width, n.length), u = mi(t.layout?.type === "group" ? t.layout : void 0, g, l), d = u?.bandwidth ?? l, f = pi(d, t.inset, t.maxThickness), h = [];
				return n.forEach((o, v) => {
					let y = i[v], b = a[v], x = p[v], S = m[v];
					if (!te(y) || !N(b) || !N(x) || !N(S)) return;
					let C = g[v] ?? null, w = u?.map(C) ?? 0, T = c(s[v]), E = ie(t.fill, o, v, n, T), D = ie(t.stroke, o, v, n, "none"), O = ie(t.strokeDasharray, o, v, n, "none"), k = e.x.map(y), A = e.y.map(x), j = e.y.map(S), ee = k - l / 2 + w + f.inset, ne = Math.min(A, j), re = f.size, P = Math.abs(A - j), F = `${r}:${M(C)}:${M(_[v])}`, I = {
						key: F,
						markId: r,
						group: C,
						groupLabel: C == null ? r : String(C),
						datum: o,
						datumIndex: v,
						xValue: y,
						yValue: b,
						y1Value: x,
						y2Value: S,
						yInterval: "difference",
						x: k - l / 2 + w + d / 2,
						y: j,
						color: E
					};
					h.push({
						kind: "rect",
						key: F,
						x: ee,
						y: ne,
						width: re,
						height: P,
						radius: t.radius,
						inset: f.inset,
						insetAxis: "x",
						...f.maximum === void 0 ? {} : { maxThickness: f.maximum },
						interaction: {
							point: I,
							affinity: "x"
						},
						style: {
							fill: E,
							fillOpacity: t.fillOpacity,
							stroke: D,
							strokeOpacity: t.strokeOpacity,
							strokeWidth: t.strokeWidth,
							strokeDasharray: O
						}
					});
				}), { nodes: [{
					kind: "group",
					key: r,
					className: "ts-chart__bar ts-chart__bar-y",
					ariaHidden: !0,
					children: h
				}] };
			}
		};
	}, t.motion);
}
function pi(e, t, n) {
	let r = Math.max(0, t ?? 0), i = Math.max(0, e), a = Math.max(0, i - r * 2), o = Number.isFinite(n), s = o ? Math.max(0, n) : a, c = Math.min(a, s);
	return {
		inset: (i - c) / 2,
		maximum: o ? s : void 0,
		size: c
	};
}
function mi(e, n, r) {
	if (!e) return;
	let i = v(e.scale ?? (() => t().padding(Number.isFinite(e.padding) ? Math.max(0, e.padding) : .1)), { values: n });
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
function hi(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		if (!te(n)) continue;
		let e = M(n);
		if (t.has(e)) return !0;
		t.add(e);
	}
	return !1;
}
function gi(e, t, n, r) {
	let i = [...new Set(t.filter(te).map(e.map).filter((e) => Number.isFinite(e)))].sort((e, t) => e - t), a = Infinity;
	for (let e = 1; e < i.length; e += 1) a = Math.min(a, i[e] - i[e - 1]);
	return Number.isFinite(a) ? a * .8 : Math.min(48, n / Math.max(2, r + 1) * .8);
}
function _i(e, t, n) {
	return typeof t == "number" ? e.map(() => t) : F(e, t, n);
}
//#endregion
//#region src/tanStackCharts.ts
function vi(n, r) {
	let i = {
		ariaLabel: "Bar chart",
		definition: lt({
			marks: [fi(yi(n), {
				color: "seriesName",
				fill: "seriesName",
				layout: _(),
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
	}, a = di(r, i);
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
function yi(e) {
	let t = [];
	for (let n of e.series) for (let [r, i] of e.categories.entries()) t.push({
		category: i,
		seriesName: n.name,
		value: n.values[r] ?? 0
	});
	return t;
}
//#endregion
export { vi as renderTanStackCharts };
