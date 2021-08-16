import React, {useState, useEffect, FC, ReactNode, useRef} from 'react';
import Styles from './card-actions.styles';
import {SwipeType, useSwipe} from "../../hooks/swipe.hook";
import {useOutsideClick} from "../../hooks/click-outside.hook";
import logger from "../../managers/logger.manager";

type Props = {
    actions: ReactNode
};
const CardActions: FC<Props> = ({children, actions}) => {
    const swiperRef = useRef<HTMLDivElement>(null);
    const [animate, setAnimate] = useState(false);
    const [open, setOpen] = useState(false);
    useOutsideClick(swiperRef, () => setOpen(false), open);
    const handleSwipeStart = () => {
        setAnimate(true);
    }
    const handleSwipeEnd = ({x,y}: SwipeType) => {
        setAnimate(false);
        setOpen(true);
    }
    const {x, y} = useSwipe(swiperRef, ({x,y}) => {
        return x < -50
    },handleSwipeEnd, handleSwipeStart);
    return (
        <Styles ref={swiperRef}>
            <div className={'swipe__content'} style={{
                left: open?`-220px`:animate?`${Math.min(x,0)}px`:'0px',
                transition: animate?'none':'left .2s ease'
            }}>
                {children}
            </div>
            <div className={'swipe__actions'}>
                {actions}
            </div>
        </Styles>
    )
};

export default CardActions;
