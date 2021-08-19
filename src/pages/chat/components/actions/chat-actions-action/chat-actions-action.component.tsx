import React, {useState, useEffect, FC, ComponentType, SVGProps, ReactNode} from 'react';
import Styles from './chat-actions-action.styles';
import {classes} from "../../../../../pipes/classes.pipe";

type Props = {
    icon: ReactNode,
    color?: string,
    disabled?: boolean
};
const ChatActionsAction: FC<Props> = ({icon, color, disabled}) => {
    return (
        <Styles color={color} className={classes(disabled && 'chat-action__disabled')}>
            {icon}
        </Styles>
    );
};

export default ChatActionsAction;
