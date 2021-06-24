import React, {useState, useEffect} from 'react';
import Styles from './profile-title.styles';

type Props = {
    title: string;
    children?: React.ReactNode;
}
const ProfileTitle = ({children, title}: Props) => {
    return (
        <Styles>
            <h2>{title}</h2>
            {children}
        </Styles>
    );
};

export default ProfileTitle;
