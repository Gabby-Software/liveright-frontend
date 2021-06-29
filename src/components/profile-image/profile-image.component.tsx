import React, {useState, useEffect} from 'react';
import Styles from './profile-image.styles';
import {noImage} from "../../pipes/no-image.pipe";

type Props = {
    url: string | null;
    placeholder: string;
    size?: string;
}
const ProfileImage = ({url, placeholder, size = '86px'}: Props) => {
    return (
        <Styles style={{'--size': size} as any}>
            {url ? (
                <img alt={'profile'} src={url} className={'profile-image__img'}/>
            ) : (
                <div className={'profile-image__placeholder'}>{placeholder}</div>
            )}
        </Styles>
    );
};

export default ProfileImage;
