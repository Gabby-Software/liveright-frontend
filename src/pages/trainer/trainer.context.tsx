import React, {useState, createContext, useContext, ReactNode} from "react";
import APIGet, {APIGetType} from "../../hoc/api-get";
import {AccountObjType} from "../../types/account.type";
import {EP_GET_TRAINER} from "../../enums/api.enum";


export const TrainerContext = createContext<APIGetType<AccountObjType|null>>({loading:true, data:null, error:'' });
export const TrainerProvider = ({children}: {children:ReactNode}) => {
    return (
        <APIGet url={EP_GET_TRAINER}>
            {(data: APIGetType<AccountObjType|null>) => (
                <TrainerContext.Provider value={data}>
                    {children}
                </TrainerContext.Provider>
            )}
        </APIGet>
    )
};
