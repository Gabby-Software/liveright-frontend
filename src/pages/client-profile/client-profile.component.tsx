import React, {useState, useEffect, useContext} from 'react';
import Styles from './client-profile.styles';
import {TrainerContext} from "../trainer/trainer.context";
import {useIsMobile} from "../../hooks/is-mobile.hook";
import {Skeleton} from "antd";
import ProfileImage from "../trainer/sections/profile-image/profile-image.component";
import ProfileBasic from "../trainer/sections/profile-basic/profile-basic.component";
import ProfileAddresses from "../trainer/sections/profile-addresses/profile-addresses.component";
import ProfileInfo from "../trainer/sections/profile-info/profile-info.component";
import ProfileTnb from "../trainer/sections/profile-tnb/profile-tnb.component";
import {ClientProfileProvider} from "./client.context";
import {useHeader} from "../../hooks/header.hook";
import {useTitle} from "../../hooks/title.hook";
import SessionsInvoices from "../trainer/sections/sessions-invoices/sessions-invoices.component";
import {useClient} from "../../hooks/client.hook";
import {Form, Formik, FormikHelpers} from "formik";
import {useDispatch} from "react-redux";
import {ACTION_UPDATE_CLIENT_REQUEST} from "../../store/action-types";
import {handleError} from "../../managers/api.manager";
import userTypes from "../../enums/user-types.enum";
import {AccountType} from "../../types/account.type";
import logger from "../../managers/logger.manager";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {toast} from "../../components/toast/toast.component";

type Props = {};
const ClientProfileContent = ({}: Props) => {
    const {loading, error, data, setEditMode} = useContext(TrainerContext);
    const dispatch = useDispatch();
    const isMobile = useIsMobile();
    const {t} = useTranslation();
    const {data: client} = useClient();
    useTitle(`Viewing ${client?.first_name || ''} ${client?.last_name || ''}`);
    const handleSubmit = (values: any, helper: FormikHelpers<any>) => {
        dispatch({
            type: ACTION_UPDATE_CLIENT_REQUEST, payload: {
                ...values,
                client_uuid: values.accounts.find((acc: AccountType) => acc.type === userTypes.CLIENT)?.uuid,
                onSuccess: () => {
                    helper.setSubmitting(false);
                    toast.show({type:"success", msg:t('alerts:client-update-success')});
                    setEditMode(false);
                },
                onError: handleError(helper)
            }});
    };

    if (loading)
        return <Skeleton/>;
    if (error)
        return <p>{error}</p>;

    return (
        <Formik onSubmit={handleSubmit} initialValues={data || {}}>
            <Form>
                <Styles className={'profile'}>
                    {/*<ProfileSidebar/>*/}
                    <div className={'profile__main'}>
                        <ProfileImage/>
                        <ProfileBasic title={`${data?.first_name}'s Profile`}/>
                        <ProfileAddresses/>
                        <ProfileInfo title={'Client Info'}/>
                        <SessionsInvoices/>
                    </div>
                </Styles>
            </Form>
        </Formik>
    );
};
const ClientProfile = () => (
    <ClientProfileProvider><ClientProfileContent/></ClientProfileProvider>
);
export default ClientProfile;
