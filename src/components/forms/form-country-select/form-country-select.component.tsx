import React, {useState, useEffect} from 'react';
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import FormSelect from "../form-select/form-select.component";
import {OptionType} from "../../../types/option.type";

type FormCountrySelectPropsType = {
    name?: string;
    label?: string;
}
const FormCountrySelect = ({name = 'country', label}: FormCountrySelectPropsType) => {
    const {t} = useTranslation();
    const [countries, setCountries] = useState<OptionType[]>([]);
    useEffect(() => {
        import('./form-country-select.data.json').then(module => module.default).then((data) => {
            setCountries((data as unknown as string[]).map(c => ({label:c, value: c})));
        })
    }, []);
    return (
        <FormSelect name={name} label={label || t('profile:country')} options={countries}/>
    )
};

export default FormCountrySelect;
