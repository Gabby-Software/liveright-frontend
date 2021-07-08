import React, {useState, useEffect} from 'react';
import Styles from './action-icon.styles';
import {TableActionType} from "../../types/table-action.type";
import {HtmlType} from "../../types/html.type";

type Props = TableActionType & HtmlType;
const ActionIcon = ({icon, ...props}:Props) => {
    const Action = Styles(icon);
    return (
        <Action {...props}/>
    )
};

export default ActionIcon;
