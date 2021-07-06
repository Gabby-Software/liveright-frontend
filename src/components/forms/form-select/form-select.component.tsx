import React, {useState, useEffect, useMemo} from 'react';
import {MobileStyles, DesktopStyles} from './form-select.styles';
import {Field, FieldProps, FormikProps} from 'formik';
import {OptionType} from "../../../types/option.type";
import {useIsMobile} from "../../../hooks/is-mobile.hook";
import SmallModal from "../../small-modal/small-modal.component";
import {ReactComponent as DownArrow} from "../../../assets/media/icons/down-arrow.svg";
import {Select} from "antd";
import FormError from "../form-error/form-error.component";

type FormSelectPropsType = {
    name: string;
    label: string;
    options: OptionType[];
    onUpdate?: (val: string) => void;
}
const FormSelect = ({name, label, options, onUpdate}: FormSelectPropsType) => {
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
                                <input onFocus={e => e.target.blur()} className={'select_input__input'}
                                       onClick={() => setIsModalOpen(true)} value={field.value}
                                />
                            </label>
                            <FormError name={name}/>
                            <SmallModal onCancel={() => setIsModalOpen(false)} visible={isModalOpen}
                                        title={label} menu={options.map(({label, value}) => ({
                                name: label, onClick: () => handleChange(label, form)
                            }))}/>
                        </MobileStyles>
                    ) : (
                        <DesktopStyles>
                            <label className={'select_input__cont'}>
                                <div className={'select_input__label'}>{label}</div>
                                <Select
                                    showSearch
                                    suffixIcon={<DownArrow/>}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    value={field.value}
                                    onChange={value => form.setFieldValue(name, value)}
                                    id={name}
                                    onBlur={form.handleBlur}
                                >
                                    {
                                        options.map(({label}) => (
                                            <Select.Option value={label}>{label}</Select.Option>
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
