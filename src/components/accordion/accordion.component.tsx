import React, {useState, useEffect, HTMLProps, useRef} from 'react';
import Styles from './accordion.styles';
import Card from "../card/card.style";
import {ReactComponent as DownArrowIcon} from "../../assets/media/icons/down-arrow.svg";
import {classes} from "../../pipes/classes.pipe";

type ItemPropsType =  {
    children: React.ReactNode,
    title: string;
    open?: boolean;
    switchOpen?: () => void;
}
const Item = ({children, title, open, switchOpen}: ItemPropsType) => {
    const content = useRef<HTMLDivElement>(null);
    return (
        <article className={'accordion__item'}>
            <Card>
                <div className={'accordion__header'} onClick={switchOpen}>
                    <h3 className={'accordion__title'}>{title}</h3>
                    <DownArrowIcon className={classes('accordion__icon', open && 'accordion__icon__open')}/>
                </div>
                <div className={'accordion__body'}
                    style={{height: `${open?(content?.current?.scrollHeight || ''):0}px`}} ref={content}>
                    <div>
                    {children}
                    </div>
                </div>
            </Card>
        </article>
    );
};
type AccordionPropsType = HTMLProps<HTMLDivElement> & {
    children: React.ReactNode,
}
const Accordion = ({children, ...props}: AccordionPropsType) => {
    const [open, setOpen] = useState(-1);
    return (
        <Styles onClick={props.onClick} style={props.style} className={props.className}>
            {
                React.Children.map(children, ((child, i) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {...child.props,
                            open: i === open,
                            switchOpen: () => setOpen(i === open ? -1 : i)})
                    }
                    return child;
                }))
            }
        </Styles>
    )
};
Accordion.Item = Item;
export default Accordion;
