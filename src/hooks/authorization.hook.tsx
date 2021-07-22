import React, {useState, useEffect} from 'react';
type IframeEventType = {
    event: string;
    key: string;
    [key:string]:any;
}
const messages = {
    CHECK_LOGIN: 'check_login',
    DO_LOGIN: 'do_login',
};
export type GenderType = 'male'|'female'|'other';
export type AccountTypeType = 'client'|'trainer'|'org'|'admin';
export type AccountType = {
    id: number;
    uuid: string;
    type: AccountTypeType;
    is_active: true;
    last_used_at: string | null;
    account_level: string | null;
    is_current: boolean;
    profile: null | string;

}
export type AuthObjectType = {
    uuid: string;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string | null;
    is_active: boolean;
    birthday: string | null;
    gender: GenderType;
    avatar: string|null;
    avatar_thumb: string | null;
    created_at: string;
    accounts: AccountType[]
}

export type AuthResponseType = {
    access_token: string;
    user: AuthObjectType;
}

export const useAuthorization = (isAuthCallback: () => AuthResponseType, handleAuthCallback: (auth: AuthResponseType) => void) => {

    useEffect(() => {
        const handler = ({data:{key, event, ...payload}}: MessageEvent<IframeEventType>) => {
            switch (event) {
                case messages.CHECK_LOGIN:
                    window.parent.postMessage({key, response: isAuthCallback()}, '*');
                    break;
                case messages.DO_LOGIN:
                    handleAuthCallback(payload as AuthResponseType);
                    window.parent.postMessage({key, response: 1}, '*');
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);
};
