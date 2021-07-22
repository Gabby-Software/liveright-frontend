import React, {useState, useEffect} from 'react';
import Styles from './profile-title.styles';

type Props = {
    title: string;
};
const ProfileTitle = ({title}:Props) => {
    return <Styles>{title}</Styles>
};

export default ProfileTitle;
