export type AuthRegisterType = {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
  account_type: 'client' | 'trainer'
}
