"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});var s=require("react");function f(e){if(e&&e.__esModule)return e;var r=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});return e&&Object.keys(e).forEach(function(t){if(t!=="default"){var n=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,n.get?n:{enumerable:!0,get:function(){return e[t]}})}}),r.default=e,Object.freeze(r)}var c=f(s);const o=e=>e&&"current"in e?e.current:e,d=!(typeof window<"u"&&window.document?.createElement);function l({type:e,listener:r,element:t=d?void 0:window,options:n}){const i=c.useRef();c.useEffect(()=>{i.current=r},[r]);const a=c.useCallback(u=>{i.current?.(u)},[]);c.useEffect(()=>{const u=o(t);return u?.addEventListener(e,a,n),()=>u?.removeEventListener(e,a)},[e,t,n,a])}exports.getRefElement=o;exports.useEventListener=l;
//# sourceMappingURL=use-event-listener.cjs.js.map
