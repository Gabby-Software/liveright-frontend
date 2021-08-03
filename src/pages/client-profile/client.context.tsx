import React, {ReactNode} from "react";
import APIGet, {APIGetType} from "../../hoc/api-get";
import {EP_GET_CLIENTS, EP_GET_TRAINER} from "../../enums/api.enum";
import {AccountObjType} from "../../types/account.type";
import {TrainerContext} from "../trainer/trainer.context";
import {useParams} from "react-router";

export const ClientProfileProvider = ({children}: {children:ReactNode}) => {
    const {id} = useParams<any>();
    return (
        <APIGet url={EP_GET_CLIENTS+'/'+id}>
            {(data: APIGetType<AccountObjType|null>) => (
                <TrainerContext.Provider value={data}>
                    {children}
                </TrainerContext.Provider>
            )}
        </APIGet>
    )
};
