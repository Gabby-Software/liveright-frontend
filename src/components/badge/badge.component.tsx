import React, {useState, useEffect} from 'react';
import Styles from './badge.styles';
import {classes} from "../../pipes/classes.pipe";

type Props = {
    size?: 'small'|'regular'|'large',
    type: 'primary'|'secondary',
    children: React.ReactNode,
    onClick?: () => void;
}
const Badge = ({size='regular', type, children, onClick}: Props) => {
    return (
        <Styles className={classes('badge', `badge__${size}`, `badge__${type}`)}
            onClick={onClick}>
            {children}
        </Styles>
    )
};

export default Badge;
