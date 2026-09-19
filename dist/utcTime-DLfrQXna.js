import { a as e, c as t, d as n, h as r, i, m as a, n as o, o as s, r as c, y as l } from "./linear-q6e-7JBm.js";
import "./src-kLpf-6r0.js";
//#region node_modules/d3-brush/src/brush.js
var { abs: u, max: d, min: f } = Math;
["w", "e"].map(p), ["n", "s"].map(p), [
	"n",
	"w",
	"e",
	"s",
	"nw",
	"ne",
	"sw",
	"se"
].map(p);
function p(e) {
	return { type: e };
}
function m(e) {
	var t = e.__brush;
	return t ? t.dim.output(t.selection) : null;
}
//#endregion
//#region node_modules/d3-scale/src/nice.js
function h(e, t) {
	e = e.slice();
	var n = 0, r = e.length - 1, i = e[n], a = e[r], o;
	return a < i && (o = n, n = r, r = o, o = i, i = a, a = o), e[n] = t.floor(i), e[r] = t.ceil(a), e;
}
//#endregion
//#region node_modules/d3-scale/src/log.js
function ee(e) {
	return Math.log(e);
}
function te(e) {
	return Math.exp(e);
}
function ne(e) {
	return -Math.log(-e);
}
function g(e) {
	return -Math.exp(-e);
}
function _(e) {
	return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function re(e) {
	return e === 10 ? _ : e === Math.E ? Math.exp : (t) => e ** +t;
}
function v(e) {
	return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function y(e) {
	return (t, n) => -e(-t, n);
}
function b(e) {
	let t = e(ee, te), n = t.domain, a = 10, o, s;
	function l() {
		return o = v(a), s = re(a), n()[0] < 0 ? (o = y(o), s = y(s), e(ne, g)) : e(ee, te), t;
	}
	return t.base = function(e) {
		return arguments.length ? (a = +e, l()) : a;
	}, t.domain = function(e) {
		return arguments.length ? (n(e), l()) : n();
	}, t.ticks = (e) => {
		let t = n(), i = t[0], c = t[t.length - 1], l = c < i;
		l && ([i, c] = [c, i]);
		let u = o(i), d = o(c), f, p, m = e == null ? 10 : +e, h = [];
		if (!(a % 1) && d - u < m) {
			if (u = Math.floor(u), d = Math.ceil(d), i > 0) {
				for (; u <= d; ++u) for (f = 1; f < a; ++f) if (p = u < 0 ? f / s(-u) : f * s(u), !(p < i)) {
					if (p > c) break;
					h.push(p);
				}
			} else for (; u <= d; ++u) for (f = a - 1; f >= 1; --f) if (p = u > 0 ? f / s(-u) : f * s(u), !(p < i)) {
				if (p > c) break;
				h.push(p);
			}
			h.length * 2 < m && (h = r(i, c, m));
		} else h = r(u, d, Math.min(d - u, m)).map(s);
		return l ? h.reverse() : h;
	}, t.tickFormat = (e, n) => {
		if (e ??= 10, n ??= a === 10 ? "s" : ",", typeof n != "function" && (!(a % 1) && (n = i(n)).precision == null && (n.trim = !0), n = c(n)), e === Infinity) return n;
		let r = Math.max(1, a * e / t.ticks().length);
		return (e) => {
			let t = e / s(Math.round(o(e)));
			return t * a < a - .5 && (t *= a), t <= r ? n(e) : "";
		};
	}, t.nice = () => n(h(n(), {
		floor: (e) => s(Math.floor(o(e))),
		ceil: (e) => s(Math.ceil(o(e)))
	})), t;
}
function ie() {
	let e = b(t()).domain([1, 10]);
	return e.copy = () => s(e, ie()).base(e.base()), n.apply(e, arguments), e;
}
//#endregion
//#region node_modules/d3-scale/src/symlog.js
function ae(e) {
	return function(t) {
		return Math.sign(t) * Math.log1p(Math.abs(t / e));
	};
}
function oe(e) {
	return function(t) {
		return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
	};
}
function se(e) {
	var t = 1, n = e(ae(t), oe(t));
	return n.constant = function(n) {
		return arguments.length ? e(ae(t = +n), oe(t)) : t;
	}, o(n);
}
function ce() {
	var e = se(t());
	return e.copy = function() {
		return s(e, ce()).constant(e.constant());
	}, n.apply(e, arguments);
}
//#endregion
//#region node_modules/d3-time/src/interval.js
var x = /* @__PURE__ */ new Date(), S = /* @__PURE__ */ new Date();
function C(e, t, n, r) {
	function i(t) {
		return e(t = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+t)), t;
	}
	return i.floor = (t) => (e(t = /* @__PURE__ */ new Date(+t)), t), i.ceil = (n) => (e(n = /* @__PURE__ */ new Date(n - 1)), t(n, 1), e(n), n), i.round = (e) => {
		let t = i(e), n = i.ceil(e);
		return e - t < n - e ? t : n;
	}, i.offset = (e, n) => (t(e = /* @__PURE__ */ new Date(+e), n == null ? 1 : Math.floor(n)), e), i.range = (n, r, a) => {
		let o = [];
		if (n = i.ceil(n), a = a == null ? 1 : Math.floor(a), !(n < r) || !(a > 0)) return o;
		let s;
		do
			o.push(s = /* @__PURE__ */ new Date(+n)), t(n, a), e(n);
		while (s < n && n < r);
		return o;
	}, i.filter = (n) => C((t) => {
		if (t >= t) for (; e(t), !n(t);) t.setTime(t - 1);
	}, (e, r) => {
		if (e >= e) {
			if (r < 0) for (; ++r <= 0;) for (; t(e, -1), !n(e););
			else for (; --r >= 0;) for (; t(e, 1), !n(e););
		}
	}), n && (i.count = (t, r) => (x.setTime(+t), S.setTime(+r), e(x), e(S), Math.floor(n(x, S))), i.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? i.filter(r ? (t) => r(t) % e === 0 : (t) => i.count(0, t) % e === 0) : i)), i;
}
//#endregion
//#region node_modules/d3-time/src/millisecond.js
var w = C(() => {}, (e, t) => {
	e.setTime(+e + t);
}, (e, t) => t - e);
w.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? C((t) => {
	t.setTime(Math.floor(t / e) * e);
}, (t, n) => {
	t.setTime(+t + n * e);
}, (t, n) => (n - t) / e) : w), w.range;
//#endregion
//#region node_modules/d3-time/src/duration.js
var T = 1e3, E = T * 60, D = E * 60, O = D * 24, k = O * 7, le = O * 30, A = O * 365, j = C((e) => {
	e.setTime(e - e.getMilliseconds());
}, (e, t) => {
	e.setTime(+e + t * T);
}, (e, t) => (t - e) / T, (e) => e.getUTCSeconds());
j.range;
//#endregion
//#region node_modules/d3-time/src/minute.js
var M = C((e) => {
	e.setTime(e - e.getMilliseconds() - e.getSeconds() * T);
}, (e, t) => {
	e.setTime(+e + t * E);
}, (e, t) => (t - e) / E, (e) => e.getMinutes());
M.range;
var N = C((e) => {
	e.setUTCSeconds(0, 0);
}, (e, t) => {
	e.setTime(+e + t * E);
}, (e, t) => (t - e) / E, (e) => e.getUTCMinutes());
N.range;
//#endregion
//#region node_modules/d3-time/src/hour.js
var P = C((e) => {
	e.setTime(e - e.getMilliseconds() - e.getSeconds() * T - e.getMinutes() * E);
}, (e, t) => {
	e.setTime(+e + t * D);
}, (e, t) => (t - e) / D, (e) => e.getHours());
P.range;
var F = C((e) => {
	e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
	e.setTime(+e + t * D);
}, (e, t) => (t - e) / D, (e) => e.getUTCHours());
F.range;
//#endregion
//#region node_modules/d3-time/src/day.js
var I = C((e) => e.setHours(0, 0, 0, 0), (e, t) => e.setDate(e.getDate() + t), (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * E) / O, (e) => e.getDate() - 1);
I.range;
var ue = C((e) => {
	e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / O, (e) => e.getUTCDate() - 1);
ue.range;
var de = C((e) => {
	e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / O, (e) => Math.floor(e / O));
de.range;
//#endregion
//#region node_modules/d3-time/src/week.js
function L(e) {
	return C((t) => {
		t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
	}, (e, t) => {
		e.setDate(e.getDate() + t * 7);
	}, (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * E) / k);
}
var R = L(0), z = L(1), fe = L(2), pe = L(3), B = L(4), me = L(5), he = L(6);
R.range, z.range, fe.range, pe.range, B.range, me.range, he.range;
function V(e) {
	return C((t) => {
		t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
	}, (e, t) => {
		e.setUTCDate(e.getUTCDate() + t * 7);
	}, (e, t) => (t - e) / k);
}
var H = V(0), U = V(1), ge = V(2), _e = V(3), W = V(4), ve = V(5), ye = V(6);
H.range, U.range, ge.range, _e.range, W.range, ve.range, ye.range;
//#endregion
//#region node_modules/d3-time/src/month.js
var G = C((e) => {
	e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
	e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
G.range;
var be = C((e) => {
	e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
be.range;
//#endregion
//#region node_modules/d3-time/src/year.js
var K = C((e) => {
	e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
	e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
K.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : C((t) => {
	t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, n) => {
	t.setFullYear(t.getFullYear() + n * e);
}), K.range;
var q = C((e) => {
	e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
q.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : C((t) => {
	t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, n) => {
	t.setUTCFullYear(t.getUTCFullYear() + n * e);
}), q.range;
//#endregion
//#region node_modules/d3-time/src/ticks.js
function xe(e, t, n, r, i, o) {
	let s = [
		[
			j,
			1,
			T
		],
		[
			j,
			5,
			5 * T
		],
		[
			j,
			15,
			15 * T
		],
		[
			j,
			30,
			30 * T
		],
		[
			o,
			1,
			E
		],
		[
			o,
			5,
			5 * E
		],
		[
			o,
			15,
			15 * E
		],
		[
			o,
			30,
			30 * E
		],
		[
			i,
			1,
			D
		],
		[
			i,
			3,
			3 * D
		],
		[
			i,
			6,
			6 * D
		],
		[
			i,
			12,
			12 * D
		],
		[
			r,
			1,
			O
		],
		[
			r,
			2,
			2 * O
		],
		[
			n,
			1,
			k
		],
		[
			t,
			1,
			le
		],
		[
			t,
			3,
			3 * le
		],
		[
			e,
			1,
			A
		]
	];
	function c(e, t, n) {
		let r = t < e;
		r && ([e, t] = [t, e]);
		let i = n && typeof n.range == "function" ? n : u(e, t, n), a = i ? i.range(e, +t + 1) : [];
		return r ? a.reverse() : a;
	}
	function u(t, n, r) {
		let i = Math.abs(n - t) / r, o = l(([, , e]) => e).right(s, i);
		if (o === s.length) return e.every(a(t / A, n / A, r));
		if (o === 0) return w.every(Math.max(a(t, n, r), 1));
		let [c, u] = s[i / s[o - 1][2] < s[o][2] / i ? o - 1 : o];
		return c.every(u);
	}
	return [c, u];
}
var [Se, Ce] = xe(q, be, H, de, F, N), [we, Te] = xe(K, G, R, I, P, M);
//#endregion
//#region node_modules/d3-time-format/src/locale.js
function Ee(e) {
	if (0 <= e.y && e.y < 100) {
		var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
		return t.setFullYear(e.y), t;
	}
	return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function De(e) {
	if (0 <= e.y && e.y < 100) {
		var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
		return t.setUTCFullYear(e.y), t;
	}
	return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function J(e, t, n) {
	return {
		y: e,
		m: t,
		d: n,
		H: 0,
		M: 0,
		S: 0,
		L: 0
	};
}
function Oe(e) {
	var t = e.dateTime, n = e.date, r = e.time, i = e.periods, a = e.days, o = e.shortDays, s = e.months, c = e.shortMonths, l = Z(i), u = Q(i), d = Z(a), f = Q(a), p = Z(o), m = Q(o), h = Z(s), ee = Q(s), te = Z(c), ne = Q(c), g = {
		a: w,
		A: T,
		b: E,
		B: D,
		c: null,
		d: $e,
		e: $e,
		f: it,
		g: ht,
		G: _t,
		H: et,
		I: tt,
		j: nt,
		L: rt,
		m: at,
		M: ot,
		p: O,
		q: k,
		Q: Bt,
		s: Vt,
		S: st,
		u: ct,
		U: lt,
		V: dt,
		w: ft,
		W: pt,
		x: null,
		X: null,
		y: mt,
		Y: gt,
		Z: vt,
		"%": zt
	}, _ = {
		a: le,
		A,
		b: j,
		B: M,
		c: null,
		d: yt,
		e: yt,
		f: wt,
		g: Ft,
		G: Lt,
		H: bt,
		I: xt,
		j: St,
		L: Ct,
		m: Tt,
		M: Et,
		p: N,
		q: P,
		Q: Bt,
		s: Vt,
		S: Dt,
		u: Ot,
		U: kt,
		V: jt,
		w: Mt,
		W: Nt,
		x: null,
		X: null,
		y: Pt,
		Y: It,
		Z: Rt,
		"%": zt
	}, re = {
		a: ae,
		A: oe,
		b: se,
		B: ce,
		c: x,
		d: Ue,
		e: Ue,
		f: Ye,
		g: ze,
		G: Re,
		H: Ge,
		I: Ge,
		j: We,
		L: Je,
		m: He,
		M: Ke,
		p: ie,
		q: Ve,
		Q: Ze,
		s: Qe,
		S: qe,
		u: Pe,
		U: Fe,
		V: Ie,
		w: Ne,
		W: Le,
		x: S,
		X: C,
		y: ze,
		Y: Re,
		Z: Be,
		"%": Xe
	};
	g.x = v(n, g), g.X = v(r, g), g.c = v(t, g), _.x = v(n, _), _.X = v(r, _), _.c = v(t, _);
	function v(e, t) {
		return function(n) {
			var r = [], i = -1, a = 0, o = e.length, s, c, l;
			for (n instanceof Date || (n = /* @__PURE__ */ new Date(+n)); ++i < o;) e.charCodeAt(i) === 37 && (r.push(e.slice(a, i)), (c = ke[s = e.charAt(++i)]) == null ? c = s === "e" ? " " : "0" : s = e.charAt(++i), (l = t[s]) && (s = l(n, c)), r.push(s), a = i + 1);
			return r.push(e.slice(a, i)), r.join("");
		};
	}
	function y(e, t) {
		return function(n) {
			var r = J(1900, void 0, 1), i = b(r, e, n += "", 0), a, o;
			if (i != n.length) return null;
			if ("Q" in r) return new Date(r.Q);
			if ("s" in r) return new Date(r.s * 1e3 + ("L" in r ? r.L : 0));
			if (t && !("Z" in r) && (r.Z = 0), "p" in r && (r.H = r.H % 12 + r.p * 12), r.m === void 0 && (r.m = "q" in r ? r.q : 0), "V" in r) {
				if (r.V < 1 || r.V > 53) return null;
				"w" in r || (r.w = 1), "Z" in r ? (a = De(J(r.y, 0, 1)), o = a.getUTCDay(), a = o > 4 || o === 0 ? U.ceil(a) : U(a), a = ue.offset(a, (r.V - 1) * 7), r.y = a.getUTCFullYear(), r.m = a.getUTCMonth(), r.d = a.getUTCDate() + (r.w + 6) % 7) : (a = Ee(J(r.y, 0, 1)), o = a.getDay(), a = o > 4 || o === 0 ? z.ceil(a) : z(a), a = I.offset(a, (r.V - 1) * 7), r.y = a.getFullYear(), r.m = a.getMonth(), r.d = a.getDate() + (r.w + 6) % 7);
			} else ("W" in r || "U" in r) && ("w" in r || (r.w = "u" in r ? r.u % 7 : +("W" in r)), o = "Z" in r ? De(J(r.y, 0, 1)).getUTCDay() : Ee(J(r.y, 0, 1)).getDay(), r.m = 0, r.d = "W" in r ? (r.w + 6) % 7 + r.W * 7 - (o + 5) % 7 : r.w + r.U * 7 - (o + 6) % 7);
			return "Z" in r ? (r.H += r.Z / 100 | 0, r.M += r.Z % 100, De(r)) : Ee(r);
		};
	}
	function b(e, t, n, r) {
		for (var i = 0, a = t.length, o = n.length, s, c; i < a;) {
			if (r >= o) return -1;
			if (s = t.charCodeAt(i++), s === 37) {
				if (s = t.charAt(i++), c = re[s in ke ? t.charAt(i++) : s], !c || (r = c(e, n, r)) < 0) return -1;
			} else if (s != n.charCodeAt(r++)) return -1;
		}
		return r;
	}
	function ie(e, t, n) {
		var r = l.exec(t.slice(n));
		return r ? (e.p = u.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function ae(e, t, n) {
		var r = p.exec(t.slice(n));
		return r ? (e.w = m.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function oe(e, t, n) {
		var r = d.exec(t.slice(n));
		return r ? (e.w = f.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function se(e, t, n) {
		var r = te.exec(t.slice(n));
		return r ? (e.m = ne.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function ce(e, t, n) {
		var r = h.exec(t.slice(n));
		return r ? (e.m = ee.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function x(e, n, r) {
		return b(e, t, n, r);
	}
	function S(e, t, r) {
		return b(e, n, t, r);
	}
	function C(e, t, n) {
		return b(e, r, t, n);
	}
	function w(e) {
		return o[e.getDay()];
	}
	function T(e) {
		return a[e.getDay()];
	}
	function E(e) {
		return c[e.getMonth()];
	}
	function D(e) {
		return s[e.getMonth()];
	}
	function O(e) {
		return i[+(e.getHours() >= 12)];
	}
	function k(e) {
		return 1 + ~~(e.getMonth() / 3);
	}
	function le(e) {
		return o[e.getUTCDay()];
	}
	function A(e) {
		return a[e.getUTCDay()];
	}
	function j(e) {
		return c[e.getUTCMonth()];
	}
	function M(e) {
		return s[e.getUTCMonth()];
	}
	function N(e) {
		return i[+(e.getUTCHours() >= 12)];
	}
	function P(e) {
		return 1 + ~~(e.getUTCMonth() / 3);
	}
	return {
		format: function(e) {
			var t = v(e += "", g);
			return t.toString = function() {
				return e;
			}, t;
		},
		parse: function(e) {
			var t = y(e += "", !1);
			return t.toString = function() {
				return e;
			}, t;
		},
		utcFormat: function(e) {
			var t = v(e += "", _);
			return t.toString = function() {
				return e;
			}, t;
		},
		utcParse: function(e) {
			var t = y(e += "", !0);
			return t.toString = function() {
				return e;
			}, t;
		}
	};
}
var ke = {
	"-": "",
	_: " ",
	0: "0"
}, Y = /^\s*\d+/, Ae = /^%/, je = /[\\^$*+?|[\]().{}]/g;
function X(e, t, n) {
	var r = e < 0 ? "-" : "", i = (r ? -e : e) + "", a = i.length;
	return r + (a < n ? Array(n - a + 1).join(t) + i : i);
}
function Me(e) {
	return e.replace(je, "\\$&");
}
function Z(e) {
	return RegExp("^(?:" + e.map(Me).join("|") + ")", "i");
}
function Q(e) {
	return new Map(e.map((e, t) => [e.toLowerCase(), t]));
}
function Ne(e, t, n) {
	var r = Y.exec(t.slice(n, n + 1));
	return r ? (e.w = +r[0], n + r[0].length) : -1;
}
function Pe(e, t, n) {
	var r = Y.exec(t.slice(n, n + 1));
	return r ? (e.u = +r[0], n + r[0].length) : -1;
}
function Fe(e, t, n) {
	var r = Y.exec(t.slice(n, n + 2));
	return r ? (e.U = +r[0], n + r[0].length) : -1;
}
function Ie(e, t, n) {
	var r = Y.exec(t.slice(n, n + 2));
	return r ? (e.V = +r[0], n + r[0].length) : -1;
}
function Le(e, t, n) {
	var r = Y.exec(t.slice(n, n + 2));
	return r ? (e.W = +r[0], n + r[0].length) : -1;
}
function Re(e, t, n) {
	var r = Y.exec(t.slice(n, n + 4));
	return r ? (e.y = +r[0], n + r[0].length) : -1;
}
function ze(e, t, n) {
	var r = Y.exec(t.slice(n, n + 2));
	return r ? (e.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function Be(e, t, n) {
	var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
	return r ? (e.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function Ve(e, t, n) {
	var r = Y.exec(t.slice(n, n + 1));
	return r ? (e.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function He(e, t, n) {
	var r = Y.exec(t.slice(n, n + 2));
	return r ? (e.m = r[0] - 1, n + r[0].length) : -1;
}
function Ue(e, t, n) {
	var r = Y.exec(t.slice(n, n + 2));
	return r ? (e.d = +r[0], n + r[0].length) : -1;
}
function We(e, t, n) {
	var r = Y.exec(t.slice(n, n + 3));
	return r ? (e.m = 0, e.d = +r[0], n + r[0].length) : -1;
}
function Ge(e, t, n) {
	var r = Y.exec(t.slice(n, n + 2));
	return r ? (e.H = +r[0], n + r[0].length) : -1;
}
function Ke(e, t, n) {
	var r = Y.exec(t.slice(n, n + 2));
	return r ? (e.M = +r[0], n + r[0].length) : -1;
}
function qe(e, t, n) {
	var r = Y.exec(t.slice(n, n + 2));
	return r ? (e.S = +r[0], n + r[0].length) : -1;
}
function Je(e, t, n) {
	var r = Y.exec(t.slice(n, n + 3));
	return r ? (e.L = +r[0], n + r[0].length) : -1;
}
function Ye(e, t, n) {
	var r = Y.exec(t.slice(n, n + 6));
	return r ? (e.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function Xe(e, t, n) {
	var r = Ae.exec(t.slice(n, n + 1));
	return r ? n + r[0].length : -1;
}
function Ze(e, t, n) {
	var r = Y.exec(t.slice(n));
	return r ? (e.Q = +r[0], n + r[0].length) : -1;
}
function Qe(e, t, n) {
	var r = Y.exec(t.slice(n));
	return r ? (e.s = +r[0], n + r[0].length) : -1;
}
function $e(e, t) {
	return X(e.getDate(), t, 2);
}
function et(e, t) {
	return X(e.getHours(), t, 2);
}
function tt(e, t) {
	return X(e.getHours() % 12 || 12, t, 2);
}
function nt(e, t) {
	return X(1 + I.count(K(e), e), t, 3);
}
function rt(e, t) {
	return X(e.getMilliseconds(), t, 3);
}
function it(e, t) {
	return rt(e, t) + "000";
}
function at(e, t) {
	return X(e.getMonth() + 1, t, 2);
}
function ot(e, t) {
	return X(e.getMinutes(), t, 2);
}
function st(e, t) {
	return X(e.getSeconds(), t, 2);
}
function ct(e) {
	var t = e.getDay();
	return t === 0 ? 7 : t;
}
function lt(e, t) {
	return X(R.count(K(e) - 1, e), t, 2);
}
function ut(e) {
	var t = e.getDay();
	return t >= 4 || t === 0 ? B(e) : B.ceil(e);
}
function dt(e, t) {
	return e = ut(e), X(B.count(K(e), e) + (K(e).getDay() === 4), t, 2);
}
function ft(e) {
	return e.getDay();
}
function pt(e, t) {
	return X(z.count(K(e) - 1, e), t, 2);
}
function mt(e, t) {
	return X(e.getFullYear() % 100, t, 2);
}
function ht(e, t) {
	return e = ut(e), X(e.getFullYear() % 100, t, 2);
}
function gt(e, t) {
	return X(e.getFullYear() % 1e4, t, 4);
}
function _t(e, t) {
	var n = e.getDay();
	return e = n >= 4 || n === 0 ? B(e) : B.ceil(e), X(e.getFullYear() % 1e4, t, 4);
}
function vt(e) {
	var t = e.getTimezoneOffset();
	return (t > 0 ? "-" : (t *= -1, "+")) + X(t / 60 | 0, "0", 2) + X(t % 60, "0", 2);
}
function yt(e, t) {
	return X(e.getUTCDate(), t, 2);
}
function bt(e, t) {
	return X(e.getUTCHours(), t, 2);
}
function xt(e, t) {
	return X(e.getUTCHours() % 12 || 12, t, 2);
}
function St(e, t) {
	return X(1 + ue.count(q(e), e), t, 3);
}
function Ct(e, t) {
	return X(e.getUTCMilliseconds(), t, 3);
}
function wt(e, t) {
	return Ct(e, t) + "000";
}
function Tt(e, t) {
	return X(e.getUTCMonth() + 1, t, 2);
}
function Et(e, t) {
	return X(e.getUTCMinutes(), t, 2);
}
function Dt(e, t) {
	return X(e.getUTCSeconds(), t, 2);
}
function Ot(e) {
	var t = e.getUTCDay();
	return t === 0 ? 7 : t;
}
function kt(e, t) {
	return X(H.count(q(e) - 1, e), t, 2);
}
function At(e) {
	var t = e.getUTCDay();
	return t >= 4 || t === 0 ? W(e) : W.ceil(e);
}
function jt(e, t) {
	return e = At(e), X(W.count(q(e), e) + (q(e).getUTCDay() === 4), t, 2);
}
function Mt(e) {
	return e.getUTCDay();
}
function Nt(e, t) {
	return X(U.count(q(e) - 1, e), t, 2);
}
function Pt(e, t) {
	return X(e.getUTCFullYear() % 100, t, 2);
}
function Ft(e, t) {
	return e = At(e), X(e.getUTCFullYear() % 100, t, 2);
}
function It(e, t) {
	return X(e.getUTCFullYear() % 1e4, t, 4);
}
function Lt(e, t) {
	var n = e.getUTCDay();
	return e = n >= 4 || n === 0 ? W(e) : W.ceil(e), X(e.getUTCFullYear() % 1e4, t, 4);
}
function Rt() {
	return "+0000";
}
function zt() {
	return "%";
}
function Bt(e) {
	return +e;
}
function Vt(e) {
	return Math.floor(e / 1e3);
}
//#endregion
//#region node_modules/d3-time-format/src/defaultLocale.js
var $, Ht, Ut, Wt, Gt;
Kt({
	dateTime: "%x, %X",
	date: "%-m/%-d/%Y",
	time: "%-I:%M:%S %p",
	periods: ["AM", "PM"],
	days: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	],
	shortDays: [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	],
	months: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	],
	shortMonths: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	]
});
function Kt(e) {
	return $ = Oe(e), Ht = $.format, Ut = $.parse, Wt = $.utcFormat, Gt = $.utcParse, $;
}
//#endregion
//#region node_modules/d3-scale/src/time.js
function qt(e) {
	return new Date(e);
}
function Jt(e) {
	return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function Yt(t, n, r, i, a, o, c, l, u, d) {
	var f = e(), p = f.invert, m = f.domain, ee = d(".%L"), te = d(":%S"), ne = d("%I:%M"), g = d("%I %p"), _ = d("%a %d"), re = d("%b %d"), v = d("%B"), y = d("%Y");
	function b(e) {
		return (u(e) < e ? ee : l(e) < e ? te : c(e) < e ? ne : o(e) < e ? g : i(e) < e ? a(e) < e ? _ : re : r(e) < e ? v : y)(e);
	}
	return f.invert = function(e) {
		return new Date(p(e));
	}, f.domain = function(e) {
		return arguments.length ? m(Array.from(e, Jt)) : m().map(qt);
	}, f.ticks = function(e) {
		var n = m();
		return t(n[0], n[n.length - 1], e ?? 10);
	}, f.tickFormat = function(e, t) {
		return t == null ? b : d(t);
	}, f.nice = function(e) {
		var t = m();
		return (!e || typeof e.range != "function") && (e = n(t[0], t[t.length - 1], e ?? 10)), e ? m(h(t, e)) : f;
	}, f.copy = function() {
		return s(f, Yt(t, n, r, i, a, o, c, l, u, d));
	}, f;
}
function Xt() {
	return n.apply(Yt(we, Te, K, G, R, I, P, M, j, Ht).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
//#endregion
//#region node_modules/d3-scale/src/utcTime.js
function Zt() {
	return n.apply(Yt(Se, Ce, q, be, H, ue, F, N, j, Wt).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
//#endregion
export { N as A, ge as C, P as D, de as E, b as F, m as I, ce as M, se as N, F as O, ie as P, W as S, I as T, pe as _, Wt as a, ye as b, q as c, me as d, z as f, fe as g, B as h, Ut as i, j, M as k, G as l, R as m, Xt as n, Gt as o, he as p, Ht as r, K as s, Zt as t, be as u, ve as v, _e as w, H as x, U as y };
