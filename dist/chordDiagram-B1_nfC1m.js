import { i as e, r as t, s as n, t as r } from "./pow-Bp6eSqVs.js";
import { p as i } from "./linear-q6e-7JBm.js";
import { n as a } from "./ordinal-BtWaYSDN.js";
import { t as o } from "./max-CPVNm4tn.js";
import { n as s } from "./src-kLpf-6r0.js";
import { t as c } from "./select-BIuoFcZG.js";
import { d as l, p as u } from "./string-BOhFwaZD.js";
import { r as d, t as f } from "./array-Cv4-2llb.js";
import { a as p, c as m, d as h, f as g, i as _, l as v, n as y, p as b, r as x, s as S, t as C, u as w } from "./math-C5EhTgJw.js";
import { n as T } from "./path-BoJ8LMXE.js";
import { n as E, r as D, t as O } from "./point-GXxVI808.js";
import { _ as k, a as A, c as j, d as ee, f as te, g as ne, h as re, i as ie, l as M, m as N, n as P, o as F, p as ae, r as oe, s as se, t as ce, u as le, v as ue } from "./step-C2rRFtYO.js";
import { n as de } from "./hierarchy-CDFAetye.js";
import { r as fe, t as pe } from "./palette-BuTjISrV.js";
//#region node_modules/@emotion/sheet/dist/emotion-sheet.esm.js
function me(e) {
	if (e.sheet) return e.sheet;
	/* istanbul ignore next */
	for (var t = 0; t < document.styleSheets.length; t++) if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function I(e) {
	var t = document.createElement("style");
	return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var he = /*#__PURE__*/ function() {
	function e(e) {
		var t = this;
		this._insertTag = function(e) {
			var n = t.tags.length === 0 ? t.insertionPoint ? t.insertionPoint.nextSibling : t.prepend ? t.container.firstChild : t.before : t.tags[t.tags.length - 1].nextSibling;
			t.container.insertBefore(e, n), t.tags.push(e);
		}, this.isSpeedy = e.speedy === void 0 || e.speedy, this.tags = [], this.ctr = 0, this.nonce = e.nonce, this.key = e.key, this.container = e.container, this.prepend = e.prepend, this.insertionPoint = e.insertionPoint, this.before = null;
	}
	var t = e.prototype;
	return t.hydrate = function(e) {
		e.forEach(this._insertTag);
	}, t.insert = function(e) {
		this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 && this._insertTag(I(this));
		var t = this.tags[this.tags.length - 1];
		if (this.isSpeedy) {
			var n = me(t);
			try {
				n.insertRule(e, n.cssRules.length);
			} catch {}
		} else t.appendChild(document.createTextNode(e));
		this.ctr++;
	}, t.flush = function() {
		this.tags.forEach(function(e) {
			return e.parentNode?.removeChild(e);
		}), this.tags = [], this.ctr = 0;
	}, e;
}(), L = "-ms-", ge = "-moz-", R = "-webkit-", _e = "comm", ve = "rule", ye = "decl", be = "@import", xe = "@keyframes", Se = "@layer", Ce = Math.abs, we = String.fromCharCode, Te = Object.assign;
function Ee(e, t) {
	return B(e, 0) ^ 45 ? (((t << 2 ^ B(e, 0)) << 2 ^ B(e, 1)) << 2 ^ B(e, 2)) << 2 ^ B(e, 3) : 0;
}
function De(e) {
	return e.trim();
}
function Oe(e, t) {
	return (e = t.exec(e)) ? e[0] : e;
}
function z(e, t, n) {
	return e.replace(t, n);
}
function ke(e, t) {
	return e.indexOf(t);
}
function B(e, t) {
	return e.charCodeAt(t) | 0;
}
function Ae(e, t, n) {
	return e.slice(t, n);
}
function V(e) {
	return e.length;
}
function je(e) {
	return e.length;
}
function Me(e, t) {
	return t.push(e), e;
}
function Ne(e, t) {
	return e.map(t).join("");
}
//#endregion
//#region node_modules/stylis/src/Tokenizer.js
var Pe = 1, Fe = 1, Ie = 0, H = 0, U = 0, Le = "";
function Re(e, t, n, r, i, a, o) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: Pe,
		column: Fe,
		length: o,
		return: ""
	};
}
function ze(e, t) {
	return Te(Re("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function Be() {
	return U;
}
function Ve() {
	return U = H > 0 ? B(Le, --H) : 0, Fe--, U === 10 && (Fe = 1, Pe--), U;
}
function W() {
	return U = H < Ie ? B(Le, H++) : 0, Fe++, U === 10 && (Fe = 1, Pe++), U;
}
function G() {
	return B(Le, H);
}
function He() {
	return H;
}
function Ue(e, t) {
	return Ae(Le, e, t);
}
function We(e) {
	switch (e) {
		case 0:
		case 9:
		case 10:
		case 13:
		case 32: return 5;
		case 33:
		case 43:
		case 44:
		case 47:
		case 62:
		case 64:
		case 126:
		case 59:
		case 123:
		case 125: return 4;
		case 58: return 3;
		case 34:
		case 39:
		case 40:
		case 91: return 2;
		case 41:
		case 93: return 1;
	}
	return 0;
}
function Ge(e) {
	return Pe = Fe = 1, Ie = V(Le = e), H = 0, [];
}
function Ke(e) {
	return Le = "", e;
}
function qe(e) {
	return De(Ue(H - 1, Xe(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Je(e) {
	for (; (U = G()) && U < 33;) W();
	return We(e) > 2 || We(U) > 3 ? "" : " ";
}
function Ye(e, t) {
	for (; --t && W() && !(U < 48 || U > 102 || U > 57 && U < 65 || U > 70 && U < 97););
	return Ue(e, He() + (t < 6 && G() == 32 && W() == 32));
}
function Xe(e) {
	for (; W();) switch (U) {
		case e: return H;
		case 34:
		case 39:
			e !== 34 && e !== 39 && Xe(U);
			break;
		case 40:
			e === 41 && Xe(e);
			break;
		case 92: W();
	}
	return H;
}
function Ze(e, t) {
	for (; W() && e + U !== 57 && (e + U !== 84 || G() !== 47););
	return "/*" + Ue(t, H - 1) + "*" + we(e === 47 ? e : W());
}
function Qe(e) {
	for (; !We(G());) W();
	return Ue(e, H);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
function $e(e) {
	return Ke(et("", null, null, null, [""], e = Ge(e), 0, [0], e));
}
function et(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, m = 0, h = 1, g = 1, _ = 1, v = 0, y = "", b = i, x = a, S = r, C = y; g;) switch (m = v, v = W()) {
		case 40: if (m != 108 && B(C, d - 1) == 58) {
			ke(C += z(qe(v), "&", "&\f"), "&\f") != -1 && (_ = -1);
			break;
		}
		case 34:
		case 39:
		case 91:
			C += qe(v);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			C += Je(m);
			break;
		case 92:
			C += Ye(He() - 1, 7);
			continue;
		case 47:
			switch (G()) {
				case 42:
				case 47:
					Me(nt(Ze(W(), He()), t, n), c);
					break;
				default: C += "/";
			}
			break;
		case 123 * h: s[l++] = V(C) * _;
		case 125 * h:
		case 59:
		case 0:
			switch (v) {
				case 0:
				case 125: g = 0;
				case 59 + u:
					_ == -1 && (C = z(C, /\f/g, "")), p > 0 && V(C) - d && Me(p > 32 ? rt(C + ";", r, n, d - 1) : rt(z(C, " ", "") + ";", r, n, d - 2), c);
					break;
				case 59: C += ";";
				default: if (Me(S = tt(C, t, n, l, u, i, s, y, b = [], x = [], d), a), v === 123) {
					if (u === 0) et(C, t, S, S, b, a, d, s, x);
					else switch (f === 99 && B(C, 3) === 110 ? 100 : f) {
						case 100:
						case 108:
						case 109:
						case 115:
							et(e, S, S, r && Me(tt(e, S, S, 0, 0, i, s, y, i, b = [], d), x), i, x, d, s, r ? b : x);
							break;
						default: et(C, S, S, S, [""], x, 0, s, x);
					}
				}
			}
			l = u = p = 0, h = _ = 1, y = C = "", d = o;
			break;
		case 58: d = 1 + V(C), p = m;
		default:
			if (h < 1) {
				if (v == 123) --h;
				else if (v == 125 && h++ == 0 && Ve() == 125) continue;
			}
			switch (C += we(v), v * h) {
				case 38:
					_ = u > 0 ? 1 : (C += "\f", -1);
					break;
				case 44:
					s[l++] = (V(C) - 1) * _, _ = 1;
					break;
				case 64:
					G() === 45 && (C += qe(W())), f = G(), u = d = V(y = C += Qe(He())), v++;
					break;
				case 45: m === 45 && V(C) == 2 && (h = 0);
			}
	}
	return a;
}
function tt(e, t, n, r, i, a, o, s, c, l, u) {
	for (var d = i - 1, f = i === 0 ? a : [""], p = je(f), m = 0, h = 0, g = 0; m < r; ++m) for (var _ = 0, v = Ae(e, d + 1, d = Ce(h = o[m])), y = e; _ < p; ++_) (y = De(h > 0 ? f[_] + " " + v : z(v, /&\f/g, f[_]))) && (c[g++] = y);
	return Re(e, t, n, i === 0 ? ve : s, c, l, u);
}
function nt(e, t, n) {
	return Re(e, t, n, _e, we(Be()), Ae(e, 2, -2), 0);
}
function rt(e, t, n, r) {
	return Re(e, t, n, ye, Ae(e, 0, r), Ae(e, r + 1, -1), r);
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
function it(e, t) {
	for (var n = "", r = je(e), i = 0; i < r; i++) n += t(e[i], i, e, t) || "";
	return n;
}
function at(e, t, n, r) {
	switch (e.type) {
		case Se: if (e.children.length) break;
		case be:
		case ye: return e.return = e.return || e.value;
		case _e: return "";
		case xe: return e.return = e.value + "{" + it(e.children, r) + "}";
		case ve: e.value = e.props.join(",");
	}
	return V(n = it(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
//#endregion
//#region node_modules/stylis/src/Middleware.js
function ot(e) {
	var t = je(e);
	return function(n, r, i, a) {
		for (var o = "", s = 0; s < t; s++) o += e[s](n, r, i, a) || "";
		return o;
	};
}
function st(e) {
	return function(t) {
		t.root || (t = t.return) && e(t);
	};
}
//#endregion
//#region node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function ct(e) {
	var t = Object.create(null);
	return function(n) {
		return t[n] === void 0 && (t[n] = e(n)), t[n];
	};
}
//#endregion
//#region node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
var lt = function(e, t, n) {
	for (var r = 0, i = 0; r = i, i = G(), r === 38 && i === 12 && (t[n] = 1), !We(i);) W();
	return Ue(e, H);
}, ut = function(e, t) {
	var n = -1, r = 44;
	do
		switch (We(r)) {
			case 0:
				r === 38 && G() === 12 && (t[n] = 1), e[n] += lt(H - 1, t, n);
				break;
			case 2:
				e[n] += qe(r);
				break;
			case 4: if (r === 44) {
				e[++n] = G() === 58 ? "&\f" : "", t[n] = e[n].length;
				break;
			}
			default: e[n] += we(r);
		}
	while (r = W());
	return e;
}, dt = function(e, t) {
	return Ke(ut(Ge(e), t));
}, ft = /* #__PURE__ */ new WeakMap(), pt = function(e) {
	if (!(e.type !== "rule" || !e.parent || e.length < 1)) {
		for (var t = e.value, n = e.parent, r = e.column === n.column && e.line === n.line; n.type !== "rule";) if (n = n.parent, !n) return;
		if ((e.props.length !== 1 || t.charCodeAt(0) === 58 || ft.get(n)) && !r) {
			ft.set(e, !0);
			for (var i = [], a = dt(t, i), o = n.props, s = 0, c = 0; s < a.length; s++) for (var l = 0; l < o.length; l++, c++) e.props[c] = i[s] ? a[s].replace(/&\f/g, o[l]) : o[l] + " " + a[s];
		}
	}
}, mt = function(e) {
	if (e.type === "decl") {
		var t = e.value;
		t.charCodeAt(0) === 108 && t.charCodeAt(2) === 98 && (e.return = "", e.value = "");
	}
};
function ht(e, t) {
	switch (Ee(e, t)) {
		case 5103: return R + "print-" + e + e;
		case 5737:
		case 4201:
		case 3177:
		case 3433:
		case 1641:
		case 4457:
		case 2921:
		case 5572:
		case 6356:
		case 5844:
		case 3191:
		case 6645:
		case 3005:
		case 6391:
		case 5879:
		case 5623:
		case 6135:
		case 4599:
		case 4855:
		case 4215:
		case 6389:
		case 5109:
		case 5365:
		case 5621:
		case 3829: return R + e + e;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return R + e + ge + e + L + e + e;
		case 6828:
		case 4268: return R + e + L + e + e;
		case 6165: return R + e + L + "flex-" + e + e;
		case 5187: return R + e + z(e, /(\w+).+(:[^]+)/, R + "box-$1$2" + L + "flex-$1$2") + e;
		case 5443: return R + e + L + "flex-item-" + z(e, /flex-|-self/, "") + e;
		case 4675: return R + e + L + "flex-line-pack" + z(e, /align-content|flex-|-self/, "") + e;
		case 5548: return R + e + L + z(e, "shrink", "negative") + e;
		case 5292: return R + e + L + z(e, "basis", "preferred-size") + e;
		case 6060: return R + "box-" + z(e, "-grow", "") + R + e + L + z(e, "grow", "positive") + e;
		case 4554: return R + z(e, /([^-])(transform)/g, "$1" + R + "$2") + e;
		case 6187: return z(z(z(e, /(zoom-|grab)/, R + "$1"), /(image-set)/, R + "$1"), e, "") + e;
		case 5495:
		case 3959: return z(e, /(image-set\([^]*)/, R + "$1$`$1");
		case 4968: return z(z(e, /(.+:)(flex-)?(.*)/, R + "box-pack:$3" + L + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + R + e + e;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return z(e, /(.+)-inline(.+)/, R + "$1$2") + e;
		case 8116:
		case 7059:
		case 5753:
		case 5535:
		case 5445:
		case 5701:
		case 4933:
		case 4677:
		case 5533:
		case 5789:
		case 5021:
		case 4765:
			if (V(e) - 1 - t > 6) switch (B(e, t + 1)) {
				case 109: if (B(e, t + 4) !== 45) break;
				case 102: return z(e, /(.+:)(.+)-([^]+)/, "$1" + R + "$2-$3$1" + ge + (B(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
				case 115: return ~ke(e, "stretch") ? ht(z(e, "stretch", "fill-available"), t) + e : e;
			}
			break;
		case 4949: if (B(e, t + 1) !== 115) break;
		case 6444:
			switch (B(e, V(e) - 3 - (~ke(e, "!important") && 10))) {
				case 107: return z(e, ":", ":" + R) + e;
				case 101: return z(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + R + (B(e, 14) === 45 ? "inline-" : "") + "box$3$1" + R + "$2$3$1" + L + "$2box$3") + e;
			}
			break;
		case 5936:
			switch (B(e, t + 11)) {
				case 114: return R + e + L + z(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
				case 108: return R + e + L + z(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
				case 45: return R + e + L + z(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
			}
			return R + e + L + e + e;
	}
	return e;
}
var gt = [function(e, t, n, r) {
	if (e.length > -1 && !e.return) switch (e.type) {
		case ye:
			e.return = ht(e.value, e.length);
			break;
		case xe: return it([ze(e, { value: z(e.value, "@", "@" + R) })], r);
		case ve: if (e.length) return Ne(e.props, function(t) {
			switch (Oe(t, /(::plac\w+|:read-\w+)/)) {
				case ":read-only":
				case ":read-write": return it([ze(e, { props: [z(t, /:(read-\w+)/, ":" + ge + "$1")] })], r);
				case "::placeholder": return it([
					ze(e, { props: [z(t, /:(plac\w+)/, ":" + R + "input-$1")] }),
					ze(e, { props: [z(t, /:(plac\w+)/, ":" + ge + "$1")] }),
					ze(e, { props: [z(t, /:(plac\w+)/, L + "input-$1")] })
				], r);
			}
			return "";
		});
	}
}], _t = function(e) {
	var t = e.key;
	if (t === "css") {
		var n = document.querySelectorAll("style[data-emotion]:not([data-s])");
		Array.prototype.forEach.call(n, function(e) {
			e.getAttribute("data-emotion").indexOf(" ") !== -1 && (document.head.appendChild(e), e.setAttribute("data-s", ""));
		});
	}
	var r = e.stylisPlugins || gt, i = {}, a, o = [];
	a = e.container || document.head, Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion^=\"" + t + " \"]"), function(e) {
		for (var t = e.getAttribute("data-emotion").split(" "), n = 1; n < t.length; n++) i[t[n]] = !0;
		o.push(e);
	});
	var s, c = [pt, mt], l, u = [at, st(function(e) {
		l.insert(e);
	})], d = ot(c.concat(r, u)), f = function(e) {
		return it($e(e), d);
	};
	s = function(e, t, n, r) {
		l = n, f(e ? e + "{" + t.styles + "}" : t.styles), r && (p.inserted[t.name] = !0);
	};
	var p = {
		key: t,
		sheet: new he({
			key: t,
			container: a,
			nonce: e.nonce,
			speedy: e.speedy,
			prepend: e.prepend,
			insertionPoint: e.insertionPoint
		}),
		nonce: e.nonce,
		inserted: i,
		registered: {},
		insert: s
	};
	return p.sheet.hydrate(o), p;
};
//#endregion
//#region node_modules/@emotion/hash/dist/emotion-hash.esm.js
function vt(e) {
	for (var t = 0, n, r = 0, i = e.length; i >= 4; ++r, i -= 4) n = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24, n = (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), n ^= n >>> 24, t = (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16) ^ (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
	switch (i) {
		case 3: t ^= (e.charCodeAt(r + 2) & 255) << 16;
		case 2: t ^= (e.charCodeAt(r + 1) & 255) << 8;
		case 1: t ^= e.charCodeAt(r) & 255, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
	}
	return t ^= t >>> 13, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
//#endregion
//#region node_modules/@emotion/unitless/dist/emotion-unitless.esm.js
var yt = {
	animationIterationCount: 1,
	aspectRatio: 1,
	borderImageOutset: 1,
	borderImageSlice: 1,
	borderImageWidth: 1,
	boxFlex: 1,
	boxFlexGroup: 1,
	boxOrdinalGroup: 1,
	columnCount: 1,
	columns: 1,
	flex: 1,
	flexGrow: 1,
	flexPositive: 1,
	flexShrink: 1,
	flexNegative: 1,
	flexOrder: 1,
	gridRow: 1,
	gridRowEnd: 1,
	gridRowSpan: 1,
	gridRowStart: 1,
	gridColumn: 1,
	gridColumnEnd: 1,
	gridColumnSpan: 1,
	gridColumnStart: 1,
	msGridRow: 1,
	msGridRowSpan: 1,
	msGridColumn: 1,
	msGridColumnSpan: 1,
	fontWeight: 1,
	lineHeight: 1,
	opacity: 1,
	order: 1,
	orphans: 1,
	scale: 1,
	tabSize: 1,
	widows: 1,
	zIndex: 1,
	zoom: 1,
	WebkitLineClamp: 1,
	fillOpacity: 1,
	floodOpacity: 1,
	stopOpacity: 1,
	strokeDasharray: 1,
	strokeDashoffset: 1,
	strokeMiterlimit: 1,
	strokeOpacity: 1,
	strokeWidth: 1
}, bt = /[A-Z]|^ms/g, xt = /_EMO_([^_]+?)_([^]*?)_EMO_/g, St = function(e) {
	return e.charCodeAt(1) === 45;
}, Ct = function(e) {
	return e != null && typeof e != "boolean";
}, wt = /* #__PURE__ */ ct(function(e) {
	return St(e) ? e : e.replace(bt, "-$&").toLowerCase();
}), Tt = function(e, t) {
	switch (e) {
		case "animation":
		case "animationName": if (typeof t == "string") return t.replace(xt, function(e, t, n) {
			return K = {
				name: t,
				styles: n,
				next: K
			}, t;
		});
	}
	return yt[e] !== 1 && !St(e) && typeof t == "number" && t !== 0 ? t + "px" : t;
};
function Et(e, t, n) {
	if (n == null) return "";
	var r = n;
	if (r.__emotion_styles !== void 0) return r;
	switch (typeof n) {
		case "boolean": return "";
		case "object":
			var i = n;
			if (i.anim === 1) return K = {
				name: i.name,
				styles: i.styles,
				next: K
			}, i.name;
			var a = n;
			if (a.styles !== void 0) {
				var o = a.next;
				if (o !== void 0) for (; o !== void 0;) K = {
					name: o.name,
					styles: o.styles,
					next: K
				}, o = o.next;
				return a.styles + ";";
			}
			return Dt(e, t, n);
		case "function": if (e !== void 0) {
			var s = K, c = n(e);
			return K = s, Et(e, t, c);
		}
	}
	var l = n;
	if (t == null) return l;
	var u = t[l];
	return u === void 0 ? l : u;
}
function Dt(e, t, n) {
	var r = "";
	if (Array.isArray(n)) for (var i = 0; i < n.length; i++) r += Et(e, t, n[i]) + ";";
	else for (var a in n) {
		var o = n[a];
		if (typeof o != "object") {
			var s = o;
			t != null && t[s] !== void 0 ? r += a + "{" + t[s] + "}" : Ct(s) && (r += wt(a) + ":" + Tt(a, s) + ";");
		} else if (Array.isArray(o) && typeof o[0] == "string" && (t == null || t[o[0]] === void 0)) for (var c = 0; c < o.length; c++) Ct(o[c]) && (r += wt(a) + ":" + Tt(a, o[c]) + ";");
		else {
			var l = Et(e, t, o);
			switch (a) {
				case "animation":
				case "animationName":
					r += wt(a) + ":" + l + ";";
					break;
				default: r += a + "{" + l + "}";
			}
		}
	}
	return r;
}
var Ot = /label:\s*([^\s;{]+)\s*(;|$)/g, K;
function kt(e, t, n) {
	if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0) return e[0];
	var r = !0, i = "";
	K = void 0;
	var a = e[0];
	a == null || a.raw === void 0 ? (r = !1, i += Et(n, t, a)) : i += a[0];
	for (var o = 1; o < e.length; o++) i += Et(n, t, e[o]), r && (i += a[o]);
	Ot.lastIndex = 0;
	for (var s = "", c; (c = Ot.exec(i)) !== null;) s += "-" + c[1];
	return {
		name: vt(i) + s,
		styles: i,
		next: K
	};
}
//#endregion
//#region node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js
function At(e, t, n) {
	var r = "";
	return n.split(" ").forEach(function(n) {
		e[n] === void 0 ? n && (r += n + " ") : t.push(e[n] + ";");
	}), r;
}
var jt = function(e, t, n) {
	var r = e.key + "-" + t.name;
	n === !1 && e.registered[r] === void 0 && (e.registered[r] = t.styles);
}, Mt = function(e, t, n) {
	jt(e, t, n);
	var r = e.key + "-" + t.name;
	if (e.inserted[t.name] === void 0) {
		var i = t;
		do
			e.insert(t === i ? "." + r : "", i, e.sheet, !0), i = i.next;
		while (i !== void 0);
	}
};
//#endregion
//#region node_modules/@emotion/css/create-instance/dist/emotion-css-create-instance.esm.js
function Nt(e, t) {
	if (e.inserted[t.name] === void 0) return e.insert("", t, e.sheet, !0);
}
function Pt(e, t, n) {
	var r = [], i = At(e, r, n);
	return r.length < 2 ? n : i + t(r);
}
var Ft = function(e) {
	var t = _t(e);
	t.sheet.speedy = function(e) {
		this.isSpeedy = e;
	}, t.compat = !0;
	var n = function() {
		var e = kt([...arguments], t.registered, void 0);
		return Mt(t, e, !1), t.key + "-" + e.name;
	};
	return {
		css: n,
		cx: function() {
			var e = [...arguments];
			return Pt(t.registered, n, It(e));
		},
		injectGlobal: function() {
			Nt(t, kt([...arguments], t.registered));
		},
		keyframes: function() {
			var e = kt([...arguments], t.registered), n = "animation-" + e.name;
			return Nt(t, {
				name: e.name,
				styles: "@keyframes " + n + "{" + e.styles + "}"
			}), n;
		},
		hydrate: function(e) {
			e.forEach(function(e) {
				t.inserted[e] = !0;
			});
		},
		flush: function() {
			t.registered = {}, t.inserted = {}, t.sheet.flush();
		},
		sheet: t.sheet,
		cache: t,
		getRegisteredStyles: At.bind(null, t.registered),
		merge: Pt.bind(null, t.registered, n)
	};
}, It = function e(t) {
	for (var n = "", r = 0; r < t.length; r++) {
		var i = t[r];
		if (i != null) {
			var a = void 0;
			switch (typeof i) {
				case "boolean": break;
				case "object":
					if (Array.isArray(i)) a = e(i);
					else for (var o in a = "", i) i[o] && o && (a && (a += " "), a += o);
					break;
				default: a = i;
			}
			a && (n && (n += " "), n += a);
		}
	}
	return n;
}, Lt = /* @__PURE__ */ n({
	cache: () => qt,
	css: () => Gt,
	cx: () => Bt,
	flush: () => Rt,
	getRegisteredStyles: () => Ht,
	hydrate: () => zt,
	injectGlobal: () => Ut,
	keyframes: () => Wt,
	merge: () => Vt,
	sheet: () => Kt
}), q = Ft({ key: "css" }), Rt = q.flush, zt = q.hydrate, Bt = q.cx, Vt = q.merge, Ht = q.getRegisteredStyles, Ut = q.injectGlobal, Wt = q.keyframes, Gt = q.css, Kt = q.sheet, qt = q.cache, Jt = globalThis?.UNOVIS_NONCE, { css: J, cx: Yt, injectGlobal: Xt, keyframes: Zt, cache: Qt, sheet: $t } = Jt ? Ft({
	key: "unovis",
	nonce: Jt
}) : Lt;
//#endregion
//#region node_modules/throttle-debounce/esm/index.js
function en(e, t, n) {
	var r = n || {}, i = r.noTrailing, a = i !== void 0 && i, o = r.noLeading, s = o !== void 0 && o, c = r.debounceMode, l = c === void 0 ? void 0 : c, u, d = !1, f = 0;
	function p() {
		u && clearTimeout(u);
	}
	function m(e) {
		var t = (e || {}).upcomingOnly, n = t !== void 0 && t;
		p(), d = !n;
	}
	function h() {
		var n = [...arguments], r = this, i = Date.now() - f;
		if (d) return;
		function o() {
			f = Date.now(), t.apply(r, n);
		}
		function c() {
			u = void 0;
		}
		!s && l && !u && o(), p(), l === void 0 && i > e ? s ? (f = Date.now(), a || (u = setTimeout(l ? c : o, e))) : o() : a !== !0 && (u = setTimeout(l ? c : o, l === void 0 ? e - i : e));
	}
	return h.cancel = m, h;
}
//#endregion
//#region node_modules/@unovis/ts/utils/data.js
var tn = (e) => typeof e == "number", nn = (e) => typeof e == "function", rn = (e) => e === void 0, an = (e) => typeof e == "string", on = (e) => Array.isArray(e), sn = (e) => e instanceof Object, cn = (e) => e.constructor.name !== "Function" && e.constructor.name !== "Object", ln = (e) => sn(e) && !on(e) && !nn(e) && !cn(e), un = (e, t, n = [], r = /* @__PURE__ */ new Set()) => {
	if (e === t) return !0;
	if (Array.isArray(e)) {
		if (!Array.isArray(t) || e.length !== t.length) return !1;
		if (r.has(e)) return !0;
		r.add(e);
		for (let i = 0; i < e.length; i++) if (!un(e[i], t[i], n, r)) return !1;
		return r.delete(e), !0;
	}
	if (e instanceof Date && t instanceof Date) return e.getTime() === t.getTime();
	if (typeof e == "object" && e && t !== null) {
		if (typeof t != "object") return !1;
		let i = Object.keys(e).filter((e) => !n.includes(e)), a = Object.keys(t).filter((e) => !n.includes(e));
		if (i.length !== a.length) return !1;
		if (r.has(e)) return !0;
		r.add(e);
		for (let a of i) if (!un(e[a], t[a], n, r)) return !1;
		return r.delete(e), !0;
	}
	return e === t;
}, dn = (e, t = /* @__PURE__ */ new Map()) => {
	if (typeof e != "object" || !e) return e;
	if (e instanceof Date) return new Date(e.getTime());
	if (e instanceof Array) {
		let n = [];
		t.set(e, n);
		for (let r of e) n.push(t.has(r) ? t.get(r) : dn(r, t));
		return n;
	}
	if (cn(e)) return e;
	if (e instanceof Object) {
		let n = {};
		t.set(e, n);
		let r = e;
		return Object.keys(e).reduce((e, n) => (e[n] = t.has(r[n]) ? t.get(r[n]) : dn(r[n], t), e), n), n;
	}
	return e;
}, fn = (e, t, n = /* @__PURE__ */ new Map()) => {
	if (!e || !t) return e && dn(e);
	if (e === t) return e;
	let r = cn(e) ? e : dn(e);
	return n.has(t) ? n.get(t) : (n.set(t, r), Object.keys(t).forEach((i) => {
		i !== "__proto__" && i !== "constructor" && (ln(e[i]) && ln(t[i]) ? r[i] = fn(e[i], t[i], n) : r[i] = dn(t[i]));
	}), r);
}, pn = (e, t) => e.reduce((e, n, r, i, a = t(n, r)) => ((e[a] || (e[a] = [])).push(n), e), {}), mn = (e, t, n) => en(t, e, n);
function Y(e, t, n) {
	return nn(t) ? t(e, n) : t;
}
function hn(e, t, n) {
	return Y(e, t, n);
}
function X(e, t, n) {
	return Y(e, t, n);
}
function gn(e, t, n) {
	return Math.min(Math.max(e, t), n);
}
//#endregion
//#region node_modules/d3-shape/src/arc.js
function _n(e) {
	return e.innerRadius;
}
function vn(e) {
	return e.outerRadius;
}
function yn(e) {
	return e.startAngle;
}
function bn(e) {
	return e.endAngle;
}
function xn(e) {
	return e && e.padAngle;
}
function Sn(e, t, n, r, i, a, o, s) {
	var c = n - e, l = r - t, u = o - i, d = s - a, f = d * c - u * l;
	if (!(f * f < 1e-12)) return f = (u * (t - a) - d * (e - i)) / f, [e + f * c, t + f * l];
}
function Cn(e, t, n, r, i, a, o) {
	var s = e - n, c = t - r, l = (o ? a : -a) / g(s * s + c * c), u = l * c, d = -l * s, f = e + u, p = t + d, h = n + u, _ = r + d, v = (f + h) / 2, y = (p + _) / 2, b = h - f, x = _ - p, S = b * b + x * x, C = i - a, w = f * _ - h * p, T = (x < 0 ? -1 : 1) * g(m(0, C * C * S - w * w)), E = (w * x - b * T) / S, D = (-w * b - x * T) / S, O = (w * x + b * T) / S, k = (-w * b + x * T) / S, A = E - v, j = D - y, ee = O - v, te = k - y;
	return A * A + j * j > ee * ee + te * te && (E = O, D = k), {
		cx: E,
		cy: D,
		x01: -u,
		y01: -d,
		x11: E * (i / C - 1),
		y11: D * (i / C - 1)
	};
}
function wn() {
	var e = _n, t = vn, n = d(0), r = null, i = yn, a = bn, o = xn, s = null, c = D(l);
	function l() {
		var l, u, d = +e.apply(this, arguments), f = +t.apply(this, arguments), m = i.apply(this, arguments) - S, T = a.apply(this, arguments) - S, E = C(T - m), D = T > m;
		if (s ||= l = c(), f < d && (u = f, f = d, d = u), !(f > 1e-12)) s.moveTo(0, 0);
		else if (E > b - 1e-12) s.moveTo(f * p(m), f * h(m)), s.arc(0, 0, f, m, T, !D), d > 1e-12 && (s.moveTo(d * p(T), d * h(T)), s.arc(0, 0, d, T, m, D));
		else {
			var O = m, k = T, A = m, j = T, ee = E, te = E, ne = o.apply(this, arguments) / 2, re = ne > 1e-12 && (r ? +r.apply(this, arguments) : g(d * d + f * f)), ie = v(C(f - d) / 2, +n.apply(this, arguments)), M = ie, N = ie, P, F;
			if (re > 1e-12) {
				var ae = x(re / d * h(ne)), oe = x(re / f * h(ne));
				(ee -= ae * 2) > 1e-12 ? (ae *= D ? 1 : -1, A += ae, j -= ae) : (ee = 0, A = j = (m + T) / 2), (te -= oe * 2) > 1e-12 ? (oe *= D ? 1 : -1, O += oe, k -= oe) : (te = 0, O = k = (m + T) / 2);
			}
			var se = f * p(O), ce = f * h(O), le = d * p(j), ue = d * h(j);
			if (ie > 1e-12) {
				var de = f * p(k), fe = f * h(k), pe = d * p(A), me = d * h(A), I;
				if (E < w) {
					if (I = Sn(se, ce, pe, me, de, fe, le, ue)) {
						var he = se - I[0], L = ce - I[1], ge = de - I[0], R = fe - I[1], _e = 1 / h(y((he * ge + L * R) / (g(he * he + L * L) * g(ge * ge + R * R))) / 2), ve = g(I[0] * I[0] + I[1] * I[1]);
						M = v(ie, (d - ve) / (_e - 1)), N = v(ie, (f - ve) / (_e + 1));
					} else M = N = 0;
				}
			}
			te > 1e-12 ? N > 1e-12 ? (P = Cn(pe, me, se, ce, f, N, D), F = Cn(de, fe, le, ue, f, N, D), s.moveTo(P.cx + P.x01, P.cy + P.y01), N < ie ? s.arc(P.cx, P.cy, N, _(P.y01, P.x01), _(F.y01, F.x01), !D) : (s.arc(P.cx, P.cy, N, _(P.y01, P.x01), _(P.y11, P.x11), !D), s.arc(0, 0, f, _(P.cy + P.y11, P.cx + P.x11), _(F.cy + F.y11, F.cx + F.x11), !D), s.arc(F.cx, F.cy, N, _(F.y11, F.x11), _(F.y01, F.x01), !D))) : (s.moveTo(se, ce), s.arc(0, 0, f, O, k, !D)) : s.moveTo(se, ce), !(d > 1e-12) || !(ee > 1e-12) ? s.lineTo(le, ue) : M > 1e-12 ? (P = Cn(le, ue, de, fe, d, -M, D), F = Cn(se, ce, pe, me, d, -M, D), s.lineTo(P.cx + P.x01, P.cy + P.y01), M < ie ? s.arc(P.cx, P.cy, M, _(P.y01, P.x01), _(F.y01, F.x01), !D) : (s.arc(P.cx, P.cy, M, _(P.y01, P.x01), _(P.y11, P.x11), !D), s.arc(0, 0, d, _(P.cy + P.y11, P.cx + P.x11), _(F.cy + F.y11, F.cx + F.x11), D), s.arc(F.cx, F.cy, M, _(F.y11, F.x11), _(F.y01, F.x01), !D))) : s.arc(0, 0, d, j, A, D);
		}
		if (s.closePath(), l) return s = null, l + "" || null;
	}
	return l.centroid = function() {
		var n = (+e.apply(this, arguments) + +t.apply(this, arguments)) / 2, r = (+i.apply(this, arguments) + +a.apply(this, arguments)) / 2 - w / 2;
		return [p(r) * n, h(r) * n];
	}, l.innerRadius = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : d(+t), l) : e;
	}, l.outerRadius = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : d(+e), l) : t;
	}, l.cornerRadius = function(e) {
		return arguments.length ? (n = typeof e == "function" ? e : d(+e), l) : n;
	}, l.padRadius = function(e) {
		return arguments.length ? (r = e == null ? null : typeof e == "function" ? e : d(+e), l) : r;
	}, l.startAngle = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : d(+e), l) : i;
	}, l.endAngle = function(e) {
		return arguments.length ? (a = typeof e == "function" ? e : d(+e), l) : a;
	}, l.padAngle = function(e) {
		return arguments.length ? (o = typeof e == "function" ? e : d(+e), l) : o;
	}, l.context = function(e) {
		return arguments.length ? (s = e ?? null, l) : s;
	}, l;
}
//#endregion
//#region node_modules/d3-shape/src/line.js
function Tn(e, t) {
	var n = d(!0), r = null, i = ue, a = null, o = D(s);
	e = typeof e == "function" ? e : e === void 0 ? O : d(e), t = typeof t == "function" ? t : t === void 0 ? E : d(t);
	function s(s) {
		var c, l = (s = f(s)).length, u, d = !1, p;
		for (r ?? (a = i(p = o())), c = 0; c <= l; ++c) !(c < l && n(u = s[c], c, s)) === d && ((d = !d) ? a.lineStart() : a.lineEnd()), d && a.point(+e(u, c, s), +t(u, c, s));
		if (p) return a = null, p + "" || null;
	}
	return s.x = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : d(+t), s) : e;
	}, s.y = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : d(+e), s) : t;
	}, s.defined = function(e) {
		return arguments.length ? (n = typeof e == "function" ? e : d(!!e), s) : n;
	}, s.curve = function(e) {
		return arguments.length ? (i = e, r != null && (a = i(r)), s) : i;
	}, s.context = function(e) {
		return arguments.length ? (e == null ? r = a = null : a = i(r = e), s) : r;
	}, s;
}
//#endregion
//#region node_modules/d3-shape/src/area.js
function En(e, t, n) {
	var r = null, i = d(!0), a = null, o = ue, s = null, c = D(l);
	e = typeof e == "function" ? e : e === void 0 ? O : d(+e), t = typeof t == "function" ? t : d(t === void 0 ? 0 : +t), n = typeof n == "function" ? n : n === void 0 ? E : d(+n);
	function l(l) {
		var u, d, p, m = (l = f(l)).length, h, g = !1, _, v = Array(m), y = Array(m);
		for (a ?? (s = o(_ = c())), u = 0; u <= m; ++u) {
			if (!(u < m && i(h = l[u], u, l)) === g) {
				if (g = !g) d = u, s.areaStart(), s.lineStart();
				else {
					for (s.lineEnd(), s.lineStart(), p = u - 1; p >= d; --p) s.point(v[p], y[p]);
					s.lineEnd(), s.areaEnd();
				}
			}
			g && (v[u] = +e(h, u, l), y[u] = +t(h, u, l), s.point(r ? +r(h, u, l) : v[u], n ? +n(h, u, l) : y[u]));
		}
		if (_) return s = null, _ + "" || null;
	}
	function u() {
		return Tn().defined(i).curve(o).context(a);
	}
	return l.x = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : d(+t), r = null, l) : e;
	}, l.x0 = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : d(+t), l) : e;
	}, l.x1 = function(e) {
		return arguments.length ? (r = e == null ? null : typeof e == "function" ? e : d(+e), l) : r;
	}, l.y = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : d(+e), n = null, l) : t;
	}, l.y0 = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : d(+e), l) : t;
	}, l.y1 = function(e) {
		return arguments.length ? (n = e == null ? null : typeof e == "function" ? e : d(+e), l) : n;
	}, l.lineX0 = l.lineY0 = function() {
		return u().x(e).y(t);
	}, l.lineY1 = function() {
		return u().x(e).y(n);
	}, l.lineX1 = function() {
		return u().x(r).y(t);
	}, l.defined = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : d(!!e), l) : i;
	}, l.curve = function(e) {
		return arguments.length ? (o = e, a != null && (s = o(a)), l) : o;
	}, l.context = function(e) {
		return arguments.length ? (e == null ? a = s = null : s = o(a = e), l) : a;
	}, l;
}
//#endregion
//#region node_modules/d3-shape/src/descending.js
function Dn(e, t) {
	return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
//#endregion
//#region node_modules/d3-shape/src/identity.js
function On(e) {
	return e;
}
//#endregion
//#region node_modules/d3-shape/src/pie.js
function kn() {
	var e = On, t = Dn, n = null, r = d(0), i = d(b), a = d(0);
	function o(o) {
		var s, c = (o = f(o)).length, l, u, d = 0, p = Array(c), m = Array(c), h = +r.apply(this, arguments), g = Math.min(b, Math.max(-b, i.apply(this, arguments) - h)), _, v = Math.min(Math.abs(g) / c, a.apply(this, arguments)), y = v * (g < 0 ? -1 : 1), x;
		for (s = 0; s < c; ++s) (x = m[p[s] = s] = +e(o[s], s, o)) > 0 && (d += x);
		for (t == null ? n != null && p.sort(function(e, t) {
			return n(o[e], o[t]);
		}) : p.sort(function(e, n) {
			return t(m[e], m[n]);
		}), s = 0, u = d ? (g - c * y) / d : 0; s < c; ++s, h = _) l = p[s], x = m[l], _ = h + (x > 0 ? x * u : 0) + y, m[l] = {
			data: o[l],
			index: s,
			value: x,
			startAngle: h,
			endAngle: _,
			padAngle: v
		};
		return m;
	}
	return o.value = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : d(+t), o) : e;
	}, o.sortValues = function(e) {
		return arguments.length ? (t = e, n = null, o) : t;
	}, o.sort = function(e) {
		return arguments.length ? (n = e, t = null, o) : n;
	}, o.startAngle = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : d(+e), o) : r;
	}, o.endAngle = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : d(+e), o) : i;
	}, o.padAngle = function(e) {
		return arguments.length ? (a = typeof e == "function" ? e : d(+e), o) : a;
	}, o;
}
//#endregion
//#region node_modules/d3-shape/src/curve/radial.js
var An = Mn(ue);
function jn(e) {
	this._curve = e;
}
jn.prototype = {
	areaStart: function() {
		this._curve.areaStart();
	},
	areaEnd: function() {
		this._curve.areaEnd();
	},
	lineStart: function() {
		this._curve.lineStart();
	},
	lineEnd: function() {
		this._curve.lineEnd();
	},
	point: function(e, t) {
		this._curve.point(t * Math.sin(e), t * -Math.cos(e));
	}
};
function Mn(e) {
	function t(t) {
		return new jn(e(t));
	}
	return t._curve = e, t;
}
//#endregion
//#region node_modules/d3-shape/src/lineRadial.js
function Nn(e) {
	var t = e.curve;
	return e.angle = e.x, delete e.x, e.radius = e.y, delete e.y, e.curve = function(e) {
		return arguments.length ? t(Mn(e)) : t()._curve;
	}, e;
}
//#endregion
//#region node_modules/d3-shape/src/areaRadial.js
function Pn() {
	var e = En().curve(An), t = e.curve, n = e.lineX0, r = e.lineX1, i = e.lineY0, a = e.lineY1;
	return e.angle = e.x, delete e.x, e.startAngle = e.x0, delete e.x0, e.endAngle = e.x1, delete e.x1, e.radius = e.y, delete e.y, e.innerRadius = e.y0, delete e.y0, e.outerRadius = e.y1, delete e.y1, e.lineStartAngle = function() {
		return Nn(n());
	}, delete e.lineX0, e.lineEndAngle = function() {
		return Nn(r());
	}, delete e.lineX1, e.lineInnerRadius = function() {
		return Nn(i());
	}, delete e.lineY0, e.lineOuterRadius = function() {
		return Nn(a());
	}, delete e.lineY1, e.curve = function(e) {
		return arguments.length ? t(Mn(e)) : t()._curve;
	}, e;
}
//#endregion
//#region node_modules/d3-hierarchy/src/treemap/round.js
function Fn(e) {
	e.x0 = Math.round(e.x0), e.y0 = Math.round(e.y0), e.x1 = Math.round(e.x1), e.y1 = Math.round(e.y1);
}
//#endregion
//#region node_modules/d3-hierarchy/src/treemap/dice.js
function In(e, t, n, r, i) {
	for (var a = e.children, o, s = -1, c = a.length, l = e.value && (r - t) / e.value; ++s < c;) o = a[s], o.y0 = n, o.y1 = i, o.x0 = t, o.x1 = t += o.value * l;
}
//#endregion
//#region node_modules/d3-hierarchy/src/partition.js
function Ln() {
	var e = 1, t = 1, n = 0, r = !1;
	function i(i) {
		var o = i.height + 1;
		return i.x0 = i.y0 = n, i.x1 = e, i.y1 = t / o, i.eachBefore(a(t, o)), r && i.eachBefore(Fn), i;
	}
	function a(e, t) {
		return function(r) {
			r.children && In(r, r.x0, e * (r.depth + 1) / t, r.x1, e * (r.depth + 2) / t);
			var i = r.x0, a = r.y0, o = r.x1 - n, s = r.y1 - n;
			o < i && (i = o = (i + o) / 2), s < a && (a = s = (a + s) / 2), r.x0 = i, r.y0 = a, r.x1 = o, r.y1 = s;
		};
	}
	return i.round = function(e) {
		return arguments.length ? (r = !!e, i) : r;
	}, i.size = function(n) {
		return arguments.length ? (e = +n[0], t = +n[1], i) : [e, t];
	}, i.padding = function(e) {
		return arguments.length ? (n = +e, i) : n;
	}, i;
}
//#endregion
//#region node_modules/@unovis/ts/types/component.js
var Rn = /* @__PURE__ */ ((e) => (e[e.SVG = 0] = "SVG", e[e.HTML = 1] = "HTML", e))(Rn || {}), Z = /* @__PURE__ */ ((e) => (e.Fit = "fit", e.Extend = "extend", e.FitWidth = "fit_width", e))(Z || {});
//#endregion
//#region node_modules/@unovis/ts/utils/to-px.js
function zn(e) {
	return e = String(e), [parseFloat(e), e.match(/[\d.\-+]*\s*(.*)/)?.[1] || ""];
}
function Bn() {
	return typeof window < "u" && typeof document < "u";
}
function Vn(e, t) {
	let n = zn(getComputedStyle(e).getPropertyValue(t));
	return n[0] * (Gn(n[1], e) ?? 1);
}
function Hn(e, t) {
	let n = document.createElement("div");
	n.style.height = `128${e}`, t.appendChild(n);
	let r = Vn(n, "height") / 128;
	return t.removeChild(n), r;
}
var Un = null;
function Wn() {
	return Bn() ? (Un === null && (Un = 96, Un = Hn("in", document.body)), Un) : 96;
}
function Gn(e, t) {
	if (!e && e !== 0) return null;
	if (!Bn()) {
		let t = zn(String(e));
		if (!isNaN(t[0])) {
			let e = t[1]?.toLowerCase() || "px";
			if (e === "px" || e === "") return t[0];
			if (e === "em" || e === "rem") return t[0] * 16;
			if (e === "in") return t[0] * 96;
			if (e === "cm") return t[0] * (96 / 2.54);
			if (e === "mm") return t[0] * (96 / 25.4);
			if (e === "pt") return t[0] * (96 / 72);
			if (e === "pc") return t[0] * 16;
		}
		return null;
	}
	let n = document.body;
	t && t !== window && t !== document && (n = t);
	let r = (String(e) || "px").trim().toLowerCase();
	switch (r) {
		case "%": return n.clientHeight / 100;
		case "ch":
		case "ex": return Hn(r, n);
		case "em": return Vn(n, "font-size");
		case "rem": return Vn(document.body, "font-size");
		case "vw": return window.innerWidth / 100;
		case "vh": return window.innerHeight / 100;
		case "vmin": return Math.min(window.innerWidth, window.innerHeight) / 100;
		case "vmax": return Math.max(window.innerWidth, window.innerHeight) / 100;
		case "in": return Wn();
		case "cm": return Wn() / 2.54;
		case "mm": return Wn() / 25.4;
		case "pt": return Wn() / 72;
		case "pc": return Wn() / 6;
		case "px": return 1;
	}
	let i = zn(r);
	if (!isNaN(i[0])) {
		if (i[1]) {
			let e = Gn(i[1], n);
			return typeof e == "number" ? i[0] * e : null;
		}
		return i[0];
	}
	return null;
}
//#endregion
//#region node_modules/@unovis/ts/utils/misc.js
function Kn() {
	let e = () => Math.floor((1 + crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0]) * 65536).toString(16).substring(1);
	return `${e() + e()}-${e()}-${e()}-${e()}-${e()}${e()}${e()}`;
}
var qn = /* @__PURE__ */ new WeakMap();
function Jn(e, t) {
	if (!an(e)) return "";
	let n = e.substr(4, e.length - 5), r = qn.get(t);
	if (r || (r = /* @__PURE__ */ new Map(), qn.set(t, r)), r.has(n)) return r.get(n);
	let i = getComputedStyle(t).getPropertyValue(n);
	return r.set(n, i), i;
}
function Yn(e, t) {
	return Gn(Jn(e, t));
}
function Xn(e) {
	return typeof e == "number" ? e : Gn(e);
}
//#endregion
//#region node_modules/@juggle/resize-observer/lib/utils/resizeObservers.js
var Zn = [], Qn = function() {
	return Zn.some(function(e) {
		return e.activeTargets.length > 0;
	});
}, $n = function() {
	return Zn.some(function(e) {
		return e.skippedTargets.length > 0;
	});
}, er = "ResizeObserver loop completed with undelivered notifications.", tr = function() {
	var e;
	typeof ErrorEvent == "function" ? e = new ErrorEvent("error", { message: er }) : (e = document.createEvent("Event"), e.initEvent("error", !1, !1), e.message = er), window.dispatchEvent(e);
}, nr;
(function(e) {
	e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
})(nr ||= {});
//#endregion
//#region node_modules/@juggle/resize-observer/lib/utils/freeze.js
var rr = function(e) {
	return Object.freeze(e);
}, ir = function() {
	function e(e, t) {
		this.inlineSize = e, this.blockSize = t, rr(this);
	}
	return e;
}(), ar = function() {
	function e(e, t, n, r) {
		return this.x = e, this.y = t, this.width = n, this.height = r, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, rr(this);
	}
	return e.prototype.toJSON = function() {
		var e = this;
		return {
			x: e.x,
			y: e.y,
			top: e.top,
			right: e.right,
			bottom: e.bottom,
			left: e.left,
			width: e.width,
			height: e.height
		};
	}, e.fromRect = function(t) {
		return new e(t.x, t.y, t.width, t.height);
	}, e;
}(), or = function(e) {
	return e instanceof SVGElement && "getBBox" in e;
}, sr = function(e) {
	if (or(e)) {
		var t = e.getBBox(), n = t.width, r = t.height;
		return !n && !r;
	}
	var i = e, a = i.offsetWidth, o = i.offsetHeight;
	return !(a || o || e.getClientRects().length);
}, cr = function(e) {
	if (e instanceof Element) return !0;
	var t = e?.ownerDocument?.defaultView;
	return !!(t && e instanceof t.Element);
}, lr = function(e) {
	switch (e.tagName) {
		case "INPUT": if (e.type !== "image") break;
		case "VIDEO":
		case "AUDIO":
		case "EMBED":
		case "OBJECT":
		case "CANVAS":
		case "IFRAME":
		case "IMG": return !0;
	}
	return !1;
}, ur = typeof window < "u" ? window : {}, dr = /* @__PURE__ */ new WeakMap(), fr = /auto|scroll/, pr = /^tb|vertical/, mr = /msie|trident/i.test(ur.navigator && ur.navigator.userAgent), Q = function(e) {
	return parseFloat(e || "0");
}, hr = function(e, t, n) {
	return e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = !1), new ir((n ? t : e) || 0, (n ? e : t) || 0);
}, gr = rr({
	devicePixelContentBoxSize: hr(),
	borderBoxSize: hr(),
	contentBoxSize: hr(),
	contentRect: new ar(0, 0, 0, 0)
}), _r = function(e, t) {
	if (t === void 0 && (t = !1), dr.has(e) && !t) return dr.get(e);
	if (sr(e)) return dr.set(e, gr), gr;
	var n = getComputedStyle(e), r = or(e) && e.ownerSVGElement && e.getBBox(), i = !mr && n.boxSizing === "border-box", a = pr.test(n.writingMode || ""), o = !r && fr.test(n.overflowY || ""), s = !r && fr.test(n.overflowX || ""), c = r ? 0 : Q(n.paddingTop), l = r ? 0 : Q(n.paddingRight), u = r ? 0 : Q(n.paddingBottom), d = r ? 0 : Q(n.paddingLeft), f = r ? 0 : Q(n.borderTopWidth), p = r ? 0 : Q(n.borderRightWidth), m = r ? 0 : Q(n.borderBottomWidth), h = r ? 0 : Q(n.borderLeftWidth), g = d + l, _ = c + u, v = h + p, y = f + m, b = s ? e.offsetHeight - y - e.clientHeight : 0, x = o ? e.offsetWidth - v - e.clientWidth : 0, S = i ? g + v : 0, C = i ? _ + y : 0, w = r ? r.width : Q(n.width) - S - x, T = r ? r.height : Q(n.height) - C - b, E = w + g + x + v, D = T + _ + b + y, O = rr({
		devicePixelContentBoxSize: hr(Math.round(w * devicePixelRatio), Math.round(T * devicePixelRatio), a),
		borderBoxSize: hr(E, D, a),
		contentBoxSize: hr(w, T, a),
		contentRect: new ar(d, c, w, T)
	});
	return dr.set(e, O), O;
}, vr = function(e, t, n) {
	var r = _r(e, n), i = r.borderBoxSize, a = r.contentBoxSize, o = r.devicePixelContentBoxSize;
	switch (t) {
		case nr.DEVICE_PIXEL_CONTENT_BOX: return o;
		case nr.BORDER_BOX: return i;
		default: return a;
	}
}, yr = function() {
	function e(e) {
		var t = _r(e);
		this.target = e, this.contentRect = t.contentRect, this.borderBoxSize = rr([t.borderBoxSize]), this.contentBoxSize = rr([t.contentBoxSize]), this.devicePixelContentBoxSize = rr([t.devicePixelContentBoxSize]);
	}
	return e;
}(), br = function(e) {
	if (sr(e)) return Infinity;
	for (var t = 0, n = e.parentNode; n;) t += 1, n = n.parentNode;
	return t;
}, xr = function() {
	var e = Infinity, t = [];
	Zn.forEach(function(n) {
		if (n.activeTargets.length !== 0) {
			var r = [];
			n.activeTargets.forEach(function(t) {
				var n = new yr(t.target), i = br(t.target);
				r.push(n), t.lastReportedSize = vr(t.target, t.observedBox), i < e && (e = i);
			}), t.push(function() {
				n.callback.call(n.observer, r, n.observer);
			}), n.activeTargets.splice(0, n.activeTargets.length);
		}
	});
	for (var n = 0, r = t; n < r.length; n++) {
		var i = r[n];
		i();
	}
	return e;
}, Sr = function(e) {
	Zn.forEach(function(t) {
		t.activeTargets.splice(0, t.activeTargets.length), t.skippedTargets.splice(0, t.skippedTargets.length), t.observationTargets.forEach(function(n) {
			n.isActive() && (br(n.target) > e ? t.activeTargets.push(n) : t.skippedTargets.push(n));
		});
	});
}, Cr = function() {
	var e = 0;
	for (Sr(e); Qn();) e = xr(), Sr(e);
	return $n() && tr(), e > 0;
}, wr, Tr = [], Er = function() {
	return Tr.splice(0).forEach(function(e) {
		return e();
	});
}, Dr = function(e) {
	if (!wr) {
		var t = 0, n = document.createTextNode("");
		new MutationObserver(function() {
			return Er();
		}).observe(n, { characterData: !0 }), wr = function() {
			n.textContent = `${t ? t-- : t++}`;
		};
	}
	Tr.push(e), wr();
}, Or = function(e) {
	Dr(function() {
		requestAnimationFrame(e);
	});
}, kr = 0, Ar = function() {
	return !!kr;
}, jr = 250, Mr = {
	attributes: !0,
	characterData: !0,
	childList: !0,
	subtree: !0
}, Nr = [
	"resize",
	"load",
	"transitionend",
	"animationend",
	"animationstart",
	"animationiteration",
	"keyup",
	"keydown",
	"mouseup",
	"mousedown",
	"mouseover",
	"mouseout",
	"blur",
	"focus"
], Pr = function(e) {
	return e === void 0 && (e = 0), Date.now() + e;
}, Fr = !1, Ir = new (function() {
	function e() {
		var e = this;
		this.stopped = !0, this.listener = function() {
			return e.schedule();
		};
	}
	return e.prototype.run = function(e) {
		var t = this;
		if (e === void 0 && (e = jr), !Fr) {
			Fr = !0;
			var n = Pr(e);
			Or(function() {
				var r = !1;
				try {
					r = Cr();
				} finally {
					if (Fr = !1, e = n - Pr(), !Ar()) return;
					r ? t.run(1e3) : e > 0 ? t.run(e) : t.start();
				}
			});
		}
	}, e.prototype.schedule = function() {
		this.stop(), this.run();
	}, e.prototype.observe = function() {
		var e = this, t = function() {
			return e.observer && e.observer.observe(document.body, Mr);
		};
		document.body ? t() : ur.addEventListener("DOMContentLoaded", t);
	}, e.prototype.start = function() {
		var e = this;
		this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), Nr.forEach(function(t) {
			return ur.addEventListener(t, e.listener, !0);
		}));
	}, e.prototype.stop = function() {
		var e = this;
		this.stopped ||= (this.observer && this.observer.disconnect(), Nr.forEach(function(t) {
			return ur.removeEventListener(t, e.listener, !0);
		}), !0);
	}, e;
}())(), Lr = function(e) {
	!kr && e > 0 && Ir.start(), kr += e, !kr && Ir.stop();
}, Rr = function(e) {
	return !or(e) && !lr(e) && getComputedStyle(e).display === "inline";
}, zr = function() {
	function e(e, t) {
		this.target = e, this.observedBox = t || nr.CONTENT_BOX, this.lastReportedSize = {
			inlineSize: 0,
			blockSize: 0
		};
	}
	return e.prototype.isActive = function() {
		var e = vr(this.target, this.observedBox, !0);
		return Rr(this.target) && (this.lastReportedSize = e), this.lastReportedSize.inlineSize !== e.inlineSize || this.lastReportedSize.blockSize !== e.blockSize;
	}, e;
}(), Br = function() {
	function e(e, t) {
		this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = e, this.callback = t;
	}
	return e;
}(), Vr = /* @__PURE__ */ new WeakMap(), Hr = function(e, t) {
	for (var n = 0; n < e.length; n += 1) if (e[n].target === t) return n;
	return -1;
}, Ur = function() {
	function e() {}
	return e.connect = function(e, t) {
		var n = new Br(e, t);
		Vr.set(e, n);
	}, e.observe = function(e, t, n) {
		var r = Vr.get(e), i = r.observationTargets.length === 0;
		Hr(r.observationTargets, t) < 0 && (i && Zn.push(r), r.observationTargets.push(new zr(t, n && n.box)), Lr(1), Ir.schedule());
	}, e.unobserve = function(e, t) {
		var n = Vr.get(e), r = Hr(n.observationTargets, t), i = n.observationTargets.length === 1;
		r >= 0 && (i && Zn.splice(Zn.indexOf(n), 1), n.observationTargets.splice(r, 1), Lr(-1));
	}, e.disconnect = function(e) {
		var t = this, n = Vr.get(e);
		n.observationTargets.slice().forEach(function(n) {
			return t.unobserve(e, n.target);
		}), n.activeTargets.splice(0, n.activeTargets.length);
	}, e;
}(), Wr = function() {
	function e(e) {
		if (arguments.length === 0) throw TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
		if (typeof e != "function") throw TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
		Ur.connect(this, e);
	}
	return e.prototype.observe = function(e, t) {
		if (arguments.length === 0) throw TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
		if (!cr(e)) throw TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
		Ur.observe(this, e, t);
	}, e.prototype.unobserve = function(e) {
		if (arguments.length === 0) throw TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
		if (!cr(e)) throw TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
		Ur.unobserve(this, e);
	}, e.prototype.disconnect = function() {
		Ur.disconnect(this);
	}, e.toString = function() {
		return "function ResizeObserver () { [polyfill code] }";
	}, e;
}(), Gr = globalThis.ResizeObserver || Wr, Kr = {
	duration: void 0,
	margin: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	padding: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	sizing: Z.Fit,
	width: void 0,
	height: void 0,
	svgDefs: void 0,
	ariaLabel: void 0,
	colorFunction: void 0
}, qr = class e {
	constructor(t) {
		this._defaultConfig = Kr, this._isFirstRender = !0, this._renderAnimationFrameId = null, this._container = t;
		let n = c(this._container);
		n.attr("role", "figure"), this.svg = n.append("svg").style("display", "block").attr("xmlns", "http://www.w3.org/2000/svg").attr("height", e.DEFAULT_CONTAINER_HEIGHT).attr("aria-hidden", !0), this._svgDefs = this.svg.append("defs"), this._svgDefsExternal = this.svg.append("defs"), this.element = this.svg.node();
	}
	updateContainer(e) {
		this.prevConfig = this.config, this.config = fn(this._defaultConfig, e), e?.svgDefs !== this.prevConfig?.svgDefs && (this._svgDefsExternal.selectAll("*").remove(), this._svgDefsExternal.html(e.svgDefs));
	}
	_preRender() {}
	_propagateSizeAndStyleToComponents(e, t) {
		for (let n of e) n && (n.setSize(this.width, this.height, this.containerWidth, this.containerHeight), n.setContainerMargin(t), n.setColorFunction(this.config.colorFunction));
	}
	_render(e) {
		let { config: t } = this;
		c(this._container).attr("aria-label", t.ariaLabel), this._isFirstRender = !1;
	}
	render(e = this.config.duration) {
		let t = this.config.width || this.containerWidth, n = this.config.height || this.containerHeight;
		this.svg.attr("width", t).attr("height", n), this._resizeObserver || this._setUpResizeObserver(), cancelAnimationFrame(this._renderAnimationFrameId), this._renderAnimationFrameId = requestAnimationFrame(() => {
			this._preRender(), this._render(e);
		});
	}
	get containerWidth() {
		return this.config.width ? this.element.clientWidth || Xn(this.config.width) || 0 : this._container.clientWidth || this._container.getBoundingClientRect().width;
	}
	get containerHeight() {
		return this.config.height ? this.element.clientHeight || Xn(this.config.height) || 0 : this._container.clientHeight || this._container.getBoundingClientRect().height || e.DEFAULT_CONTAINER_HEIGHT;
	}
	get width() {
		return gn(this.containerWidth - this.config.margin.left - this.config.margin.right, 0, Infinity);
	}
	get height() {
		return gn(this.containerHeight - this.config.margin.top - this.config.margin.bottom, 0, Infinity);
	}
	_removeAllChildren() {
		for (; this.element.firstChild;) this.element.removeChild(this.element.firstChild);
	}
	_reconcileChildren(e) {
		let t = e.filter(Boolean), n = new Set(t), r = this.element.firstChild;
		for (; r;) {
			let e = r.nextSibling;
			n.has(r) || this.element.removeChild(r), r = e;
		}
		let i = this.element.firstChild;
		for (let e of t) e === i ? i = i.nextSibling : this.element.insertBefore(e, i);
	}
	_onResize() {
		let { config: e } = this;
		(e.sizing === Z.Fit || e.sizing === Z.FitWidth) && this.render(0);
	}
	_setUpResizeObserver() {
		if (this._resizeObserver) return;
		let e = this._container.getBoundingClientRect();
		this._containerSize = {
			width: e.width,
			height: e.height
		}, this._resizeObserver = new Gr((e, t) => {
			cancelAnimationFrame(this._resizeObserverAnimationFrameId), this._resizeObserverAnimationFrameId = requestAnimationFrame(() => {
				let e = this._container.getBoundingClientRect(), t = {
					width: e.width,
					height: e.height
				};
				!un(this._containerSize, t) && t.width && t.height && (this._containerSize = t, this._onResize());
			});
		}), this._resizeObserver.observe(this._container);
	}
	destroy() {
		cancelAnimationFrame(this._renderAnimationFrameId), cancelAnimationFrame(this._resizeObserverAnimationFrameId), this._resizeObserver?.disconnect(), this.svg.remove();
	}
};
qr.DEFAULT_CONTAINER_HEIGHT = 300;
var Jr = qr, Yr = "html[data-theme=\"dark\"],html.dark-theme,body.dark-theme,html.theme-dark,body.theme-dark", Xr = globalThis?.UNOVIS_COLORS || [
	"#4D8CFD",
	"#FF6B7E",
	"#F4B83E",
	"#A6CC74",
	"#00C19A",
	"#6859BE"
], Zr = globalThis?.UNOVIS_COLORS_DARK || [
	"#4D8CFD",
	"#FF6B7E",
	"#FFC16D",
	"#A6CC74",
	"#00C19A",
	"#7887E0"
], Qr = (e) => `--vis-${tn(e) ? `color${e % Xr.length}` : e}`;
function $r(e, t = .4) {
	let n = u(e);
	return n.l *= 1 + t, n.formatHex();
}
function ei(e, t = .4, n = .6) {
	let r = u(e);
	return r.s *= 1 - n, r.l *= 1 - t, r.formatHex();
}
var ti = [
	{
		id: "stripes-diagonal",
		svg: "<path d=\"M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2\" stroke=\"#000\"/>"
	},
	{
		id: "dots",
		svg: "<path d=\"m0-1.5a1 1 0 010 3m10-3a1 1 0 000 3M5 3.5a1 1 0 010 3 1 1 0 010-3M0 8.5 a1 1 0 010 3m10-3a1 1 0 000 3\" fill\"#000\"/>"
	},
	{
		id: "stripes-vertical",
		svg: "<path d=\"M 5,-1 L5,11\" stroke=\"#000\"/>"
	},
	{
		id: "crosshatch",
		svg: "<path d=\"M0 0L10 10ZM10 0L0 10Z\" stroke=\"#000\"/>"
	},
	{
		id: "waves",
		svg: "<path d=\"M0 4Q2.5 1 5 4 7.5 7 10 4v2Q7.5 9 5 6 2.5 3 0 6Z\" fill=\"#000\"/>"
	},
	{
		id: "circles",
		svg: "<circle cx=\"5\" cy=\"5\" r=\"3\" stroke=\"#000\" fill=\"#fff\"/>"
	}
], ni = [
	{
		id: "circle",
		marker: "<circle cx=\"5\" cy=\"5\" r=\"5\"/>",
		dashArray: []
	},
	{
		id: "triangle",
		marker: "<path d=\"M5,0 L10,9 L0,9Z\">",
		dashArray: [9, 1]
	},
	{
		id: "diamond",
		marker: "<path d=\"M 0 5 L5 0 L 10 5 L 5 10 L 0 5Z\">",
		dashArray: [2]
	},
	{
		id: "arrow",
		marker: "<path d=\"M4 0 0 0 6 5 0 10 4 10 10 5Z\">",
		dashArray: [
			2,
			3,
			8,
			3
		]
	},
	{
		id: "square",
		marker: "<rect x=\"1\" y=\"1\" width=\"8\" height=\"8\"/>",
		dashArray: [6]
	},
	{
		id: "star",
		marker: "<path d=\"m2 9 3-9 3 9L0 3h10Z\"/>",
		dashArray: [1, 6]
	}
], ri = new Map(ti.map((e) => [e.id, e])), ii = new Map(ni.map((e) => [e.id, e]));
function ai(e) {
	return `vis-${`pattern-${e.svg ? "fill" : "marker"}`}-${e.id}`;
}
function oi(e) {
	return `vis-pattern-fill-${e}`;
}
function si(e) {
	return `vis-pattern-marker-${e}`;
}
function ci(e) {
	return `vis-pattern-marker-ctx-${e}`;
}
function li(e) {
	return ri.get(e) ?? ii.get(e) ?? null;
}
var ui = (e) => `<mask id="${oi(e.id)}">
    <pattern id="vis-pattern-tile-${e.id}" viewBox="0 0 10 10" width="10" height="10" patternUnits="userSpaceOnUse">
      <rect width="10" height="10" fill="#fff"/>
      ${e.svg}
    </pattern>
    <rect x="-100000" y="-100000" width="200000" height="200000" fill="url(#vis-pattern-tile-${e.id})"/>
  </mask>`, di = (e, t) => `<marker id="${si(e.id)}"
    fill="var(${Qr(t)})"
    markerUnits="userSpaceOnUse"
    refX="5"
    refY="5"
    markerWidth="10"
    markerHeight="10">
    ${e.marker}
  </marker>`, fi = (e) => `<marker id="${ci(e.id)}"
    fill="context-stroke"
    markerUnits="userSpaceOnUse"
    refX="5"
    refY="5"
    markerWidth="10"
    markerHeight="10">
    ${e.marker}
  </marker>`;
function pi() {
	let e = ni.map((e, t) => di(e, t)).concat(ni.map(fi)), t = ti.map(ui).concat(e).join(""), n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	n.setAttribute("height", "0"), n.setAttribute("width", "0"), n.style.position = "fixed", n.style.zIndex = "-99999999", n.innerHTML = `<defs>${t}</defs>`, document.body.appendChild(n);
}
typeof window < "u" && pi();
//#endregion
//#region node_modules/@unovis/ts/utils/color.js
var mi = a().range(Array.from({ length: Xr.length }, (e, t) => `var(${Qr(t)})`)).domain(Array.from({ length: Xr.length }, (e, t) => t));
function hi(e, t, n, r, i) {
	if (Array.isArray(t) && isFinite(n)) return t[n % t.length];
	let a;
	if (a = nn(t) ? t(e, n, r) : t, a) return a;
	let o = i?.colorFn ?? mi;
	if (typeof r == "string" && r) return o(r);
	let s = i?.dontFallbackToCssVar ?? r === !0;
	return tn(n) && !s ? o(n % Xr.length) : null;
}
function gi(e) {
	let t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
	return t ? {
		r: parseInt(t[1], 16),
		g: parseInt(t[2], 16),
		b: parseInt(t[3], 16)
	} : {
		r: 0,
		g: 0,
		b: 0
	};
}
function _i(e) {
	return (.2126 * e.r + .7152 * e.g + .0722 * e.b) / 255;
}
function vi(e) {
	return _i(gi(e));
}
//#endregion
//#region node_modules/@unovis/ts/utils/pattern.js
var yi = "unovis-pattern-index";
function bi(e, t, n) {
	let r = Y(e, t, n);
	return r ? li(r) : null;
}
function xi(e) {
	return !e || !("svg" in e) ? null : `url(#${oi(e.id)})`;
}
globalThis?.UNOVIS_ICON_FONT_FAMILY;
var Si = globalThis?.UNOVIS_FONT_W2H_RATIO_DEFAULT || .5;
globalThis?.UNOVIS_TEXT_SEPARATOR_DEFAULT, globalThis?.UNOVIS_TEXT_HYPHEN_CHARACTER_DEFAULT;
var Ci = globalThis?.UNOVIS_TEXT_DEFAULT_FONT_SIZE || 12, wi = globalThis?.UNOVIS_TEXT_DEFAULT || {
	text: "",
	fontSize: Ci,
	fontFamily: "var(--vis-font-family)",
	lineHeight: 1.25,
	marginTop: 0,
	marginBottom: 0
};
Xt`
  :root {
    label: vis-root-styles;
    --vis-font-family: Inter, Arial, "Helvetica Neue", Helvetica, sans-serif;
    --vis-font-wh-ratio: ${Si};
    --vis-color-main: var(${Qr(0)});
    --vis-color-main-light: ${$r(Xr[0])};
    --vis-color-main-dark: ${ei(Xr[0])};
    --vis-color-grey: #2a2a2a;
    ${Xr.map((e, t) => `${Qr(t)}: ${e};`)}
    ${Zr.map((e, t) => `--vis-dark-color${t}: ${e};`)}
    ${ti.map((e, t) => `
      --${ai(e)}: url(#${ai(e)});
      --vis-pattern-fill${t}: var(--${ai(e)});
    `)}
    ${ni.map((e, t) => `
      --${ai(e)}: url(#${ai(e)});
      --vis-pattern-marker${t}: var(--${ai(e)});
      --vis-pattern-dasharray${t}: ${e.dashArray?.join(" ")};
    `)}

    ${Yr} {
      ${Xr.map((e, t) => `${Qr(t)}: var(--vis-dark-color${t});`)}
    }

    body.theme-patterns {
      ${ti.map((e, t) => `path[${yi}="${t}"][style*="fill"]:not([style*="mask"]) {
        mask: var(--vis-pattern-fill${t});
      }`)}
      ${ni.map((e, t) => `
      path[${yi}="${t}"]:not([style*="fill"]):not([style*="marker"]) {
        marker: var(--vis-pattern-marker${t});
        stroke-dasharray: var(--vis-pattern-dasharray${t});
      }
    `)}
}
`;
function Ti(e = window?.document.body) {
	return e ? +Jn("var(--vis-font-wh-ratio)", e) : Si;
}
//#endregion
//#region node_modules/@unovis/ts/types/text.js
var Ei = /* @__PURE__ */ ((e) => (e.Start = "start", e.Middle = "middle", e.End = "end", e))(Ei || {}), Di = 5e3;
function Oi(e, t, n) {
	if (e.size >= Di && !e.has(t)) {
		let t = e.keys().next().value;
		t !== void 0 && e.delete(t);
	}
	e.set(t, n);
}
//#endregion
//#region node_modules/@unovis/ts/utils/text-measure.js
var ki = "", Ai = /* @__PURE__ */ new Map(), ji = /* @__PURE__ */ new WeakMap(), Mi = /* @__PURE__ */ new Map(), Ni = globalThis?.document?.createElement("canvas").getContext("2d") ?? null, Pi = (e, t) => `${t}${ki}${e}`;
function Fi() {
	Ai.clear(), Mi.clear();
}
globalThis?.document?.fonts?.ready?.then(Fi);
function Ii(e, t, n = Ti()) {
	return e.length * t * n || 0;
}
function Li(e, t) {
	if (Ni) return Ni.font !== t && (Ni.font = t), Ni.measureText(e).width;
	let n = /(\d*\.?\d+)(px|pt|pc|rem|em|ex|ch|cm|mm|in|vmin|vmax|vw|vh|%)/.exec(t)?.[0];
	return Ii(e, Gn(n) ?? Ci, Ti());
}
function Ri(e) {
	let t = "", n = e;
	for (; n && (t += `${ki}${n.getAttribute("class") || ""};${n.getAttribute("style") || ""}`, n.localName !== "svg");) n = n.parentElement;
	return t;
}
function zi(e) {
	let t = ji.get(e);
	if (t) return t;
	let n = Ri(e);
	if (t = Mi.get(n), t) return ji.set(e, t), t;
	let r = window.getComputedStyle(e), i = r.fontSize || `${Ci}px`, a = r.fontFamily || "sans-serif";
	return t = {
		font: `${r.fontStyle || "normal"} ${r.fontWeight || "normal"} ${i} ${a}`,
		fontFamily: a,
		fontSizePx: Gn(i)
	}, Oi(Mi, n, t), ji.set(e, t), t;
}
function Bi(e) {
	let t = e.textContent || "", { font: n } = zi(e), r = Pi(t, n), i = Ai.get(r);
	if (i !== void 0) return i;
	let a = Ni ? Li(t, n) : e.getComputedTextLength();
	return Oi(Ai, r, a), a;
}
//#endregion
//#region node_modules/@unovis/ts/utils/text.js
function Vi(e, t = 15) {
	return e ? e.length > t ? `…${e.substr(e.length - t, t)}` : e : "";
}
function Hi(e, t = 15) {
	if (!e) return "";
	let n = Math.floor((t - 3) / 2);
	return e.length > t ? `${e.substr(0, n)}…${e.substr(-n, n)}` : e;
}
function Ui(e, t = 15) {
	return e ? e.length > t ? `${e.substr(0, t)}…` : e : "";
}
function Wi(e, t = 15, n = Ei.Middle) {
	if (!e) return "";
	let r = Ui(e, t);
	return n === Ei.Start ? r = Vi(e, t) : n === Ei.Middle && (r = Hi(e, t)), r;
}
function Gi(e, t = 50, n = Ei.Middle, r = !1, i = Gn(window.getComputedStyle(e.node())?.fontSize || wi.fontSize), a = Ti()) {
	let o = e.text() || "", s = o.length;
	if (!s) return !1;
	if (r) {
		let r = Ii(o, i, a), c = Math.ceil(s * t / (1.1 * r));
		return c < s && (e.text(Wi(o, c, n)), !0);
	}
	let c = e.node();
	if (Bi(c) <= t) return !1;
	let l = 0, u = s, d = 0;
	for (; l <= u;) {
		let r = l + u >> 1;
		e.text(Wi(o, r, n)), Bi(c) <= t ? (d = r, l = r + 1) : u = r - 1;
	}
	return e.text(Wi(o, d, n)), !0;
}
//#endregion
//#region node_modules/@unovis/ts/utils/d3.js
function Ki(e, t, n) {
	if (e.nodes().forEach((e) => s(e)), t) {
		let r = e.transition().duration(t);
		return n && r.ease(n), r;
	}
	return e;
}
//#endregion
//#region node_modules/@unovis/ts/containers/single-container/config.js
var qi = {
	...Kr,
	tooltip: void 0,
	annotations: void 0
}, Ji = class extends Jr {
	constructor(e, t, n) {
		super(e), this._defaultConfig = qi, this.config = this._defaultConfig, t && (this.updateContainer(t, !0), this.component = t.component), n && this.setData(n, !0), this.component?.datamodel.data && this.render();
	}
	setData(e, t) {
		let { config: n } = this, r = this.component?.datamodel.data !== e;
		this.component && this.component.setData(e), t || this.render(), r && n.tooltip?.hide();
	}
	updateContainer(e, t) {
		super.updateContainer(e), this.component = e.component, e.sizing && (this.component.sizing = e.sizing);
		let n = e.tooltip;
		n && (n.hasContainer() || n.setContainer(this._container), n.setComponents([this.component])), this._reconcileChildren([
			this.component?.element,
			e.annotations?.element,
			this._svgDefs.node(),
			this._svgDefsExternal.node()
		]), t || this.render();
	}
	updateComponent(e, t) {
		this.component.setConfig(e), t || this.render();
	}
	update(e, t, n) {
		e && this.updateContainer(e, !0), t && this.updateComponent(t, !0), n && this.setData(n, !0), this.render();
	}
	getFitWidthScale() {
		let { config: e, component: t } = this, n = t;
		if (!n.getWidth) return 1;
		let r = n.getWidth() + e.margin.left + e.margin.right;
		return this.width / r;
	}
	_preRender() {
		let { config: e } = this;
		super._preRender(), this._propagateSizeAndStyleToComponents([this.component, e.annotations], e.margin);
	}
	_render(e) {
		let { config: t, component: n } = this;
		super._render(e), n.g.attr("transform", `translate(${t.margin.left},${t.margin.top})`), n.render(e), t.annotations?.render(e), t.tooltip && t.tooltip.update(), t.onRenderComplete?.(this.svg.node(), t.margin, this.containerWidth, this.containerHeight, this.width, this.height);
	}
	render(e = this.config.duration) {
		let { config: t, component: n } = this;
		if (t.sizing === Z.Extend || t.sizing === Z.FitWidth) {
			let r = t.sizing === Z.FitWidth, i = n, a = i.getWidth() + t.margin.left + t.margin.right, o = i.getHeight() + t.margin.top + t.margin.bottom, s = r ? this.getFitWidthScale() : 1, c = this.svg.attr("width"), l = this.svg.attr("height"), u = a * s, d = o * s, f = c || l;
			Ki(this.svg, f ? e : 0).attr("width", u).attr("height", d).attr("viewBox", `0 0 ${a} ${r ? d : o}`).attr("preserveAspectRatio", "xMinYMin");
		} else this.svg.attr("width", this.config.width || this.containerWidth).attr("height", this.config.height || this.containerHeight);
		this._resizeObserver || this._setUpResizeObserver(), cancelAnimationFrame(this._renderAnimationFrameId), this._renderAnimationFrameId = requestAnimationFrame(() => {
			this._preRender(), this._render(e);
		});
	}
	_onResize() {
		let { config: e } = this;
		super._onResize(), e.tooltip?.hide();
	}
	destroy() {
		let { component: e, config: t } = this;
		super.destroy(), e?.destroy(), t.tooltip?.destroy(), t.annotations?.destroy();
	}
}, Yi = class {
	get data() {
		return this._data;
	}
	set data(e) {
		this._data = e;
	}
	constructor(e) {
		this.data = e;
	}
}, Xi = {
	duration: 600,
	events: {},
	attributes: {}
}, Zi = class {
	constructor(e = Rn.SVG) {
		this.type = Rn.SVG, this.datamodel = new Yi(), this.sizing = Z.Fit, this.events = {}, this._defaultConfig = Xi, this._width = 400, this._height = 200, this._containerWidth = void 0, this._containerHeight = void 0, this._containerMargin = {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0
		}, this._colorFunction = void 0, this._setUpComponentEventsThrottled = mn(this._setUpComponentEvents, 500), this._setCustomAttributesThrottled = mn(this._setCustomAttributes, 500), this.element = e === Rn.SVG ? document.createElementNS("http://www.w3.org/2000/svg", "g") : document.createElement("div"), this.uid = Kn(), this.g = c(this.element);
		let t = this.constructor?.selectors?.root;
		t && this.g.attr("class", t);
	}
	setContainerMargin(e) {
		this._containerMargin = e;
	}
	setColorFunction(e) {
		this._colorFunction = e;
	}
	setConfig(e) {
		this.prevConfig = this.config, this.config = fn(this._defaultConfig, e);
	}
	setData(e) {
		this.datamodel.data = e;
	}
	setSize(e, t, n, r) {
		isFinite(e) && (this._width = e), isFinite(t) && (this._height = t), isFinite(n) && (this._containerWidth = n), isFinite(r) && (this._containerHeight = r);
	}
	render(e = this.config.duration) {
		this._render(e);
		let t = "animating";
		e && (this.g.attr(t, ""), this.g.transition(t).duration(e).on("end interrupt", () => {
			this.g.attr(t, null);
		})), this._setUpComponentEventsThrottled(), this._setCustomAttributesThrottled();
	}
	get bleed() {
		return {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0
		};
	}
	_render(e = this.config.duration) {}
	_setCustomAttributes() {
		let e = this.config.attributes;
		Object.keys(e).forEach((t) => {
			Object.keys(e[t]).forEach((n) => {
				this.g.selectAll(`.${t}`).attr(n, e[t][n]);
			});
		});
	}
	_setUpComponentEvents() {
		this._bindEvents(() => this.events), this._bindEvents(() => this.config.events, ".user");
	}
	_mapEventDatum(e, t) {
		return {
			datum: e,
			index: t
		};
	}
	_bindEvents(e, t = "") {
		let n = e() ?? {};
		Object.keys(n).forEach((r) => {
			Object.keys(n[r]).forEach((n) => {
				let i = this.g.selectAll(`.${r}`), a = i.nodes();
				i.on(n + t, (t, i) => {
					let o = e()?.[r]?.[n];
					if (!o) return;
					let s = a.indexOf(t.currentTarget), { datum: c, index: l } = this._mapEventDatum(i, s);
					return o(c, t, l, a);
				});
			});
		});
	}
	_onDestroy() {}
	destroy() {
		this.isDestroyed() || (this._onDestroy(), this.g?.remove(), this.element = void 0);
	}
	isDestroyed() {
		return !this.element;
	}
};
//#endregion
//#region node_modules/d3-interpolate-path/build/d3-interpolate-path.mjs
function Qi(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function $i(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Qi(Object(n), !0).forEach(function(t) {
			ta(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Qi(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ea(e) {
	"@babel/helpers - typeof";
	return ea = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, ea(e);
}
function ta(e, t, n) {
	return t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function na() {
	return na = Object.assign || function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, na.apply(this, arguments);
}
function ra(e, t) {
	if (e) {
		if (typeof e == "string") return ia(e, t);
		var n = Object.prototype.toString.call(e).slice(8, -1);
		if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
		if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ia(e, t);
	}
}
function ia(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function aa(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (!n) {
		if (Array.isArray(e) || (n = ra(e)) || t && e && typeof e.length == "number") {
			n && (e = n);
			var r = 0, i = function() {};
			return {
				s: i,
				n: function() {
					return r >= e.length ? { done: !0 } : {
						done: !1,
						value: e[r++]
					};
				},
				e: function(e) {
					throw e;
				},
				f: i
			};
		}
		throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	var a = !0, o = !1, s;
	return {
		s: function() {
			n = n.call(e);
		},
		n: function() {
			var e = n.next();
			return a = e.done, e;
		},
		e: function(e) {
			o = !0, s = e;
		},
		f: function() {
			try {
				!a && n.return != null && n.return();
			} finally {
				if (o) throw s;
			}
		}
	};
}
function oa(e, t) {
	var n = [], r = [];
	function i(e, t) {
		if (e.length === 1) n.push(e[0]), r.push(e[0]);
		else {
			for (var a = Array(e.length - 1), o = 0; o < a.length; o++) o === 0 && n.push(e[0]), o === a.length - 1 && r.push(e[o + 1]), a[o] = [(1 - t) * e[o][0] + t * e[o + 1][0], (1 - t) * e[o][1] + t * e[o + 1][1]];
			i(a, t);
		}
	}
	return e.length && i(e, t), {
		left: n,
		right: r.reverse()
	};
}
function sa(e) {
	var t = {};
	return e.length === 4 && (t.x2 = e[2][0], t.y2 = e[2][1]), e.length >= 3 && (t.x1 = e[1][0], t.y1 = e[1][1]), t.x = e[e.length - 1][0], t.y = e[e.length - 1][1], t.type = e.length === 4 ? "C" : e.length === 3 ? "Q" : "L", t;
}
function ca(e, t) {
	t ||= 2;
	for (var n = [], r = e, i = 1 / t, a = 0; a < t - 1; a++) {
		var o = i / (1 - i * a), s = oa(r, o);
		n.push(s.left), r = s.right;
	}
	return n.push(r), n;
}
function la(e, t, n) {
	var r = [[e.x, e.y]];
	return t.x1 != null && r.push([t.x1, t.y1]), t.x2 != null && r.push([t.x2, t.y2]), r.push([t.x, t.y]), ca(r, n).map(sa);
}
var ua = /[MLCSTQAHVZmlcstqahv]|-?[\d.e+-]+/g, da = {
	M: ["x", "y"],
	L: ["x", "y"],
	H: ["x"],
	V: ["y"],
	C: [
		"x1",
		"y1",
		"x2",
		"y2",
		"x",
		"y"
	],
	S: [
		"x2",
		"y2",
		"x",
		"y"
	],
	Q: [
		"x1",
		"y1",
		"x",
		"y"
	],
	T: ["x", "y"],
	A: [
		"rx",
		"ry",
		"xAxisRotation",
		"largeArcFlag",
		"sweepFlag",
		"x",
		"y"
	],
	Z: []
};
Object.keys(da).forEach(function(e) {
	da[e.toLowerCase()] = da[e];
});
function fa(e, t) {
	for (var n = Array(e), r = 0; r < e; r++) n[r] = t;
	return n;
}
function pa(e) {
	return `${e.type}${da[e.type].map(function(t) {
		return e[t];
	}).join(",")}`;
}
function ma(e, t) {
	var n = {
		x1: "x",
		y1: "y",
		x2: "x",
		y2: "y"
	}, r = [
		"xAxisRotation",
		"largeArcFlag",
		"sweepFlag"
	];
	if (e.type !== t.type && t.type.toUpperCase() !== "M") {
		var i = {};
		Object.keys(t).forEach(function(a) {
			var o = t[a], s = e[a];
			s === void 0 && (r.includes(a) ? s = o : (s === void 0 && n[a] && (s = e[n[a]]), s === void 0 && (s = 0))), i[a] = s;
		}), i.type = t.type, e = i;
	}
	return e;
}
function ha(e, t, n) {
	var r = [];
	if (t.type === "L" || t.type === "Q" || t.type === "C") r = r.concat(la(e, t, n));
	else {
		var i = na({}, e);
		i.type === "M" && (i.type = "L"), r = r.concat(fa(n - 1).map(function() {
			return i;
		})), r.push(t);
	}
	return r;
}
function ga(e, t, n) {
	var r = e.length - 1, i = t.length - 1, a = r / i, o = fa(i).reduce(function(t, r, i) {
		var o = Math.floor(a * i);
		if (n && o < e.length - 1 && n(e[o], e[o + 1])) {
			var s = a * i % 1 < .5;
			t[o] && (s ? o > 0 ? --o : o < e.length - 1 && (o += 1) : o < e.length - 1 ? o += 1 : o > 0 && --o);
		}
		return t[o] = (t[o] || 0) + 1, t;
	}, []).reduce(function(t, n, r) {
		if (r === e.length - 1) {
			var i = fa(n, na({}, e[e.length - 1]));
			return i[0].type === "M" && i.forEach(function(e) {
				e.type = "L";
			}), t.concat(i);
		}
		return t.concat(ha(e[r], e[r + 1], n));
	}, []);
	return o.unshift(e[0]), o;
}
function _a(e) {
	for (var t = (e || "").match(ua) || [], n = [], r, i, a = 0; a < t.length; ++a) if (r = da[t[a]], r) {
		i = { type: t[a] };
		for (var o = 0; o < r.length; ++o) i[r[o]] = +t[a + o + 1];
		a += r.length, n.push(i);
	}
	return n;
}
function va(e, t, n) {
	var r = e == null ? [] : e.slice(), i = t == null ? [] : t.slice(), a = ea(n) === "object" ? n : {
		excludeSegment: n,
		snapEndsToInput: !0
	}, o = a.excludeSegment, s = a.snapEndsToInput;
	if (!r.length && !i.length) return function() {
		return [];
	};
	var c = (r.length === 0 || r[r.length - 1].type === "Z") && (i.length === 0 || i[i.length - 1].type === "Z");
	r.length > 0 && r[r.length - 1].type === "Z" && r.pop(), i.length > 0 && i[i.length - 1].type === "Z" && i.pop(), r.length ? i.length || i.push(r[0]) : r.push(i[0]), Math.abs(i.length - r.length) !== 0 && (i.length > r.length ? r = ga(r, i, o) : i.length < r.length && (i = ga(i, r, o))), r = r.map(function(e, t) {
		return ma(e, i[t]);
	});
	var l = r.map(function(e) {
		return $i({}, e);
	});
	return c && (l.push({ type: "Z" }), r.push({ type: "Z" })), function(e) {
		if (e === 1 && s) return t ?? [];
		if (e === 0) return r;
		for (var n = 0; n < l.length; ++n) {
			var a = r[n], o = i[n], c = l[n], u = aa(da[c.type]), d;
			try {
				for (u.s(); !(d = u.n()).done;) {
					var f = d.value;
					c[f] = (1 - e) * a[f] + e * o[f], (f === "largeArcFlag" || f === "sweepFlag") && (c[f] = Math.round(c[f]));
				}
			} catch (e) {
				u.e(e);
			} finally {
				u.f();
			}
		}
		return l;
	};
}
function ya(e, t, n) {
	var r = _a(e), i = _a(t), a = ea(n) === "object" ? n : {
		excludeSegment: n,
		snapEndsToInput: !0
	}, o = a.excludeSegment, s = a.snapEndsToInput;
	if (!r.length && !i.length) return function() {
		return "";
	};
	var c = va(r, i, {
		excludeSegment: o,
		snapEndsToInput: s
	});
	return function(e) {
		if (e === 1 && s) return t ?? "";
		var n = c(e), r = "", i = aa(n), a;
		try {
			for (i.s(); !(a = i.n()).done;) {
				var o = a.value;
				r += pa(o);
			}
		} catch (e) {
			i.e(e);
		} finally {
			i.f();
		}
		return r;
	};
}
//#endregion
//#region node_modules/@unovis/ts/types/curve.js
var ba = {
	basis: k,
	basisClosed: ne,
	basisOpen: re,
	bundle: N,
	cardinal: ae,
	cardinalClosed: te,
	cardinalOpen: ee,
	catmullRom: le,
	catmullRomClosed: M,
	catmullRomOpen: j,
	linear: ue,
	linearClosed: se,
	monotoneX: A,
	monotoneY: F,
	natural: ie,
	step: oe,
	stepAfter: ce,
	stepBefore: P
};
//#endregion
//#region node_modules/@unovis/ts/utils/path.js
function xa(e, t) {
	return e.toString().replace(/L(?<x>-?\d*\.?\d*),(?<y>-?\d+\.?\d*)/gm, (e, n, r) => `A ${t} ${t} 0 0 0 ${n} ${r}`);
}
//#endregion
//#region node_modules/@unovis/ts/components/chord-diagram/types.js
var $ = /* @__PURE__ */ ((e) => (e.Along = "along", e.Perpendicular = "perpendicular", e))($ || {}), Sa = class extends Yi {
	constructor() {
		super(...arguments), this._nodes = [], this._links = [], this._inputNodesMap = /* @__PURE__ */ new Map(), this._nodesMap = /* @__PURE__ */ new Map(), this._nodesByUserId = /* @__PURE__ */ new Map(), this._nodesByInputRef = /* @__PURE__ */ new Map(), this.nodeId = (e) => an(e.id) || isFinite(e.id) ? `${e.id}` : void 0, this.linkId = (e) => an(e.id) || isFinite(e.id) ? `${e.id}` : void 0;
	}
	getNodeById(e) {
		return this._nodesMap.get(e);
	}
	get data() {
		return this._data;
	}
	set data(e) {
		if (!e) return;
		this._data = e;
		let t = this.nodes, n = this.links;
		this._inputNodesMap.clear(), this._nodesMap.clear(), this._nodesByUserId.clear(), this._nodesByInputRef.clear();
		let r = dn(e?.nodes ?? []), i = dn(e?.links ?? []);
		this.transferState(r, t, this.nodeId), this.transferState(i, n, this.linkId), r.forEach((t, n) => {
			t._index = n, t._id = this.nodeId(t) || `${n}`, this._inputNodesMap.set(t, e.nodes[n]), this._nodesMap.set(t._id, t), this._nodesByInputRef.set(e.nodes[n], t);
			let r = this.nodeId(t);
			r !== void 0 && !this._nodesByUserId.has(r) && this._nodesByUserId.set(r, t);
		}), nn(this.nodeSort) && r.sort(this.nodeSort), i.forEach((e, t) => {
			e._indexGlobal = t, e.source = this.findNode(r, e.source), e.target = this.findNode(r, e.target);
		});
		let a = /* @__PURE__ */ new Map();
		for (let e of i) {
			let t = e.source?._index ?? -1, n = e.target?._index ?? -1, r = t <= n ? `${t}|${n}` : `${n}|${t}`, i = a.get(r);
			i ? i.push(e) : a.set(r, [e]);
		}
		a.forEach((e) => {
			if (e.every((e) => !rn(e._index) && !rn(e._neighbours))) return;
			let t = e[0];
			e.forEach((n, r) => {
				n._index = r, n._id = this.linkId(n) || `${n.source?._id}-${n.target?._id}-${r}`, n._neighbours = e.length, n._direction = t.source === n.source && t.target === n.target ? 1 : -1;
			});
		});
		let o = /* @__PURE__ */ new Map();
		r.forEach((e) => o.set(e, []));
		for (let e of i) e.source && o.get(e.source)?.push(e), e.target && e.target !== e.source && o.get(e.target)?.push(e);
		r.forEach((e) => {
			e.links = o.get(e), e._isConnected = e.links.length !== 0;
		}), this._nonConnectedNodes = r.filter((e) => !e._isConnected), this._connectedNodes = r.filter((e) => e._isConnected), this._nodes = r, this._links = i.filter((e) => e.source === e.target ? (console.warn(`Unovis | Graph Data Model: Skipping link ${e._id} because it has the same source and target`), !1) : e.source && e.target);
	}
	get nodes() {
		return this._nodes;
	}
	get links() {
		return this._links;
	}
	get connectedNodes() {
		return this._connectedNodes;
	}
	get nonConnectedNodes() {
		return this._nonConnectedNodes;
	}
	findNode(e, t) {
		let n;
		return tn(t) ? n = e[t] : an(t) ? n = this._nodesByUserId.get(t) : sn(t) && (n = this._nodesByInputRef.get(t) ?? e.find((e) => un(this._inputNodesMap.get(e), t))), n || console.warn(`Unovis | Graph Data Model: Node ${t} is missing from the nodes list`), n;
	}
	transferState(e, t, n) {
		let r = /* @__PURE__ */ new Map();
		for (let e of t) {
			let t = n(e);
			r.has(t) || r.set(t, e);
		}
		for (let t of e) {
			let e = r.get(n(t));
			t._state = e ? { ...e._state } : {};
		}
	}
	setNodeStateById(e, t) {
		let n = this.getNodeById(e);
		if (!n) {
			console.warn(`Unovis | Graph Data Model: Node ${e} not found`);
			return;
		}
		n._state = t;
	}
}, Ca = {
	...Xi,
	duration: 800,
	highlightedNodeId: void 0,
	highlightedLinkIds: [],
	linkColor: void 0,
	linkPattern: void 0,
	linkValue: (e) => e.value,
	nodeLevels: [],
	nodeWidth: 15,
	nodeColor: (e) => e.color,
	nodePattern: void 0,
	nodeLabel: (e) => e.label ?? e.key,
	nodeLabelColor: void 0,
	nodeLabelAlignment: $.Along,
	padAngle: .02,
	cornerRadius: 2,
	angleRange: [0, 2 * Math.PI],
	radiusScaleExponent: 2
};
//#endregion
//#region node_modules/@unovis/ts/components/chord-diagram/modules/node.js
function wa(e) {
	e.style("opacity", 0).each((e, t, n) => {
		let r = n[t], i = (e.x0 + e.x1) / 2, a = (e.x1 - e.x0) / 2;
		r._animState = {
			x0: i - a * .8,
			x1: i + a * .8,
			y0: e.y0,
			y1: e.y1
		};
	});
}
function Ta(e, t, n, r) {
	let a = (e) => hi(e.data, t.nodeColor, e.height);
	e.attr("id", (e) => e.uid).style("transition", `fill ${r}ms`).style("fill", a).style("stroke", a).style("mask", (e) => xi(bi(e.data, t.nodePattern, e.height))), r ? Ki(e, r).style("opacity", 1).attrTween("d", (e, t, r) => {
		let a = r[t], o = {
			x0: e.x0,
			x1: e.x1,
			y0: e.y0,
			y1: e.y1
		}, s = i(a._animState, o);
		return (e) => (a._animState = s(e), n(a._animState));
	}) : e.attr("d", (e) => n(e)).style("opacity", 1);
}
function Ea(e, t) {
	Ki(e, t).style("opacity", 0).remove();
}
//#endregion
//#region node_modules/@unovis/ts/components/chord-diagram/style.js
var Da = /* @__PURE__ */ n({
	background: () => Aa,
	highlightedLink: () => Ba,
	highlightedNode: () => Fa,
	label: () => Ia,
	labelExit: () => Ra,
	labelText: () => La,
	labels: () => Na,
	link: () => za,
	links: () => Ma,
	node: () => Pa,
	nodes: () => ja,
	root: () => Oa,
	transparent: () => Va,
	variables: () => ka
}), Oa = J`
  label: chord-diagram-component;
`, ka = Xt`
  :root {
    --vis-chord-diagram-link-fill-color: #cad5f6;
    --vis-chord-diagram-link-stroke-color: #777777;
    --vis-chord-diagram-link-opacity: 0.5;
    --vis-chord-diagram-link-stroke-opacity: 0.15;
    --vis-chord-diagram-link-highlighted-opacity: 0.9;
    --vis-chord-diagram-link-dimmed-opacity: 0.25;

    --vis-chord-diagram-node-highlighted-opacity: 0.9;
    --vis-chord-diagram-node-dimmed-opacity: 0.25;

    --vis-chord-diagram-label-text-fill-color-bright: #ffffff;
    --vis-chord-diagram-label-text-fill-color-dark: #a5abb2;
    --vis-chord-diagram-label-text-font-size: 1em;

    --vis-dark-chord-diagram-link-fill-color: #575c65;
  }

  ${Yr} ${`.${Oa}`} {
    --vis-chord-diagram-link-fill-color: var(--vis-dark-chord-diagram-link-fill-color);
  }
`, Aa = J`
  label: background;
`, ja = J`
  label: nodes;
`, Ma = J`
  label: links;
`, Na = J`
  label: labels;
`, Pa = J`
  label: node;
  stroke-width: 0;
  fill: var(--vis-color-main);
  stroke: var(--vis-color-main);
  transition: .1s fill-opacity;
`, Fa = J`
  label: highlighted;
  fill-opacity: var(--vis-chord-diagram-node-highlighted-opacity);
  stroke-width: 1.5;
`, Ia = J`
  label: label;
`, La = J`
  label: label-text;

  dominant-baseline: middle;
  user-select: none;
  font-size: var(--vis-chord-diagram-label-text-font-size);

  > textPath {
    dominant-baseline: central;
  }
`, Ra = J`
  label: label-exit;
`, za = J`
  label: link;

  fill: var(--vis-chord-diagram-link-fill-color);
  fill-opacity: var(--vis-chord-diagram-link-opacity);
  stroke: var(--vis-chord-diagram-link-stroke-color);
  stroke-opacity:  var(--vis-chord-diagram-link-stroke-opacity);
  transition: .1s fill-opacity;
`, Ba = J`
  label: highlighted;
  fill-opacity: var(--vis-chord-diagram-link-highlighted-opacity);
`, Va = J`
  label: transparent;

  ${`.${za}`}:not(${`.${Ba}`}) {
    fill-opacity: var(--vis-chord-diagram-link-dimmed-opacity);
  }

  ${`.${Pa}`}:not(${`.${Fa}`}) {
    fill-opacity: var(--vis-chord-diagram-node-dimmed-opacity);
  }
`;
function Ha(e, t) {
	switch (Y(e.data, t.nodeLabelAlignment) ?? $.Along) {
		case $.Perpendicular: return hi(e.data, t.nodeColor, e.height);
		case $.Along: {
			let n = hi(e.data, t.nodeColor, e.height), r = l(n);
			return (r ? vi(r.hex()) : 0) > .65 ? "var(--vis-chord-diagram-label-text-fill-color-dark)" : "var(--vis-chord-diagram-label-text-fill-color-bright)";
		}
	}
}
function Ua(e, t) {
	switch (Y(e.data, t.nodeLabelAlignment) ?? $.Along) {
		case $.Perpendicular: return (e.x0 + e.x1) / 2 * 180 / Math.PI < 180 ? "start" : "end";
		case $.Along: return null;
	}
}
function Wa(e, t, n) {
	switch (Y(e.data, t.nodeLabelAlignment) ?? $.Along) {
		case $.Perpendicular: {
			let t = n(e.y1) + 3, r = (e.x0 + e.x1) / 2 - Math.PI / 2;
			return `translate(${t * Math.cos(r)}, ${t * Math.sin(r)})`;
		}
		case $.Along: return null;
	}
}
function Ga(e, t, n) {
	e.style("opacity", 0).attr("transform", (e) => Wa(e, t, n)), e.append("text").attr("class", La).style("fill", (e) => hi(e.data, t.nodeColor, e.height));
}
function Ka(e, t, n, r, i) {
	let { nodeLabel: a, nodeLabelColor: o, nodeWidth: s } = t;
	Ki(e, i).attr("transform", (e) => Wa(e, t, r)).style("opacity", 1);
	let l = e.select(`.${La}`);
	l.selectAll("textPath").remove(), l.text((e) => hn(e.data, a)).style("transition", `fill ${i}ms`).style("fill", (e) => hi(e.data, o) ?? Ha(e, t)).style("text-anchor", (e) => Ua(e, t)).each((e, i, a) => {
		let o = Y(e.data, t.nodeLabelAlignment) ?? $.Along, l = e.x1 - e.x0 - X(e.data, t.padAngle) * 2, u = (r(e.y1) - X(e, t.nodeWidth) / 2) * l, d = o === $.Along ? u : n - 6, f = c(a[i]).call(Gi, d).attr("dx", o === $.Along ? 3 : null).attr("dy", o === $.Along ? X(e.data, s) / 2 : null), p = Bi(f.node()), m = f.text();
		o === $.Along && (f.text(""), p <= d && f.append("textPath").attr("href", `#${e.uid}`).text(m));
	}), Ki(l, i).attr("transform", (e) => {
		if (Y(e.data, t.nodeLabelAlignment) !== $.Perpendicular) return null;
		let n = (e.x0 + e.x1) / 2 * 180 / Math.PI;
		return `rotate(${n < 180 ? n - 90 : n + 90})`;
	});
}
function qa(e, t) {
	Ki(e, t).style("opacity", 0).remove();
}
//#endregion
//#region node_modules/@unovis/ts/components/chord-diagram/modules/layout.js
function Ja(e) {
	let { height: t, depth: n } = e;
	if (t > 0) {
		let r = e.data, i = e;
		i.data = {
			key: r[0],
			values: r[1],
			depth: n,
			height: t,
			ancestors: i.ancestors().map((e) => e.data.key)
		};
	}
}
function Ya(e, n, r = []) {
	let i = r.map((e) => (t) => t[e]), a = r.length ? t(e, ...i) : {
		key: "root",
		children: e
	};
	return de(a).sum((e) => X(e, n)).each(Ja);
}
function Xa(e, t, n = .95) {
	if (!e.children) return;
	let r = e.value > 0, i = e.x1 - e.x0, a = i * (e.y0 === 0 ? 1 : n), o = i - a, s = r ? t : a / e.children.length, c = kn().startAngle(e.x0 + o / 2).endAngle(e.x1 - o / 2).padAngle(s).value((e) => r ? e.value : 1).sort((t, n) => e.children.indexOf(t) - e.children.indexOf(n))(e.children);
	e.children.forEach((e, i) => {
		let a = c[i].startAngle, o = c[i].endAngle, s = (o - a) * (1 - n), l = (a + o) / 2;
		e.x0 = r ? a + s / 2 : l - t / 2, e.x1 = r ? o - s / 2 : l + t / 2;
	});
}
function Za(t, n, r) {
	let i = pn(n, (e) => e.source._id), a = pn(n, (e) => e.target._id), o = t.leaves(), s = e(o, (e) => e.data._id), c = (e, t, n, r = []) => (r[e.height] = e, r[n * 2 - t.height] = t, e.parent && t.parent && c(e.parent, t.parent, n, r), r), l = (e, t, n, i) => {
		e.forEach((e) => {
			e._state.points || (e._state.points = []);
			let a = s.get(e.source._id), o = s.get(e.target._id), l = c(t === "out" ? a : o, t === "out" ? o : a, i)[n], u = l.x1 - l.x0 - r, d = l._prevX1 ?? l.x0 + r / 2, f = d + u * e._state.value / l.value;
			l._prevX1 = f;
			let p = t === "out" ? n : i * 2 - 1 - n;
			e._state.points[p] = {
				a0: d,
				a1: f,
				r: l.y1
			};
		});
	};
	return o.forEach((e) => {
		let t = i[e.data._id] || [], n = a[e.data._id] || [];
		for (let r = 0; r < e.depth; r += 1) l(t, "out", r, e.depth), l(n, "in", r, e.depth);
	}), n.map((e) => ({
		source: s.get(e.source._id),
		target: s.get(e.target._id),
		data: e,
		points: e._state.points,
		_state: {}
	}));
}
//#endregion
//#region node_modules/d3-chord/src/math.js
var Qa = Math.abs, $a = Math.cos, eo = Math.sin, to = Math.PI, no = to / 2;
to * 2;
//#endregion
//#region node_modules/d3-chord/src/array.js
var ro = Array.prototype.slice;
//#endregion
//#region node_modules/d3-chord/src/constant.js
function io(e) {
	return function() {
		return e;
	};
}
//#endregion
//#region node_modules/d3-chord/src/ribbon.js
function ao(e) {
	return e.source;
}
function oo(e) {
	return e.target;
}
function so(e) {
	return e.radius;
}
function co(e) {
	return e.startAngle;
}
function lo(e) {
	return e.endAngle;
}
function uo() {
	return 0;
}
function fo(e) {
	var t = ao, n = oo, r = so, i = so, a = co, o = lo, s = uo, c = null;
	function l() {
		var l, u = t.apply(this, arguments), d = n.apply(this, arguments), f = s.apply(this, arguments) / 2, p = ro.call(arguments), m = +r.apply(this, (p[0] = u, p)), h = a.apply(this, p) - no, g = o.apply(this, p) - no, _ = +i.apply(this, (p[0] = d, p)), v = a.apply(this, p) - no, y = o.apply(this, p) - no;
		if (c ||= l = T(), f > 1e-12 && (Qa(g - h) > f * 2 + 1e-12 ? g > h ? (h += f, g -= f) : (h -= f, g += f) : h = g = (h + g) / 2, Qa(y - v) > f * 2 + 1e-12 ? y > v ? (v += f, y -= f) : (v -= f, y += f) : v = y = (v + y) / 2), c.moveTo(m * $a(h), m * eo(h)), c.arc(0, 0, m, h, g), h !== v || g !== y) {
			if (e) {
				var b = _ - +e.apply(this, arguments), x = (v + y) / 2;
				c.quadraticCurveTo(0, 0, b * $a(v), b * eo(v)), c.lineTo(_ * $a(x), _ * eo(x)), c.lineTo(b * $a(y), b * eo(y));
			} else c.quadraticCurveTo(0, 0, _ * $a(v), _ * eo(v)), c.arc(0, 0, _, v, y);
		}
		if (c.quadraticCurveTo(0, 0, m * $a(h), m * eo(h)), c.closePath(), l) return c = null, l + "" || null;
	}
	return e && (l.headRadius = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : io(+t), l) : e;
	}), l.radius = function(e) {
		return arguments.length ? (r = i = typeof e == "function" ? e : io(+e), l) : r;
	}, l.sourceRadius = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : io(+e), l) : r;
	}, l.targetRadius = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : io(+e), l) : i;
	}, l.startAngle = function(e) {
		return arguments.length ? (a = typeof e == "function" ? e : io(+e), l) : a;
	}, l.endAngle = function(e) {
		return arguments.length ? (o = typeof e == "function" ? e : io(+e), l) : o;
	}, l.padAngle = function(e) {
		return arguments.length ? (s = typeof e == "function" ? e : io(+e), l) : s;
	}, l.source = function(e) {
		return arguments.length ? (t = e, l) : t;
	}, l.target = function(e) {
		return arguments.length ? (n = e, l) : n;
	}, l.context = function(e) {
		return arguments.length ? (c = e ?? null, l) : c;
	}, l;
}
function po() {
	return fo();
}
//#endregion
//#region node_modules/@unovis/ts/components/chord-diagram/modules/link.js
function mo() {
	return "M0,0 L0,0";
}
var ho = po().source((e) => e[0]).target((e) => e[e.length - 1]).startAngle((e) => e.a0).endAngle((e) => e.a1), go = Pn().curve(ba.catmullRom.alpha(.5)).startAngle((e, t, n) => t < n.length / 2 ? e.a1 : e.a0).endAngle((e, t, n) => t < n.length / 2 ? e.a0 : e.a1);
function _o(e, t) {
	let n = e.length === 2 ? ho : go;
	n.radius((e) => t(e.r));
	let r = n(e);
	if (e.length === 2) return r;
	let i = r.slice(0, -1);
	return xa(i.concat(`L${i.match(/M-?\d*\.?\d*[,\s*]-?\d*\.?\d*/)?.[0].slice(1)}`), Math.max(t(e[0].r), 0));
}
function vo(e, t) {
	e.attr("d", (e) => _o(e.points, t) || mo()).style("opacity", 0);
}
function yo(e, t, n, r) {
	e.style("transition", `fill ${r}ms`).style("fill", (e) => hi(e.data, t.linkColor)).style("stroke", (e) => hi(e.data, t.linkColor)).style("mask", (e) => xi(bi(e.data, t.linkPattern)));
	let i = Ki(e, r).style("opacity", 1);
	r ? i.attrTween("d", (e, t, r) => ya(c(r[t]).attr("d"), _o(e.points, n) || mo())) : i.attr("d", (e) => _o(e.points, n) || mo());
}
function bo(e, t) {
	Ki(e, t).style("opacity", 0).remove();
}
//#endregion
//#region node_modules/@unovis/ts/components/chord-diagram/index.js
var xo = class e extends Zi {
	constructor(t) {
		super(), this._defaultConfig = Ca, this.config = this._defaultConfig, this.datamodel = new Sa(), this.arcGen = wn(), this.radiusScale = r(), this.events = {
			[e.selectors.node]: {
				mouseover: this._onNodeMouseOver.bind(this),
				mouseout: this._onNodeMouseOut.bind(this)
			},
			[e.selectors.link]: {
				mouseover: this._onLinkMouseOver.bind(this),
				mouseout: this._onLinkMouseOut.bind(this)
			},
			[e.selectors.label]: {
				mouseover: this._onNodeMouseOver.bind(this),
				mouseout: this._onNodeMouseOut.bind(this)
			}
		}, this._nodes = [], this._links = [], this.setConfig(t), this.background = this.g.append("rect").attr("class", Aa), this.linkGroup = this.g.append("g").attr("class", Ma), this.nodeGroup = this.g.append("g").attr("class", ja), this.labelGroup = this.g.append("g").attr("class", Na);
	}
	get _forceHighlight() {
		return this.config.highlightedNodeId !== void 0 || this.config.highlightedLinkIds?.length > 0;
	}
	get bleed() {
		let { config: e } = this, t = 0, n = 0, r = 0, i = 0;
		return this._nodes.forEach((a) => {
			let o = Y(a.data, e.nodeLabelAlignment);
			if (a.height === 0 && o === $.Perpendicular) {
				let o = Ii(hn(a.data, e.nodeLabel) ?? "", Yn("var(--vis-chord-diagram-label-text-font-size)", this.element)), [s, c] = this.arcGen.centroid(a);
				s < 0 ? i = Math.max(i, o) : r = Math.max(r, o), c < 0 ? t = Math.max(t, o) : n = Math.max(n, o);
			}
		}), i += 6, r += 6, n += 6, t += 6, {
			top: t,
			bottom: n,
			left: i,
			right: r
		};
	}
	setSize(e, t, n, r) {
		super.setSize(e, t, n, r), this.radiusScale.exponent(this.config.radiusScaleExponent).range([0, Math.min(e, t) / 2]);
	}
	setData(e) {
		super.setData(e), this._layoutData();
	}
	_layoutData() {
		let { nodes: e } = this.datamodel, { links: t } = this.datamodel, { padAngle: n, linkValue: r, nodeLevels: i } = this.config;
		e.forEach((e) => {
			delete e._state.value;
		}), t.forEach((e) => {
			delete e._state.points, e._state.value = X(e, r), e.source._state.value = (e.source._state.value || 0) + X(e, r), e.target._state.value = (e.target._state.value || 0) + X(e, r);
		}), t = t.filter((e) => e._state.value);
		let a = Ya(e, (e) => e._state?.value, i), o = Ln().size([this.config.angleRange[1], 1])(a);
		o.each((e, t) => {
			Xa(e, n), e.uid = `${this.uid.substr(0, 4)}-${t}`, e.x0 = Number.isNaN(e.x0) ? 0 : e.x0, e.x1 = Number.isNaN(e.x1) ? 0 : e.x1, e._state = {};
		});
		let s = o.descendants();
		this._rootNode = s.find((e) => e.depth === 0), this._nodes = s.filter((e) => e.depth !== 0), this._links = Za(o, t, n);
	}
	_render(e) {
		super._render(e);
		let { config: t, bleed: n } = this;
		this._layoutData();
		let r = tn(e) ? e : t.duration, i = Math.min(this._width, this._height), a = i / 2 - o([
			n.top,
			n.bottom,
			n.left,
			n.right
		]), s = 1 + t.nodeLevels?.length, c = a > t.nodeWidth * s ? t.nodeWidth : Math.max(a / s, 0);
		this.radiusScale.range([0, Math.max(a, 0)]), this.arcGen.startAngle((e) => e.x0 + t.padAngle / 2 - (e.value ? 0 : Math.PI / 360)).endAngle((e) => e.x1 - t.padAngle / 2 + (e.value ? 0 : Math.PI / 360)).cornerRadius((e) => X(e.data, t.cornerRadius)).innerRadius((e) => Math.max(this.radiusScale(e.y1) - c, 0)).outerRadius((e) => this.radiusScale(e.y1)), this.g.classed(Va, this._forceHighlight), this.background.attr("width", this._width).attr("height", this._height).style("opacity", 0), this.nodeGroup.attr("transform", `translate(${this._width / 2},${this._height / 2})`), this.labelGroup.attr("transform", `translate(${this._width / 2},${this._height / 2})`), this.linkGroup.attr("transform", `translate(${this._width / 2},${this._height / 2})`);
		let l = this.linkGroup.selectAll(`.${za}`).data(this._links, (e) => String(e.data._id)), u = l.enter().append("path").attr("class", za).call(vo, this.radiusScale);
		l.merge(u).classed(Ba, (e) => {
			let n = e.data.id ?? e.data._indexGlobal;
			return t.highlightedLinkIds?.includes(n);
		}).call(yo, t, this.radiusScale, r), l.exit().call(bo, r);
		let d = this.nodeGroup.selectAll(`.${Pa}`).data(this._nodes, (e) => String(e.uid)), f = d.enter().append("path").attr("class", Pa).call(wa);
		d.merge(f).classed(Fa, (e) => t.highlightedNodeId === e.data._id).call(Ta, t, this.arcGen, r), d.exit().call(Ea, r);
		let p = i - a, m = this.labelGroup.selectAll(`.${Ia}`).data(this._nodes, (e) => String(e.uid)), h = m.enter().append("g").attr("class", Ia).call(Ga, t, this.radiusScale);
		m.merge(h).call(Ka, t, p, this.radiusScale, r), m.exit().attr("class", Ra).call(qa, r);
	}
	_onNodeMouseOver(e) {
		let t;
		if (e.children) {
			let n = e.leaves();
			t = this._links.filter((e) => n.find((t) => e.source.data.id === t.data.id || e.target.data.id === t.data.id));
		} else {
			let n = e;
			t = this._links.filter((e) => e.source.data.id === n.data.id || e.target.data.id === n.data.id);
		}
		t.length || (e._state.hovered = !0), this._highlightOnHover(t);
	}
	_onNodeMouseOut() {
		this._highlightOnHover();
	}
	_onLinkMouseOver(e) {
		this._highlightOnHover([e]);
	}
	_onLinkMouseOut() {
		this._highlightOnHover();
	}
	_highlightOnHover(e) {
		this._forceHighlight || (e ? e.forEach((e) => {
			e._state.hovered = !0;
			let t = e.source.path(this._rootNode), n = e.target.path(this._rootNode);
			t.forEach((e) => {
				e.depth && (e._state.hovered = !0);
			}), n.forEach((e) => {
				e.depth && (e._state.hovered = !0);
			});
		}) : (this._nodes.forEach((e) => {
			delete e._state.hovered;
		}), this._links.forEach((e) => {
			delete e._state.hovered;
		})), this.nodeGroup.selectAll(`.${Pa}`).classed(Fa, (e) => e._state.hovered), this.linkGroup.selectAll(`.${za}`).classed(Ba, (e) => e._state.hovered), this.g.classed(Va, !!e));
	}
};
xo.selectors = Da;
var So = xo, Co = 16, wo = .02;
function To(e, t, n = {}) {
	let r = n.colorModeId ?? "light", i = pe[r], a = new So({
		linkColor: (t) => fe(e.nodes.findIndex((e) => e.id === t.source), r),
		nodeColor: (e, t) => fe(t, r),
		nodeLabel: (e) => "label" in e ? e.label : e.key,
		nodeLabelColor: i.primary,
		nodeWidth: n.nodeWidth ?? Co,
		padAngle: n.padAngle ?? wo
	}), o = {
		links: e.links,
		nodes: e.nodes
	}, s = new Ji(t, { component: a }, o);
	return {
		resize: () => {
			s.render();
		},
		get svg() {
			return s.element;
		}
	};
}
//#endregion
export { To as renderChordDiagram };
