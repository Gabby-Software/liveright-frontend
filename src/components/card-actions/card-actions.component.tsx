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
        logger.info('swipe data start', animate, open, x, `${Math.min(-x,0)}px`)
        setAnimate(true);
    }
    const handleSwipeEnd = ({x,y}: SwipeType) => {
        logger.info('swipe data end', animate, open, x, `${Math.min(-x,0)}px`)
        setAnimate(false);
        setOpen(true);
    }
    const {x, y} = useSwipe(swiperRef, ({x,y}) => {
        logger.info('swipe data end x',x);
        return x < -50
    },handleSwipeEnd, handleSwipeStart);
    // logger.info('swipe data show', animate, open, x, `${Math.min(-x,0)}px`)
    return (
        <Styles ref={swiperRef}>
            <div className={'swipe__content'} style={{
                left: animate?`${Math.min(x,0)}px`:open?`-220px`:'0px',
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
