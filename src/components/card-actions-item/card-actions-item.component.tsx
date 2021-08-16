import React, {useState, useEffect, ComponentType, FC, HTMLAttributes} from 'react';
import Styles from './card-actions-item.styles';
import {Link} from "react-router-dom";
import styled from "styled-components";
import {classes} from "../../pipes/classes.pipe";

type Props = {
    onClick?: () => void;
    href?: string;
    className?: string;
    disabled?: boolean;
}
const CardActionsItem: FC<Props> = ({disabled, onClick, href, className, children}) => {
    if(href) {
        return (
                <Styles className={classes(className, disabled && 'card-action-item__disabled')}>
                    <Link to={href} onClick={disabled?undefined:onClick}>{children}</Link>
                </Styles>
        )
    }
    return <Styles className={classes(className, disabled && 'card-action-item__disabled')}
                   onClick={disabled?undefined:onClick}><a>{children}</a></Styles>
};

export default CardActionsItem;
