import React, {
  CSSProperties,
  ReactNode,
  useMemo,
  useRef,
  useState
} from 'react'

import { useOutsideClick } from '../../hooks/click-outside.hook'
import { SwipeType, useSwipe } from '../../hooks/swipe.hook'
import { CardStyled, SwipeContentWrapper, Wrapper } from './card-swipe.style'

interface Props {
  SwipeContent?: ReactNode
  className?: string
  dropThreshold?: number
}

const CardSwipe: React.FC<Props> = (props) => {
  const { SwipeContent, children, className, dropThreshold = 150 } = props
  const swipeContentRef = useRef(null)
  const ref = useRef(null)
  const [focused, setFocused] = useState(false)
  const [animate, setAnimate] = useState(false)

  const handleSwipeEnd = ({ x }: SwipeType) => {
    if (Math.abs(x) > dropThreshold) {
      setFocused(true)
    }

    setAnimate(true)
  }

  const handleSwipeStart = () => {
    setAnimate(false)
  }

  const { x } = useSwipe(
    ref,
    ({ x }) => x < 0,
    handleSwipeEnd,
    handleSwipeStart
  )

  const cardPosition = useMemo<number>(() => {
    if (focused) {
      return -dropThreshold
    }

    return x < 0 ? x : 0
  }, [x, focused, dropThreshold])

  const cardStyle = useMemo<CSSProperties>(
    () => ({
      left: SwipeContent ? `${cardPosition}px` : 0,
      transition: animate ? 'left 0.1s ease' : 'none'
    }),
    [cardPosition, animate]
  )

  const swipeContentStyle = useMemo<CSSProperties>(
    () => ({
      opacity: focused ? 1 : Math.abs(x * 0.5) / dropThreshold,
      width: dropThreshold
    }),
    [x, focused, dropThreshold]
  )

  useOutsideClick(swipeContentRef, () => setFocused(false), focused)

  return (
    <Wrapper className={className}>
      <CardStyled style={cardStyle} ref={ref}>
        {children}
      </CardStyled>
      <SwipeContentWrapper ref={swipeContentRef} style={swipeContentStyle}>
        {SwipeContent}
      </SwipeContentWrapper>
    </Wrapper>
  )
}

export default CardSwipe
