import {
  computed,
  defineComponent,
  h,
  onMounted,
  onUpdated,
  reactive,
  ref,
  toRefs
} from "./chunk-GY7FY3NU.js";

// node_modules/oh-vue-icons/node_modules/vue-demi/lib/index.mjs
var isVue2 = false;

// node_modules/oh-vue-icons/dist/index.esm.min.js
var l = { "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;", "&": "&amp;" };
var h2 = 0;
var f = (n) => n.replace(/[<>"&]/g, (n2) => l[n2] || n2);
var p = (n) => n + h2++;
var u = {};
var m = (n) => {
  const { name: o, paths: e = [], d: t, polygons: v = [], points: r } = n;
  t && e.push({ d: t }), r && v.push({ points: r }), u[o] = Object.assign({}, n, { paths: e, polygons: v }), u[o].minX || (u[o].minX = 0), u[o].minY || (u[o].minY = 0);
};
var c = (...n) => {
  for (const o of n) m(o);
};
var d = () => u;
var g = defineComponent({ name: "OhVueIcon", props: { name: { type: String, validator: (n) => !n || n in u || (console.warn(`Invalid prop: prop "name" is referring to an unregistered icon "${n}".
Please make sure you have imported this icon before using it.`), false) }, title: String, fill: String, scale: { type: [Number, String], default: 1 }, animation: { validator: (n) => ["spin", "spin-pulse", "wrench", "ring", "pulse", "flash", "float"].includes(n) }, hover: Boolean, flip: { validator: (n) => ["horizontal", "vertical", "both"].includes(n) }, speed: { validator: (n) => "fast" === n || "slow" === n }, label: String, inverse: Boolean }, setup(n) {
  const a = ref([]), s = reactive({ outerScale: 1.2, x: null, y: null }), l2 = reactive({ width: 0, height: 0 }), h3 = computed(() => {
    const o = Number(n.scale);
    return isNaN(o) || o <= 0 ? (console.warn('Invalid prop: prop "scale" should be a number over 0.'), s.outerScale) : o * s.outerScale;
  }), f2 = computed(() => ({ "ov-icon": true, "ov-inverse": n.inverse, "ov-flip-horizontal": "horizontal" === n.flip, "ov-flip-vertical": "vertical" === n.flip, "ov-flip-both": "both" === n.flip, "ov-spin": "spin" === n.animation, "ov-spin-pulse": "spin-pulse" === n.animation, "ov-wrench": "wrench" === n.animation, "ov-ring": "ring" === n.animation, "ov-pulse": "pulse" === n.animation, "ov-flash": "flash" === n.animation, "ov-float": "float" === n.animation, "ov-hover": n.hover, "ov-fast": "fast" === n.speed, "ov-slow": "slow" === n.speed })), m2 = computed(() => n.name ? u[n.name] : null), c2 = computed(() => m2.value ? `${m2.value.minX} ${m2.value.minY} ${m2.value.width} ${m2.value.height}` : `0 0 ${g2.value} ${w2.value}`), d2 = computed(() => {
    if (!m2.value) return 1;
    const { width: n2, height: o } = m2.value;
    return Math.max(n2, o) / 16;
  }), g2 = computed(() => l2.width || m2.value && m2.value.width / d2.value * h3.value || 0), w2 = computed(() => l2.height || m2.value && m2.value.height / d2.value * h3.value || 0), y = computed(() => 1 !== h3.value && { fontSize: h3.value + "em" }), b = computed(() => {
    if (!m2.value || !m2.value.raw) return null;
    const n2 = {};
    let o = m2.value.raw;
    return o = o.replace(/\s(?:xml:)?id=(["']?)([^"')\s]+)\1/g, (o2, e, t) => {
      const v = p("vat-");
      return n2[t] = v, ` id="${v}"`;
    }), o = o.replace(/#(?:([^'")\s]+)|xpointer\(id\((['"]?)([^')]+)\2\)\))/g, (o2, e, t, v) => {
      const r = e || v;
      return r && n2[r] ? `#${n2[r]}` : o2;
    }), o;
  }), $ = computed(() => m2.value && m2.value.attr ? m2.value.attr : {}), x = () => {
    if (!n.name && null !== n.name && 0 === a.value.length) return void console.warn('Invalid prop: prop "name" is required.');
    if (m2.value) return;
    let o = 0, e = 0;
    a.value.forEach((n2) => {
      n2.outerScale = h3.value, o = Math.max(o, n2.width), e = Math.max(e, n2.height);
    }), l2.width = o, l2.height = e, a.value.forEach((n2) => {
      n2.x = (o - n2.width) / 2, n2.y = (e - n2.height) / 2;
    });
  };
  return onMounted(() => {
    x();
  }), onUpdated(() => {
    x();
  }), { ...toRefs(s), children: a, icon: m2, klass: f2, style: y, width: g2, height: w2, box: c2, attribs: $, raw: b };
}, created() {
  const n = this.$parent;
  n && n.children && n.children.push(this);
}, render() {
  const n = Object.assign({ role: this.$attrs.role || (this.label || this.title ? "img" : null), "aria-label": this.label || null, "aria-hidden": !(this.label || this.title), width: this.width, height: this.height, viewBox: this.box }, this.attribs);
  this.attribs.stroke ? n.stroke = this.fill ? this.fill : "currentColor" : n.fill = this.fill ? this.fill : "currentColor", this.x && (n.x = this.x.toString()), this.y && (n.y = this.y.toString());
  let o = { class: this.klass, style: this.style };
  if (isVue2 ? o.attrs = n : o = Object.assign(o, n), this.raw) {
    const n2 = this.title ? `<title>${f(this.title)}</title>${this.raw}` : this.raw;
    isVue2 ? o.domProps = { innerHTML: n2 } : o.innerHTML = n2;
  }
  const e = this.title ? [h("title", this.title)] : [], t = (n2, o2, e2) => h(n2, isVue2 ? { attrs: o2, key: `${n2}-${e2}` } : { ...o2, key: `${n2}-${e2}` });
  return h("svg", o, this.raw ? void 0 : e.concat([this.$slots.default ? isVue2 ? this.$slots.default : this.$slots.default() : this.icon ? [...this.icon.paths.map((n2, o2) => t("path", n2, o2)), ...this.icon.polygons.map((n2, o2) => t("polygon", n2, o2))] : []]));
} });
function w(n, o) {
  void 0 === o && (o = {});
  var e = o.insertAt;
  if (n && "undefined" != typeof document) {
    var t = document.head || document.getElementsByTagName("head")[0], v = document.createElement("style");
    v.type = "text/css", "top" === e && t.firstChild ? t.insertBefore(v, t.firstChild) : t.appendChild(v), v.styleSheet ? v.styleSheet.cssText = n : v.appendChild(document.createTextNode(n));
  }
}
w(".ov-icon {\n  display: inline-block;\n  overflow: visible;\n  vertical-align: -0.2em;\n}\n");
w("/* ---------------- spin ---------------- */\n.ov-spin:not(.ov-hover),\n.ov-spin.ov-hover:hover,\n.ov-parent.ov-hover:hover > .ov-spin {\n  animation: ov-spin 1s linear infinite;\n}\n\n.ov-spin:not(.ov-hover).ov-fast,\n.ov-spin.ov-hover.ov-fast:hover,\n.ov-parent.ov-hover:hover > .ov-spin.ov-fast {\n  animation: ov-spin 0.7s linear infinite;\n}\n\n.ov-spin:not(.ov-hover).ov-slow,\n.ov-spin.ov-hover.ov-slow:hover,\n.ov-parent.ov-hover:hover > .ov-spin.ov-slow {\n  animation: ov-spin 2s linear infinite;\n}\n\n/* ---------------- spin-pulse ---------------- */\n\n.ov-spin-pulse:not(.ov-hover),\n.ov-spin-pulse.ov-hover:hover,\n.ov-parent.ov-hover:hover > .ov-spin-pulse {\n  animation: ov-spin 1s infinite steps(8);\n}\n\n.ov-spin-pulse:not(.ov-hover).ov-fast,\n.ov-spin-pulse.ov-hover.ov-fast:hover,\n.ov-parent.ov-hover:hover > .ov-spin-pulse.ov-fast {\n  animation: ov-spin 0.7s infinite steps(8);\n}\n\n.ov-spin-pulse:not(.ov-hover).ov-slow,\n.ov-spin-pulse.ov-hover.ov-slow:hover,\n.ov-parent.ov-hover:hover > .ov-spin-pulse.ov-slow {\n  animation: ov-spin 2s infinite steps(8);\n}\n\n@keyframes ov-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n/* ---------------- wrench ---------------- */\n.ov-wrench:not(.ov-hover),\n.ov-wrench.ov-hover:hover,\n.ov-parent.ov-hover:hover > .ov-wrench {\n  animation: ov-wrench 2.5s ease infinite;\n}\n\n.ov-wrench:not(.ov-hover).ov-fast,\n.ov-wrench.ov-hover.ov-fast:hover,\n.ov-parent.ov-hover:hover > .ov-wrench.ov-fast {\n  animation: ov-wrench 1.2s ease infinite;\n}\n\n.ov-wrench:not(.ov-hover).ov-slow,\n.ov-wrench.ov-hover.ov-slow:hover,\n.ov-parent.ov-hover:hover > .ov-wrench.ov-slow {\n  animation: ov-wrench 3.7s ease infinite;\n}\n\n@keyframes ov-wrench {\n  0% {\n    transform: rotate(-12deg);\n  }\n\n  8% {\n    transform: rotate(12deg);\n  }\n\n  10%, 28%, 30%, 48%, 50%, 68% {\n    transform: rotate(24deg);\n  }\n\n  18%, 20%, 38%, 40%, 58%, 60% {\n    transform: rotate(-24deg);\n  }\n\n  75%, 100% {\n    transform: rotate(0deg);\n  }\n}\n\n/* ---------------- ring ---------------- */\n.ov-ring:not(.ov-hover),\n.ov-ring.ov-hover:hover,\n.ov-parent.ov-hover:hover > .ov-ring {\n  animation: ov-ring 2s ease infinite;\n}\n\n.ov-ring:not(.ov-hover).ov-fast,\n.ov-ring.ov-hover.ov-fast:hover,\n.ov-parent.ov-hover:hover > .ov-ring.ov-fast {\n  animation: ov-ring 1s ease infinite;\n}\n\n.ov-ring:not(.ov-hover).ov-slow,\n.ov-ring.ov-hover.ov-slow:hover,\n.ov-parent.ov-hover:hover > .ov-ring.ov-slow {\n  animation: ov-ring 3s ease infinite;\n}\n\n@keyframes ov-ring {\n  0% {\n    transform: rotate(-15deg);\n  }\n\n  2% {\n    transform: rotate(15deg);\n  }\n\n  4%, 12% {\n    transform: rotate(-18deg);\n  }\n\n  6% {\n    transform: rotate(18deg);\n  }\n\n  8% {\n    transform: rotate(-22deg);\n  }\n\n  10% {\n    transform: rotate(22deg);\n  }\n\n  12% {\n    transform: rotate(-18deg);\n  }\n\n  14% {\n    transform: rotate(18deg);\n  }\n\n  16% {\n    transform: rotate(-12deg);\n  }\n\n  18% {\n    transform: rotate(12deg);\n  }\n\n  20%, 100% {\n    transform: rotate(0deg);\n  }\n}\n\n/* ---------------- pulse ---------------- */\n.ov-pulse:not(.ov-hover),\n.ov-pulse.ov-hover:hover,\n.ov-parent.ov-hover:hover > .ov-pulse {\n  animation: ov-pulse 2s linear infinite;\n}\n\n.ov-pulse:not(.ov-hover).ov-fast,\n.ov-pulse.ov-hover.ov-fast:hover,\n.ov-parent.ov-hover:hover > .ov-pulse.ov-fast {\n  animation: ov-pulse 1s linear infinite;\n}\n\n.ov-pulse:not(.ov-hover).ov-slow,\n.ov-pulse.ov-hover.ov-slow:hover,\n.ov-parent.ov-hover:hover > .ov-pulse.ov-slow {\n  animation: ov-pulse 3s linear infinite;\n}\n\n@keyframes ov-pulse {\n  0% {\n    transform: scale(1.1);\n  }\n\n  50% {\n    transform: scale(0.8);\n  }\n\n  100% {\n    transform: scale(1.1);\n  }\n}\n\n/* ---------------- flash ---------------- */\n.ov-flash:not(.ov-hover),\n.ov-flash.ov-hover:hover,\n.ov-parent.ov-hover:hover > .ov-flash {\n  animation: ov-flash 2s ease infinite;\n}\n\n.ov-flash:not(.ov-hover).ov-fast,\n.ov-flash.ov-hover.ov-fast:hover,\n.ov-parent.ov-hover:hover > .ov-flash.ov-fast {\n  animation: ov-flash 1s ease infinite;\n}\n\n.ov-flash:not(.ov-hover).ov-slow,\n.ov-flash.ov-hover.ov-slow:hover,\n.ov-parent.ov-hover:hover > .ov-flash.ov-slow {\n  animation: ov-flash 3s ease infinite;\n}\n\n@keyframes ov-flash {\n  0%, 100%, 50%{\n    opacity: 1;\n  }\n  25%, 75%{\n    opacity: 0;\n  }\n}\n\n/* ---------------- float ---------------- */\n.ov-float:not(.ov-hover),\n.ov-float.ov-hover:hover,\n.ov-parent.ov-hover:hover > .ov-float {\n  animation: ov-float 2s linear infinite;\n}\n\n.ov-float:not(.ov-hover).ov-fast,\n.ov-float.ov-hover.ov-fast:hover,\n.ov-parent.ov-hover:hover > .ov-float.ov-fast {\n  animation: ov-float 1s linear infinite;\n}\n\n.ov-float:not(.ov-hover).ov-slow,\n.ov-float.ov-hover.ov-slow:hover,\n.ov-parent.ov-hover:hover > .ov-float.ov-slow {\n  animation: ov-float 3s linear infinite;\n}\n\n@keyframes ov-float {\n  0%, 100% {\n    transform: translateY(-3px);\n  }\n  50% {\n    transform: translateY(3px);\n  }\n}\n");
w(".ov-flip-horizontal {\n  transform: scale(-1, 1);\n}\n\n.ov-flip-vertical {\n  transform: scale(1, -1);\n}\n\n.ov-flip-both {\n  transform: scale(-1, -1);\n}\n\n.ov-inverse {\n  color: #fff;\n}\n");
export {
  g as OhVueIcon,
  c as addIcons,
  d as listIcons
};
//# sourceMappingURL=oh-vue-icons.js.map
