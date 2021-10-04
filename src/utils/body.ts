export function kgToLb(kg: number): number {
  return Number((kg * 2.205).toFixed(2))
}

export function lbToKg(lb: number): number {
  return Number((lb / 2.205).toFixed(2))
}
