import React, { createContext, ReactNode, useEffect, useState } from 'react'

import translations from '../../assets/strings'
import { config } from './i18n.config'
import { I18nType, LanguagesType } from './i18n.type'
let initialLanguage: LanguagesType = (localStorage.getItem('language') ||
  config.defaultLanguage) as LanguagesType
if (!config.availableLanguages.includes(initialLanguage)) {
  initialLanguage = config.defaultLanguage as LanguagesType
  localStorage.setItem('language', initialLanguage)
}
export const getStr = (strObj: any, key: string, data: any) => {
  const keys = key.split('.')
  while (keys.length > 1) {
    const k = keys.shift()
    if (!strObj || !k) return ''
    strObj = strObj[k]
  }
  if (!strObj) return ''
  let str = strObj[keys[0]]
  if (!data) return str
  for (const [k, v] of Object.entries(data)) {
    str = str?.replace(new RegExp(`{{${k}}}`, 'g'), v)
  }
  return str
}
export const i18n: { t: (str: string, data?: any) => string } = {
  t: (x: string) => x
}
export const I18nContext = createContext<I18nType>({})
type Children = { children: ReactNode }
export const I18nProvider = ({ children }: Children) => {
  const [lang, setLang] = useState(initialLanguage)
  const [strings, setStrings] = useState(translations[initialLanguage])
  useEffect(() => {
    setStrings(translations[lang])
    localStorage.setItem('language', lang)
    i18n.t = (key: string, data: any = {}) => {
      let file = 'common'
      if (key.includes(':')) {
        file = key.split(':')[0]
        key = key.split(':')[1]
      }
      return getStr((translations[lang] as any)[file], key, data)
    }
  }, [lang])
  return (
    <I18nContext.Provider value={{ lang, setLang, strings }}>
      {children}
    </I18nContext.Provider>
  )
}
