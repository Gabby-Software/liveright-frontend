import React, {useState, useEffect, useContext} from 'react';
import Styles from './profile-field.styles';
import {ProfileContext} from "../../../pages/profile/desktop-profile/profile.context";
import FormInput from "../../forms/form-input/form-input.component";
import FormInputLabeled from "../../forms/form-input-labeled/form-input-labeled.component";
import FormDatepicker from "../../forms/form-datepicker/form-datepicker.component";
import FormRadio from "../../forms/form-radio-button/form-radio-button.component";

type Props = {
    name: string;
    value: string;
    editable?: boolean;
    formName: string;
    type?: string;
}
const ProfileField = ({name, value, editable, formName, type}: Props) => {
    const {editMode} = useContext(ProfileContext);
    return (
        <Styles>
            {
                editMode ? (
                    type === 'date' ? <FormDatepicker disabled={!editable} name={formName} label={name}/> :
                        type === 'radio' ? <FormRadio name={formName} label={name} options={[
                                {value: 'male',   label:'Male'},
                                {value: 'female', label:'Female'},
                            ]}/>
                        : <FormInputLabeled name={formName} label={name}/>
                ) : (
                    <>
                        <div className={'field__name'}>{name}</div>
                        <div className={'field__value'}>{value}</div>
                    </>
                )
            }
        </Styles>
    )
};

export default ProfileField;
