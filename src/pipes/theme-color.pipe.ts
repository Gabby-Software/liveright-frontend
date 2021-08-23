export function getColorCarry(color: string): any {
  return function (props: any): string {
    return props.theme.vars.colors[color]
  }
}

export function getColor(props: any, color: string): string {
  return props.theme.vars.colors[color]
}
