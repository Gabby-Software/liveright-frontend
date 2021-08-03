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

type Props = {};
const ClientProfileContent = ({}:Props) => {
    const {loading, error, data} = useContext(TrainerContext);
    const isMobile = useIsMobile();
    useTitle(`Viewing ${data?.first_name} ${data?.last_name}`);

    if (loading)
        return <Skeleton/>;
    if (error)
        return <p>{error}</p>;

    return (
        <Styles className={'profile'}>
            {/*<ProfileSidebar/>*/}
            <div className={'profile__main'}>
                <ProfileImage/>
                <ProfileBasic title={'Basic Client Profile'}/>
                <ProfileAddresses/>
                <ProfileInfo/>
            </div>
        </Styles>
    );
};
const ClientProfile = () => (
  <ClientProfileProvider><ClientProfileContent/></ClientProfileProvider>
);
export default ClientProfile;
