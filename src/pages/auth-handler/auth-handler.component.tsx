import React, {useState, useEffect} from 'react';
import Styles from './auth-handler.styles';
import {AuthObjectType, AuthResponseType, useAuthorization} from "../../hooks/authorization.hook";

const AuthHandler = () => {
    useAuthorization(() => {
        const access_token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('auth') || '{}');
        return {access_token, user} as AuthResponseType;
    }, (user) => {
        localStorage.setItem('auth', JSON.stringify(user.user));
        localStorage.setItem('token', user.access_token);
    });
    return null;
};

export default AuthHandler;
