import React, {useState, useEffect} from 'react';
import Styles from './profile-image.styles';
import {noImage} from "../../pipes/no-image.pipe";
import {classes} from "../../pipes/classes.pipe";
import {HtmlType} from "../../types/html.type";

type Props =  {
    url?: string | null;
    placeholder: string;
    className?: string;
    onClick?: () => void;
}
const ProfileImage = ({url, placeholder, ...props}: Props) => {
    return (
        <Styles {...props}>
            {url ? (
                <img alt={'profile'} src={url} className={'profile-image__img'}/>
            ) : (
                <div className={'profile-image__img'}><span>{placeholder}</span></div>
            )}
        </Styles>
    );
};

export default ProfileImage;
