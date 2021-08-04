import React, {useState, useEffect} from 'react';
import Styles from './profile-title.styles';

type Props = {
    title: string;
    children?: React.ReactNode
};
const ProfileTitle = ({title, children}:Props) => {
    return <Styles><span>{title}</span><span>{children}</span></Styles>
};

export default ProfileTitle;
