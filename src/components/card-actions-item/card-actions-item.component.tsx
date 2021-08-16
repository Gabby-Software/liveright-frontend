import React, {useState, useEffect, ComponentType, FC, HTMLAttributes} from 'react';
import Styles from './card-actions-item.styles';
import {Link} from "react-router-dom";
import styled from "styled-components";

type Props = {
    onClick?: () => void;
    href?: string;
    className?: string;
}
const CardActionsItem: FC<Props> = ({onClick, href, className, children}) => {
    let Content = () => (
        <Styles className={className} onClick={e => {e.stopPropagation();onClick && onClick()}}>{children}</Styles>
    )
    if(href) {
        return (
                <Styles>
                    <Link to={href}>{children}</Link>
                </Styles>
        )
    }
    return <Styles>{children}</Styles>
};

export default CardActionsItem;
