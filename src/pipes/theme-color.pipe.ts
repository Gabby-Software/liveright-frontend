import { VarsType } from '../assets/styles/_variables'

export function getColorCarry(color: keyof VarsType['colors']): any {
  return function (props: any): string {
    return props.theme.vars.colors[color]
  }
}

export function getColor(props: any, color: string): string {
  return props.theme.vars.colors[color]
}

export function getSpacing(props: any): string {
  return props.spacing * 0.25 + 'rem'
}
