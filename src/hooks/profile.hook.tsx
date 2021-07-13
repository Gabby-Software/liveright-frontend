import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/reducers";
import {ProfileDataType} from "../types/profile-data.type";
import {useAuth} from "./auth.hook";
import logger from "../managers/logger.manager";

export const useProfile = () => {
    const auth = useAuth();
    logger.info('AUTH PROFILE', auth.profile);
    return ({
        phone_number: '',
        address: '',
        city:'',
        country:'',
        dietary_restrictions: '',
        injuries: '',
        notes: '',
        custom_url: '',
        about: '',
        qualifications: '',
        additional_information: '',
        payment_info: {
            bank: '',
            branch_name:'',
            account_number: '',
            name_on_account: '',
            tax_id: ''
        },
        terms_and_conditions: {
            file_name: '',
            url: ''
        },
        ...auth.profile
    }) as ProfileDataType;
};
