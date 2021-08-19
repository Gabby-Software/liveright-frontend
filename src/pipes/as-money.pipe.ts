export const asMoney = (amount: string | number) =>
  String(amount).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
