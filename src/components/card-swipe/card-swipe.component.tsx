import React, {
  CSSProperties,
  useMemo,
  useRef,
  useState,
  ReactNode
} from 'react';

import {SwipeType, useSwipe} from "../../hooks/swipe.hook";
import {Wrapper, CardStyled, SwipeContentWrapper} from './card-swipe.style';
import {useOutsideClick} from "../../hooks/click-outside.hook";

interface Props {
  SwipeContent?: ReactNode;
  className?: string;
  dropThreshold?: number;
}

const CardSwipe: React.FC<Props> = (props) => {
  const {SwipeContent, children, className, dropThreshold = 150} = props;
  const wrapperRef = useRef(null);
  const ref = useRef(null);
  const [focused, setFocused] = useState(false);

  const handleSwipeEnd = ({x}: SwipeType) => {
    if (Math.abs(x) > dropThreshold) {
      setFocused(true);
    }
  };

  const {x} = useSwipe(ref, ({x}) => x < 0, handleSwipeEnd);

  const cardPosition = useMemo<number>(() => {
    if (focused) {
      return -dropThreshold;
    }

    return x < 0 ? x : 0;
  }, [x, focused, dropThreshold])

  const cardStyle = useMemo<CSSProperties>(() => ({
    left: `${cardPosition}px`,
  }), [cardPosition])

  const swipeContentStyle = useMemo<CSSProperties>(() => ({
    opacity: focused ? 1 : Math.abs(x * 0.5) / dropThreshold,
    width: dropThreshold,
  }), [x, focused, dropThreshold])

  useOutsideClick(wrapperRef, () => setFocused(false), focused)

  return (
      <Wrapper ref={wrapperRef} className={className}>
        <CardStyled style={cardStyle} ref={ref}>
          {children}
        </CardStyled>
        <SwipeContentWrapper style={swipeContentStyle}>
          {SwipeContent}
        </SwipeContentWrapper>
      </Wrapper>
  )
}

export default CardSwipe;
