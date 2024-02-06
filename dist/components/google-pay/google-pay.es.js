import * as o from "react";
import { useForm as q } from "../../contexts/form/form.es.js";
import { useEventListener as E } from "../../hooks/use-event-listener.es.js";
import { ButtonLoader as b } from "./google-pay.styles.es.js";
const O = ({
  buttonColor: l,
  buttonSizeMode: c = "fill",
  buttonType: u = "long",
  id: f = "rswps-google-pay-container",
  ...p
}) => {
  const [s, P] = o.useState(() => {
  }), { cardTokenizeResponseReceived: h, createPaymentRequest: a, payments: i } = q(), g = o.useRef(null), m = o.useMemo(() => {
    const t = {
      buttonColor: l,
      buttonSizeMode: c,
      buttonType: u
    };
    return Object.keys(t).reduce((e, r) => (t[r] !== void 0 && (e[r] = t[r]), e), {});
  }, [l, c, u]), R = async (t) => {
    if (t.stopPropagation(), !s) {
      console.warn("Google Pay button was clicked, but no Google Pay instance was found.");
      return;
    }
    try {
      const e = await s.tokenize();
      if (e.status === "OK")
        return h(e);
      let r = `Tokenization failed with status: ${e.status}`;
      if (e?.errors)
        throw r += ` and errors: ${JSON.stringify(e?.errors)}`, new Error(r);
      console.warn(r);
    } catch (e) {
      console.error(e);
    }
  };
  return o.useEffect(() => {
    if (!a)
      throw new Error("`createPaymentRequest()` is required when using digital wallets");
    const t = new AbortController(), { signal: e } = t;
    return (async (w) => {
      const y = i?.paymentRequest(a);
      if (!y)
        throw new Error("`paymentRequest` is required when using digital wallets");
      try {
        const n = await i?.googlePay(y).then((d) => {
          if (!w?.aborted)
            return P(d), d;
        });
        await n?.attach(`#${f}`, m), w.aborted && await n?.destroy();
      } catch (n) {
        console.error("Initializing Google Pay failed", n);
      }
    })(e), () => {
      t.abort();
    };
  }, [a, i, m]), E({
    listener: R,
    type: "click",
    element: g,
    options: {
      passive: !0
    }
  }), /* @__PURE__ */ o.createElement("div", {
    ...p,
    id: f,
    ref: g
  }, s ? null : /* @__PURE__ */ o.createElement(b, null));
};
export {
  O as default
};
//# sourceMappingURL=google-pay.es.js.map
