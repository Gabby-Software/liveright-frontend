import React, {useState, useEffect, ChangeEvent} from 'react';
import Styles from './form-file-upload.styles';
import {Field, FieldProps, FormikProps} from "formik";
import FormError from "../form-error/form-error.component";
import {ReactComponent as AddIcon} from "../../../assets/media/icons/add.svg";
import {ReactComponent as TrashIcon} from "../../../assets/media/icons/trash.svg";
import fileManager from "../../../managers/file.manager";
import {useTranslation} from "../../../modules/i18n/i18n.hook";

type Props = {
    name: string;
    label?: string;
    initialFilename?: string;
    onUpdate: (file: File|null) => void;
};
const FormFileUpload = ({name, label, initialFilename, onUpdate}: Props) => {
    const [filename, setFilename] = useState<string>(initialFilename||'');
    const {t} = useTranslation();
    const handleChange = (e: ChangeEvent<HTMLInputElement>, form: FormikProps<any>) => {
        if (!e?.target?.files || !e?.target?.files[0]) return;
        const file = e?.target?.files[0];
        fileManager.readAsUrl(e.target.files[0])
            .then(url => {
                setFilename(file.name);
                form.setFieldValue(name, url);
                onUpdate && onUpdate(file);
            })
    };
    const remove = (form:FormikProps<any>) => {
        form.setFieldValue(name, '');
        setFilename('');
        onUpdate && onUpdate(null);
    };
    return (
        <Field name={name}>
            {
                ({field, form}: FieldProps) => (
                    <Styles className={'file_input__wrapper'}>
                        {label?(
                            <div className={'file_input__label'}>{label}</div>
                        ):null}
                        <div className={'file_input__accept'}>{'upload .txt, .pdf, .doc'}</div>
                        <label className={'file_input__add'}>
                            <AddIcon/>
                            <input type={'file'} accept={'.txt,.pdf,.doc'} style={{display:'none'}}
                                onChange={e => handleChange(e,form)} onBlur={form.handleBlur} name={name}/>
                        </label>
                        <div className={'file_input__bottom'}>
                            <div className={'file_input__filename'}>{filename}</div>
                            {field.value ? <span
                                className={'file_input__delete'}
                                onClick={() => remove(form)}>{t('remove')}</span>:null}
                        </div>
                        <FormError name={name}/>
                    </Styles>
                )}
        </Field>
    )
};

export default FormFileUpload;
