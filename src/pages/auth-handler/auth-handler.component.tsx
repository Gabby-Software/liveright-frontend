import React, {useState, useEffect} from 'react';
import Styles from './auth-handler.styles';
import {useAuthorization} from "../../hooks/authorization.hook";

const AuthHandler = () => {
    useAuthorization(() => {
        return !!localStorage.getItem('token')
    }, (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', user.access_token);
    });
    return null;
};

export default AuthHandler;
