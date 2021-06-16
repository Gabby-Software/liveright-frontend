import React, {useState, useContext} from "react";
import {I18nContext} from "./i18n.context";
import {I18nTypeNotEmpty} from "./i18n.type";
import {config} from "./i18n.config";

export const useTranslation = () => {
    const {strings, lang, setLang} = useContext(I18nContext) as I18nTypeNotEmpty;
    const getStr = (strObj: any, key: string, data: any) => {
        const keys = key.split('.');
        while (keys.length > 1) {
            const k = keys.shift();
            if(!strObj || !k) return false;
            strObj = strObj[k];
        }
        if(!strObj) return false;
        let str = strObj[keys[0]];
        if(!data) return str;
        for(const [k,v] of Object.entries(data)) {
            str = str?.replace(new RegExp(`{{${k}}}`, 'g'), v);
        }
        return str;
    };
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
