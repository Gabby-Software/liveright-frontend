import React, {useState, useEffect} from 'react';
import Styles from './profile-addresses.styles';
import ProfileTitle from "../../components/profile-title/profile-title.component";
import {ArrayHelpers, Field, FieldArray, FieldProps, FormikProps} from "formik";
import FormRow from "../../../../components/forms/form-row/form-row.component";
import FormInputLabeled from "../../../../components/forms/form-input-labeled/form-input-labeled.component";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import FormCountrySelect from "../../../../components/forms/form-country-select/form-country-select.component";
import {AddressType} from "../../../../types/address.type";
import ProfileField from "../../components/profile-field/profile-field.component";
import {classes} from "../../../../pipes/classes.pipe";
import {useTrainer} from "../../../../hooks/trainer.hook";

type Props = {};
const ProfileAddresses = ({}: Props) => {
    const {t} = useTranslation();
    const {country, city, address, postal_code} = useTrainer();
    if(!(country ||city || address || postal_code)) return null;
    return (
        <Styles>
            <ProfileTitle title={'Address'}/>


            <FormRow>
                <ProfileField type={'text'} name={`address`}
                              label={t('profile:address')}/>
                <FormRow>
                    <ProfileField type={'text'}
                                  name={`postal_code`}
                                  label={t('profile:postal-code')}/>
                    <ProfileField type={'text'}
                                  name={`city`}
                                  label={t('profile:city')}/>
                </FormRow>
                <ProfileField type={'country-select'}
                              name={`country`}
                              label={t('profile:country')}/>
            </FormRow>
        </Styles>
    )
};

export default ProfileAddresses;
