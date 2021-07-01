import React, {useState, useEffect} from 'react';
import Styles from './profile-heading.styles';
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/reducers"
import {ReactComponent as LocationIcon} from "../../../../assets/media/icons/location.svg";
import {ReactComponent as EditIcon} from "../../../../assets/media/icons/edit.svg";
import {excerpt} from "../../../../pipes/excerpt.pipe";
import {Link} from "react-router-dom";
import {Routes} from "../../../../enums/routes.enum";
import ProfileImage from "../../../../components/profile-image/profile-image.component";
import {noImage} from "../../../../pipes/no-image.pipe";
import {useProfile} from "../../../../hooks/profile.hook";
import {useAuth} from "../../../../hooks/auth.hook";

const ProfileHeading = () => {
    const {address} = useProfile();
    const {avatar_thumb, first_name, last_name} = useAuth();
    return (
        <Styles>
            <ProfileImage url={avatar_thumb} placeholder={noImage(first_name, last_name)}/>
            <div className={'profile-heading__data'}>
                <div className={'profile-heading__name'}>{first_name} {last_name}</div>
                {
                    address ? (
                        <div className={'profile-heading__address'}>
                            <LocationIcon/>
                            <span>{excerpt(address, 23)}</span>
                        </div>
                    ): null
                }
            </div>
            <Link to={Routes.EDIT_PROFILE}
                  className={'profile-heading__edit'}>
                <EditIcon/>
            </Link>
        </Styles>
    );
};

export default ProfileHeading;
