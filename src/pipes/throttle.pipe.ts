export function* throttle<G extends unknown[]>(
  func: (...args: G) => void,
  time: number
) {
  let timerID = 0
  function throttled(...args: G) {
    clearTimeout(timerID)
    timerID = setTimeout(() => func(...args), time) as unknown as number
  }
  while (true) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    throttled(yield)
  }
}
