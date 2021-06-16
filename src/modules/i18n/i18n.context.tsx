import React, {createContext, useState, useEffect, ReactNode} from 'react';
import translations from '../../assets/strings';
import {config} from "./i18n.config";
import {LanguagesType, I18nType, I18nTypeNotEmpty} from "./i18n.type";
let initialLanguage: LanguagesType = (localStorage.getItem('language') || config.defaultLanguage) as LanguagesType;
if (!config.availableLanguages.includes(initialLanguage)) {
    initialLanguage = config.defaultLanguage as LanguagesType;
    localStorage.setItem('language', initialLanguage);
}
console.log('languages', translations, initialLanguage, translations[initialLanguage]);

export const I18nContext = createContext<I18nType>({});
type Children = {children: ReactNode}
export const I18nProvider = ({children}: Children) => {
    const [lang, setLang] = useState(initialLanguage);
    const [strings, setStrings] = useState(translations[initialLanguage]);
    useEffect(() => {
        setStrings(translations[lang]);
        localStorage.setItem('language', lang)
    }, [lang]);
    return (
        <I18nContext.Provider value={{lang, setLang, strings}}>
            {children}
        </I18nContext.Provider>
    )
};
