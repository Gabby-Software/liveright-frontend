import React, {useState, useEffect, useMemo} from 'react';
import {MobileStyles, DesktopStyles} from './form-select.styles';
import {Field, FieldProps, FormikProps} from 'formik';
import {OptionType} from "../../../types/option.type";
import {useIsMobile} from "../../../hooks/is-mobile.hook";
import SmallModal from "../../small-modal/small-modal.component";
import {ReactComponent as DownArrow} from "../../../assets/media/icons/down-arrow.svg";
import {Select} from "antd";
import FormError from "../form-error/form-error.component";
import logger from "../../../managers/logger.manager";
import {classes} from "../../../pipes/classes.pipe";

type FormSelectPropsType = {
    name: string;
    label: string;
    options: OptionType[];
    onUpdate?: (val: string) => void;
    disabled?: boolean
}
const FormSelect = ({name, label, options, onUpdate, disabled}: FormSelectPropsType) => {
    const isMobile = useIsMobile();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const handleChange = (value: string, form: FormikProps<any>) => {
        form.setFieldValue(name, value);
        onUpdate && onUpdate(value);
    };
    return (
        <Field name={name}>
            {
                ({field, form}: FieldProps) => {
                    return isMobile ? (
                        <MobileStyles className={'select_input__wrapper'}>
                            <label className={'select_input__cont'}>
                                <div className={'select_input__label'}>{label}</div>
                                <input onFocus={e => e.target.blur()} className={classes('select_input__input', disabled && 'select_input__disabled')}
                                       onClick={() => disabled||setIsModalOpen(true)}
                                       value={options.find(op => op.value.toString() === field.value.toString())?.label}
                                />
                            </label>
                            <FormError name={name}/>
                            <SmallModal onCancel={() => setIsModalOpen(false)} visible={isModalOpen}
                                        title={label} menu={options.map(({label, value}) => ({
                                name: label, onClick: () => handleChange(value, form)
                            }))}/>
                        </MobileStyles>
                    ) : (
                        <DesktopStyles className={'select_input__wrapper'}>
                            <label className={classes('select_input__cont', form.errors[name] && form.touched[name] && 'select_input__error',)}>
                                <div className={'select_input__label'}>{label}</div>
                                <Select
                                    showSearch
                                    suffixIcon={<DownArrow/>}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    disabled={disabled}
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    value={options.find(op => op.value.toString() === field.value.toString())}
                                    labelInValue
                                    onChange={value => form.setFieldValue(name, value.value)}
                                    id={name}
                                    onBlur={form.handleBlur}
                                >
                                    {
                                        options.map(({label, value}) => (
                                            <Select.Option value={value}>{label}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </label>
                            <FormError name={name}/>
                        </DesktopStyles>
                    )
                }
            }
        </Field>
    )
};

export default FormSelect;
