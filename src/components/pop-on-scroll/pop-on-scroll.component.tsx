import React, {useState, useEffect, useMemo, useRef} from 'react';
import Styles from './pop-on-scroll.styles';
import {useScroll} from "../../hooks/scroll.hook";
import Animator from "../../hoc/animator/animator.component";

type Props = {
    children: React.ReactNode,
    offset?: number
};
const PopOnScroll = ({children, offset = 70}: Props) => {
    const scrollTop = useScroll();
    const ref = useRef<HTMLDivElement>(null);
    const top = useMemo(() => {
        if (!ref.current) return 0;
        return ref.current.getBoundingClientRect().top < window.innerHeight - offset ? 0 : offset
    }, [scrollTop, ref.current]);
    return (
        <Styles ref={ref} style={{top: `${top}px`}}>
            {children}
        </Styles>
    )
};

export default PopOnScroll;
