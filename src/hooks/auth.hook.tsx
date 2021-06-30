import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../store/reducers";
import {AccountObjType} from "../types/account.type";

export const useAuth = () => {
    return useSelector((state: RootState) => state.auth as AccountObjType);
};
