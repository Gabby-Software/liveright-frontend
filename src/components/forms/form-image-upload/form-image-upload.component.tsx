import React, {useState, useEffect, ChangeEventHandler, ChangeEvent} from 'react';
import Styles from './form-image-upload.styles';
import {Field, FieldProps, FormikProps} from "formik";
import FormButton from "../form-button/form-button.component";
import fileManager from "../../../managers/file.manager";

type Props = {
    name: string;
    label: string;
    onUpdate: (value: {file: File | null, url: string}) => void;
    children: React.ComponentType<{url: string}>;
    aspectRatio?: number
};
const FormImageUpload = ({name, label, onUpdate, children:Children, aspectRatio}: Props) => {
    const handleChange = async (e: ChangeEvent<HTMLInputElement>, form: FormikProps<any>) => {
        if (!e?.target?.files || !e?.target?.files[0]) return;
        let [url, file] = await fileManager.resize(e.target.files[0], 1920);
        if (aspectRatio) {
            [url, file] = await fileManager.aspectRatio(file, 1);
        }
        form.setFieldValue(name, url);
        onUpdate && onUpdate({url, file});
    };
    return (
        <Field name={name}>
            {
                ({field, form}: FieldProps) => (
                    <Styles>
                        <Children url={field.value}/>
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
