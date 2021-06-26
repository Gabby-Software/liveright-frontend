import React, {useContext, ComponentType} from "react";
import {getStr, I18nContext} from "./i18n.context";
import {I18nTypeNotEmpty} from "./i18n.type";
import {config} from "./i18n.config";

export const useTranslation = () => {
    const {strings, lang, setLang} = useContext(I18nContext) as I18nTypeNotEmpty;
    const t = (key:string, data:any = {}) => {
        let file = 'common';
        if(key.includes(':')){
            file = key.split(':')[0];
            key = key.split(':')[1];
        }
        return getStr(strings[file], key, data) ||
            getStr(strings[config.defaultLanguage], key, data) || key;
    };
    return {t, lang, setLang};
};
export const withTranslations = (Component: ComponentType) => (props: any) => {
    const {t, lang, setLang} = useTranslation();
    return <Component {...props} t={t} lang={lang} setLang={setLang}/>
};
