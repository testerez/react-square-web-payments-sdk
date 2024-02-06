import * as r from "react";
import i from "../../contexts/form/form.es.js";
function s({
  applicationId: e,
  cardTokenizeResponseReceived: t,
  locationId: o,
  children: m,
  formProps: a = {
    "aria-label": "Payment form",
    id: "rswps-form"
  },
  overrides: f,
  ...n
}, d) {
  return /* @__PURE__ */ r.createElement(i, {
    ...n,
    applicationId: e,
    cardTokenizeResponseReceived: t,
    locationId: o,
    overrides: f
  }, /* @__PURE__ */ r.createElement("div", {
    "data-testid": "rswps-form",
    ...a,
    ref: d,
    role: "form"
  }, m));
}
const c = r.forwardRef(s);
export {
  c as default
};
//# sourceMappingURL=payment-form.es.js.map
