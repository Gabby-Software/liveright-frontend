import React, {useState, useEffect} from 'react';
import Styles from './form-select-issuer.styles';
import {FormSelectUI} from "../../../../components/forms/form-select/form-select.component";
import {OptionType} from "../../../../types/option.type";
import api from "../../../../managers/api.manager";
import {EP_GET_INVOICE_ISSUERS, EP_GET_USER} from "../../../../enums/api.enum";
import logger from "../../../../managers/logger.manager";
import {AccountType} from "../../../../types/account.type";

type Props = {
    name: string;
    label: string;
    value: string;
    onUpdate: (val:string) => void;
};
const FormSelectIssuer = ({name, label, value, onUpdate}:Props) => {
    const [options, setOptions] = useState<OptionType[]>([]);
    useEffect(() => {
        api.get<{data:{id:number, user: {first_name:string, last_name:string}}[]}>(EP_GET_INVOICE_ISSUERS)
            .then(res => res.data.data)
            .then(res => {
                setOptions([
                    {label: "All issuers", value: ''},
                    ...res.map(({id, user}) => ({
                        label: `${user.first_name} ${user.last_name}`,
                        value: `${id}`
                    }))
                ]);
            });
    }, []);
    return (
        <FormSelectUI name={name} value={value} label={label} options={options} onUpdate={onUpdate}/>
    )
};

export default FormSelectIssuer;
