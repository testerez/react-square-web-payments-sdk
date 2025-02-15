import * as React from 'react'
import { useForm } from '../../contexts/form/form.es.js'

function CashAppPay({
  callbacks,
  id = 'rswps-cash-app-pay',
  redirectURL,
  referenceId,
  shape = 'round',
  size = 'medium',
  values = 'dark',
  width = 'static',
  ...props
}) {
  const [cashApp, setCashApp] = React.useState()
  const { createPaymentRequest, payments } = useForm()
  const paymentRequestOptions = React.useMemo(
    () => ({
      redirectURL: redirectURL || window.location.href,
      referenceId,
    }),
    [redirectURL, referenceId],
  )
  const options = React.useMemo(() => {
    const baseOptions = {
      shape,
      size,
      values,
      width,
    }
    return Object.keys(baseOptions).reduce((acc, key) => {
      if (baseOptions[key] !== void 0) {
        acc[key] = baseOptions[key]
      }
      return acc
    }, {})
  }, [shape, size, values, width])
  React.useEffect(() => {
    if (!createPaymentRequest) {
      throw new Error(
        '`createPaymentRequest()` is required when using digital wallets',
      )
    }
    let cashApp2
    const abortController = new AbortController()
    const { signal } = abortController
    const start = async (signal2) => {
      const paymentRequest = payments?.paymentRequest(createPaymentRequest)
      if (!paymentRequest) {
        throw new Error(
          '`paymentRequest` is required when using digital wallets',
        )
      }
      try {
        cashApp2 = await payments
          ?.cashAppPay(paymentRequest, paymentRequestOptions)
          .then((res) => {
            if (signal2?.aborted) {
              return
            }
            setCashApp(res)
            return res
          })
        await cashApp2?.attach(`#${id}`, options)
      } catch (error) {
        console.error('Initializing Cash App Pay failed', error)
        console.log('destroying cash app', cashApp2)
        cashApp2?.destroy()
      }
    }
    start(signal)
    return () => {
      abortController.abort()
    }
  }, [createPaymentRequest, options, paymentRequestOptions, payments])
  if (callbacks) {
    for (const callback of Object.keys(callbacks)) {
      cashApp?.addEventListener(callback.toLowerCase(), callbacks[callback])
    }
  }
  return /* @__PURE__ */ React.createElement('div', {
    ...props,
    id,
  })
}

export { CashAppPay as default }
//# sourceMappingURL=cash-app-pay.es.js.map
