import { Colors } from '../assets/styles/_variables'

export function getColorCarry(color: keyof Colors): any {
  return function (props: any): string {
    return props.theme.vars.colors[color]
  }
}

export function getColor(props: any, color: string): string {
  return props.theme.vars.colors[color]
}
