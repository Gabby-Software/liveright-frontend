import React, {useState, useEffect} from 'react';
import {AccountObjType} from "../types/account.type";
import {useEvent} from "./event.hook";
type IframeEventType = {
    event: string;
    key: string;
    [key:string]:any;
}
const messages = {
    CHECK_LOGIN: 'check_login',
    DO_LOGIN: 'do_login',
};
export const useAuthorization = (isAuthCallback: () => boolean, handleAuthCallback: (auth: AccountObjType) => void) => {

    useEffect(() => {
        const handler = ({data:{key, event, ...payload}}: MessageEvent<IframeEventType>) => {
            switch (event) {
                case messages.CHECK_LOGIN:
                    window.parent.postMessage({key, response: isAuthCallback()}, '*');
                    break;
                case messages.DO_LOGIN:
                    handleAuthCallback(payload as AccountObjType);
                    window.parent.postMessage({key, response: 1}, '*');
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);
};
