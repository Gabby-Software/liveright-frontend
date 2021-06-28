export type CallbackType<G> = {
    onSuccess?: (res: G) => void;
    onError?: (err: string) => void;
}
