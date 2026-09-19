import { c as e, d as t, n, o as r, s as i } from "./linear-q6e-7JBm.js";
import { r as a } from "./ordinal-BtWaYSDN.js";
//#region \0rolldown/runtime.js
var o = Object.defineProperty, s = (e, t) => {
	let n = {};
	for (var r in e) o(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || o(n, Symbol.toStringTag, { value: "Module" }), n;
};
//#endregion
//#region node_modules/d3-array/src/identity.js
function c(e) {
	return e;
}
//#endregion
//#region node_modules/d3-array/src/group.js
function l(e, ...t) {
	return m(e, c, c, t);
}
function u(e, t, ...n) {
	return m(e, c, t, n);
}
function d(e, t, ...n) {
	return m(e, Array.from, t, n);
}
function f(e, ...t) {
	return m(e, c, p, t);
}
function p(e) {
	if (e.length !== 1) throw Error("duplicate key");
	return e[0];
}
function m(e, t, n, r) {
	return (function e(i, o) {
		if (o >= r.length) return n(i);
		let s = new a(), c = r[o++], l = -1;
		for (let e of i) {
			let t = c(e, ++l, i), n = s.get(t);
			n ? n.push(e) : s.set(t, [e]);
		}
		for (let [t, n] of s) s.set(t, e(n, o));
		return t(s);
	})(e, 0);
}
//#endregion
//#region node_modules/d3-scale/src/pow.js
function h(e) {
	return function(t) {
		return t < 0 ? -((-t) ** +e) : t ** +e;
	};
}
function g(e) {
	return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function _(e) {
	return e < 0 ? -e * e : e * e;
}
function v(e) {
	var t = e(i, i), r = 1;
	function a() {
		return r === 1 ? e(i, i) : r === .5 ? e(g, _) : e(h(r), h(1 / r));
	}
	return t.exponent = function(e) {
		return arguments.length ? (r = +e, a()) : r;
	}, n(t);
}
function y() {
	var n = v(e());
	return n.copy = function() {
		return r(n, y()).exponent(n.exponent());
	}, t.apply(n, arguments), n;
}
//#endregion
export { u as a, f as i, v as n, d as o, l as r, s, y as t };
