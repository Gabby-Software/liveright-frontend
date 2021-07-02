export const forOf = (n: number, callback: (i:number) => any) => Array(n).fill(0).map((_, i) => callback(i));
