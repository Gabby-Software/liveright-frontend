import React, {useState, useEffect, ChangeEventHandler, ChangeEvent} from 'react';
import Styles from './form-image-upload.styles';
import {Field, FieldProps, FormikProps} from "formik";
import {ReactComponent as TrashIcon} from "../../../assets/media/icons/trash.svg";
import fileManager from "../../../managers/file.manager";
import Badge from "../../badge/badge.component";

type Props = {
    name: string;
    label: string;
    onUpdate: (value: { file: File | null, url: string }) => void;
    children: React.ComponentType<{ url: string }>;
    aspectRatio?: number
};
const FormImageUpload = ({name, label, onUpdate, children: Children, aspectRatio}: Props) => {
    const handleChange = async (e: ChangeEvent<HTMLInputElement>, form: FormikProps<any>) => {
        if (!e?.target?.files || !e?.target?.files[0]) return;
        let [url, file] = await fileManager.resize(e.target.files[0], 1920);
        if (aspectRatio) {
            [url, file] = await fileManager.aspectRatio(file, 1);
        }
        form.setFieldValue(name, url);
        onUpdate && onUpdate({url, file});
    };
    const remove = (form: FormikProps<any>) => {
        form.setFieldValue(name, '');
        onUpdate && onUpdate({url:'', file: null});
    };
    return (
        <Field name={name}>
            {
                ({field, form}: FieldProps) => (
                    <Styles>
                        <div className={'image-upload__wrapper'}>
                            <Children url={field.value}/>
                            {
                                field.value?(
                                    <Badge type={'primary'} onClick={()=>remove(form)}><TrashIcon/></Badge>
                                ):null
                            }
                        </div>
                        <label>
                            <input onChange={(e) => {
                                handleChange(e, form)
                            }} type={'file'} accept={'image/*'}
                                   className={'image-upload__input'}/>
                            <div className={'image-upload__label'}>{label}</div>
                        </label>
                    </Styles>
                )
            }
        </Field>
    );
};

export default FormImageUpload;
