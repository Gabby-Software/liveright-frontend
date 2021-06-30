import React, {useState, useEffect} from 'react';
import Styles from './verify-email.styles';
import {useLocation, useParams} from "react-router-dom";
import logger from "../../../managers/logger.manager";
import {useDispatch} from "react-redux";
import {ACTION_VERIFY_EMAIL_REQUEST} from "../../../store/action-types";
import {VerifyEmailParamsType} from "../../../modules/auth/verify-email-params.type";
import {onlyGuest} from "../../../guards/guest.guard";

const VerifyEmail = () => {
    const {id, token} = useParams<VerifyEmailParamsType>();
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        logger.info('PARAMS', id, token, location.search);
        if(id && token) {
            const query = new URLSearchParams(location.search);
            dispatch({type: ACTION_VERIFY_EMAIL_REQUEST, payload: {id, token,
                    expires: query.get('expires'),
                    signature: query.get('signature'),
                    onSuccess:() => {},
                    onError:()=>{}
            }});
        }
    }, []);
    return (<div/>);
};

export default onlyGuest(VerifyEmail);
