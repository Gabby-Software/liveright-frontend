import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../store/reducers";
import {AccountObjType, AccountType} from "../types/account.type";

export const useAuth = () => {
    return useSelector((state: RootState) => ({
        ...(state.auth as AccountObjType)?.accounts[0],
        ...state.auth as AccountObjType,
    } as (AccountObjType & AccountType)));
};
