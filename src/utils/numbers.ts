export function renderNum(num?: number) {
  return typeof num === 'number' ? `${num}` : '-'
}
