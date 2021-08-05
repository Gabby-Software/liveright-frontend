import React, {useState, useEffect, useRef} from 'react';
import Styles from './form-client-select.styles';
import {OptionType} from "../../../types/option.type";
import FormSelect from "../form-select/form-select.component";
import api from "../../../managers/api.manager";
import {EP_GET_CLIENTS} from "../../../enums/api.enum";
import logger from "../../../managers/logger.manager";
import {AccountObjType} from "../../../types/account.type";
import userTypes from "../../../enums/user-types.enum";

type Props = {
    name: string,
    label: string,
};
const FormClientSelect = ({name, label}:Props) => {
    const [options, setOptions] = useState<OptionType[]>([]);
    const [input, setInput] = useState('');
    const timer = useRef(0);
    const m = useRef(Math.random());
    useEffect(() => {
        handleSearch('');
    },[])
    const handleSearch = (value: string) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(()=> {
            const d = Math.random();
            m.current = d;
            api.get(EP_GET_CLIENTS+`?status=active&query=${value}`)
                .then(res => res.data.data)
                .then(res => {
                    if(m.current !== d) return;
                    setOptions(res.map(({user}: {user: AccountObjType}) => ({
                        label: `${user.first_name} ${user.last_name}`,
                        value: user.accounts.find(acc => acc.type === userTypes.CLIENT)?.id || 0
                    })));
                });

        }, 400) as unknown as number;
    }
    return (
        <FormSelect name={name} label={label} options={options}
            onSearch={handleSearch}/>
    );
};

export default FormClientSelect;
