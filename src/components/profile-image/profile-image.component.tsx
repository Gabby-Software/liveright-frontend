import React, {useState, useEffect} from 'react';
import Styles from './profile-image.styles';
import {noImage} from "../../pipes/no-image.pipe";
import {classes} from "../../pipes/classes.pipe";

type Props = {
    url: string | null;
    placeholder: string;
    className?: string;
}
const ProfileImage = ({url, placeholder, className}: Props) => {
    return (
        <Styles className={classes(className)}>
            {url ? (
                <img alt={'profile'} src={url} className={'profile-image__img'}/>
            ) : (
                <div className={'profile-image__placeholder'}><span>{placeholder}</span></div>
            )}
        </Styles>
    );
};

export default ProfileImage;
