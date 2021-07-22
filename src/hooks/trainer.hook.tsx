import React, {useState, useEffect, useContext} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../store/reducers";
import {TrainerType} from "../types/trainer.type";
import {TrainerContext} from "../pages/trainer/trainer.context";
import {APIGetType} from "../hoc/api-get";
import {AccountObjType, AccountType} from "../types/account.type";
import userTypes from "../enums/user-types.enum";
import {AddressType} from "../types/address.type";
export const useTrainer = () => {
    const {data} = useContext(TrainerContext) as APIGetType<AccountObjType>;
    const acc = data.accounts.find(acc => acc.type === userTypes.TRAINER);
    const addr = acc?.addresses?.find(addr => addr.is_default);
    return {
        ...data,
        ...acc,
        ...acc?.profile,
        ...addr
    } as AccountObjType & AccountType & AddressType;
    // return useSelector((state: RootState) => state.trainer) as TrainerType;
};
