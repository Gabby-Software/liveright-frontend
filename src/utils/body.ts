export function kgToLb(kg: any): number {
  return Number((Number(kg) * 2.205).toFixed(2))
}

export function lbToKg(lb: any): number {
  return Number((Number(lb) / 2.205).toFixed(2))
}
