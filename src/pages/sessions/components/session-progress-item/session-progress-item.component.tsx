import React from 'react';
import Styles from './session-progress-item.styles';

interface Props {
    label: string;
    target: number;
    current: number;
}

const SessionProgressItem: React.FC<Props> = (props) => {
    const {label, target, current} = props;

    return (
        <Styles>
            <span>{label}</span>
            <div>
                <span>{target}</span>
            </div>
            <div>
                <span>{current}</span>
                {current - target < 0 ? <span>{current - target}</span> : null}
            </div>
        </Styles>
    );
};

export default SessionProgressItem;
