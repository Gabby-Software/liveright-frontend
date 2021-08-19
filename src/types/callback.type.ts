/* eslint-disable no-unused-vars */
export type CallbackType<G> = {
  onSuccess?: (res: G) => void
  onError?: (err: any) => void
}
