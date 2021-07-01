import React, {useState, useEffect, ChangeEventHandler, ChangeEvent} from 'react';
import Styles from './form-image-upload.styles';
import {Field, FieldProps, FormikProps} from "formik";
import {ReactComponent as TrashIcon} from "../../../assets/media/icons/trash.svg";
import fileManager from "../../../managers/file.manager";
import Badge from "../../badge/badge.component";
import {useIsMobile} from "../../../hooks/is-mobile.hook";
import SmallModal from "../../small-modal/small-modal.component";

type Props = {
    name: string;
    label: string;
    onUpdate: (value: { file: File | null, url: string }) => void;
    children: React.ComponentType<{ url: string }>;
    aspectRatio?: number
};
const FormImageUpload = ({name, label, onUpdate, children: Children, aspectRatio}: Props) => {
    const isMobile = useIsMobile();
    const [modalOpen, setModalOpen] = useState(false);
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
                        {
                            isMobile ? (
                                <>
                                    <div className={'image-upload__wrapper'}>
                                        <Children url={field.value}/>
                                    </div>
                                    <div className={'image-upload__label'} onClick={() => setModalOpen(true)}>{label}</div>
                                    <SmallModal visible={modalOpen} onCancel={() => setModalOpen(false)} title={'Change Profile Photo'} menu={[
                                        {name: 'Upload Photo', Wrap: ({children}:{children:React.ReactNode}) => (
                                                <label>
                                                    <input onChange={(e) => {handleChange(e, form)}} type={'file'} accept={'image/*'}
                                                           style={{display: 'none'}}/>
                                                    {children}
                                                </label>
                                            )},
                                        field.value?{name: 'Remove Photo', type: 'primary', onClick: () => remove(form)}:null,
                                        {name: 'Cancel', onClick: () => setModalOpen(false)},
                                    ]}/>
                                </>
                            ) : (
                                <>
                                    <div className={'image-upload__wrapper'}>
                                        <label style={{cursor:'pointer'}}>
                                            <Children url={field.value}/>
                                            <input onChange={(e) => {handleChange(e, form)}} type={'file'} accept={'image/*'}
                                                   className={'image-upload__input'}/>
                                        </label>
                                        {
                                            field.value?(
                                                <Badge type={'primary'} onClick={()=>remove(form)}><TrashIcon/></Badge>
                                            ):null
                                        }
                                    </div>
                                </>
                            )
                        }
                    </Styles>
                )
            }
        </Field>
    );
};

export default FormImageUpload;
