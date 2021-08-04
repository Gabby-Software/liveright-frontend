import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../store/reducers";
import {APIGetType} from "../hoc/api-get";
import {AccountObjType} from "../types/account.type";
export const useClient = () => {
    return useSelector((state: RootState) => state.client) as APIGetType<AccountObjType|null>;
};
