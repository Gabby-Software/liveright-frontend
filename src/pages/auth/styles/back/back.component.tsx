import React, {useState, useEffect} from 'react';
import Link from './back.styles';
import {ReactComponent as BackIcon} from "../../../../assets/media/icons/back-arrow.svg";

const Back = ({to}: {to: string}) => {
    return (
        <Link to={to}>
            <BackIcon/>
        </Link>
    )
};

export default Back;
