import React, {useState, useEffect, useRef} from 'react';
import Styles from './carousel.styles';
import {ReactComponent as RightArrow} from "../../assets/media/icons/right-arrow.svg";
import {ReactComponent as LeftArrow} from "../../assets/media/icons/left-arrow.svg";
import logger from "../../managers/logger.manager";
import {useEvent} from "../../hooks/event.hook";

type Props = {
    children: React.ReactNode
};
const Carousel = ({children}: Props) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [scrollX, setScrollX] = useState(0);
    const [scrollWidth, setScrollWidth] = useState(0);
    useEvent('resize', () => {
        setScrollWidth((carouselRef?.current?.scrollWidth || 0)-(carouselRef?.current?.offsetWidth||0));
        setScrollX(carouselRef?.current?.scrollLeft || 0)
    });
    useEffect(() => {
        setScrollWidth((carouselRef?.current?.scrollWidth || 0)-(carouselRef?.current?.offsetWidth||0))
    }, [carouselRef]);
    const move = (n:number) => {
        if(!carouselRef.current) return;
        const scrollTo = carouselRef.current.offsetWidth*n+carouselRef.current.scrollLeft;
        carouselRef.current.scrollTo({left: scrollTo, behavior: "smooth"});
        setScrollX(scrollTo);
    };
    const prev = () => {
        move(-1);
    };
    const next = () => {
        move(1);
    };
    logger.info('CAROUSEL DATA', carouselRef?.current?.scrollWidth, carouselRef?.current?.scrollLeft);
    return (
        <Styles className={'carousel'}>
            <div className={'carousel__wrapper'} ref={carouselRef}>
                {
                    scrollX > 0 ? (
                        <div className={'carousel__action carousel__left'}
                             onClick={prev}>
                            <LeftArrow/>
                        </div>
                    ) : null
                }
            <div className={'carousel__cont'}>
                {children}
            </div>
                {
                    scrollX < scrollWidth ? (
                        <div className={'carousel__action carousel__right'}
                             onClick={next}>
                            <RightArrow/>
                        </div>
                    ) : null
                }
            </div>
        </Styles>
    );
};

export default Carousel;
