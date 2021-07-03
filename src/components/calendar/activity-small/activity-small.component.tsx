import React, {useState, useEffect} from 'react';
import Styles from './activity-small.styles';
import {classes} from "../../../pipes/classes.pipe";

type Props = {
    type: string;
    name: string;
    time: string;
}

const ActivitySmall = ({type, name, time}: Props) => {
    return (
        <Styles className={classes('activity-small')}>
            <div className={classes('activity-small__content',`activity-small__${type}`)}>
                <span className={classes('activity-small__name' )}>{name}</span>
                <span className={'activity-small__time'}>{time}</span>
            </div>
        </Styles>
    );
};

export default ActivitySmall;
