import React, {useState, useEffect} from 'react';
import Styles from './profile-heading.styles';
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/reducers"
import {ReactComponent as LocationIcon} from "../../../../assets/media/icons/location.svg";
import {ReactComponent as EditIcon} from "../../../../assets/media/icons/edit.svg";
import {excerpt} from "../../../../pipes/excerpt.pipe";
import {Link} from "react-router-dom";
import {Routes} from "../../../../enums/routes.enum";

const ProfileHeading = () => {
    const {image, first_name, last_name, address} = useSelector((state: RootState) => state.account);
    return (
        <Styles>
            <img alt={'profile'} src={image} className={'profile-heading__image'}/>
            <div className={'profile-heading__data'}>
                <div className={'profile-heading__name'}>{first_name} {last_name}</div>
                <div className={'profile-heading__address'}>
                    <LocationIcon/>
                    <span>{excerpt(address, 23)}</span>
                </div>
            </div>
            <Link to={Routes.EDIT_PROFILE}
                  className={'profile-heading__edit'}>
                <EditIcon/>
            </Link>
        </Styles>
    );
};

export default ProfileHeading;