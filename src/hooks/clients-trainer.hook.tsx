import React, {useState, useEffect, useRef} from 'react';
import {FileType} from "../types/file.type";
import api from "../managers/api.manager";
import {EP_GET_TRAINER} from "../enums/api.enum";
import logger from "../managers/logger.manager";
import {useAuth} from "./auth.hook";
import userTypes from "../enums/user-types.enum";

export const useClientsTrainer = () => {
    const [trainer, setTrainer] = useState<null | {
        accounts?: { id: number, type: string, }[];
        first_name: string;
        last_name: string;
        avatar: null | FileType
    }>();
    const {type, uuid} = useAuth();
    useEffect(() => {
        api.get(EP_GET_TRAINER + `?return_minimal=1`)
            .then(res => res.data.data)
            .then(res => {
                logger.success('trainer data', res);
                setTrainer(res);
            })
            .catch(res => {
            })
    }, [type]);
    return trainer;
};
