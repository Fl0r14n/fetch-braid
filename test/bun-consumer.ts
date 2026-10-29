// Typechecked against Bun's globals (tsconfig.bun.json), where `typeof fetch` also carries fetch.preconnect:
// interceptors written as plain arrow functions, the way the README shows them, must still be accepted
import { createFetch, rest } from '../src'

const api = createFetch()
api.use(next => (input, init) => next(input, api.withHeader(init, 'x-test', '1')))
api.use(next => async (input, init) => {
  const response = await next(input, init)
  return (response.status === 401 && next(input, init)) || response
})

export const client: ReturnType<typeof rest> = rest('https://example.test/api', api.fetch)
export const overBunFetch: ReturnType<typeof createFetch> = createFetch(fetch)
