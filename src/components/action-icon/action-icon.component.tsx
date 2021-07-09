import React, {useState, useEffect} from 'react';
import Styles from './action-icon.styles';
import {TableActionType} from "../../types/table-action.type";
import {HtmlType} from "../../types/html.type";
import {Tooltip} from "antd";

type Props = TableActionType & HtmlType;
const ActionIcon = ({icon, title,  ...props}:Props) => {
    const Action = Styles(icon);
    return (
        <Tooltip title={title}>
             <Action {...props}/>
        </Tooltip>
    )
};

export default ActionIcon;
