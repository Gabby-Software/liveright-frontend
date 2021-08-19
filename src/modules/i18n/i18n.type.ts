export type LanguagesType = 'en' | 'es'
export type I18nTypeNotEmpty = {
  lang: string
  setLang: (lang: string) => void
  strings: any
}
export type I18nType = {} | I18nTypeNotEmpty
