export interface ButtonProps {
  variant?: 'secondary' | 'text' | 'dark' | 'danger' | 'success'
  size?: 'sm' | 'md'
  onClick?: any
  className?: string
  to?: string
  LinkProps?: any
  type?: string
  disabled?: boolean
  htmlType?: string
  form?: string
  linkClassName?: string
  style?: object
}
