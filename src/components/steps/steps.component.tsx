import React, {useState, useEffect, Children, useMemo} from 'react';
import Styles from './steps.styles';
import {classes} from "../../pipes/classes.pipe";

type StepsProps = {
    children: React.ReactNode;
    currentStep: number;
}
type StepProp = {
    children: React.ReactNode;
    active?: number;
}
const Step = ({children, active}:StepProp) => {
    return (
        <div className={classes('steps__step', active && 'steps__step__active')}>
            {children}
        </div>
    )
};
const Steps = ({children, currentStep = 0}: StepsProps) => {
    const count = useMemo(() => {
        let c = 0;
        Children.forEach(children, _ => c++);
        return c;
    },[children]);
    return (
        <Styles>
            <div className={'steps__wrapper'} style={{width: `${100*count}%`, transform: `translateX(${-100/count*currentStep}%)`}}>
            {
                Children.map(children, ((child, i) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            ...child.props,
                            active: i === currentStep,
                        })
                    }
                    return child;
                }))
            }
            </div>
            <div className={'steps__dots'}>
                {
                    Children.map(children, ((_, i) => (
                        <div className={classes('steps__dot', i===currentStep&&'steps__dot__active')}/>
                    )))
                }
            </div>
        </Styles>
    );
};
Steps.Step = Step;
export default Steps;
