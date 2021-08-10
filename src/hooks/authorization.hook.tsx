import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useEvent} from "./event.hook";
import cookieManager from "../managers/cookie.manager";
import {ACTION_LOGIN_SUCCESS} from "../store/action-types";
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

export const useAuthorization = () => {
    const dispatch = useDispatch();
    useEvent('focus', () => {
        const user = cookieManager.get('auth');
        dispatch({
            type: ACTION_LOGIN_SUCCESS,
            payload: user?JSON.parse(user):null
        });
    });
};
