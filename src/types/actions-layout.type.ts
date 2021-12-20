export type ActionsLayout = 'left' | 'right' | 'between' | 'around' | 'center'

export const layoutMap: { [key in ActionsLayout]: string } = {
  left: 'flex-start',
  right: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  center: 'center'
}
