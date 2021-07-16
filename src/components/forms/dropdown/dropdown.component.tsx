import React, {useState, useEffect, useRef} from 'react';
import Styles from './dropdown.styles';
import {MenuItemType} from "../../../types/menu-item.type";
import {Link} from "react-router-dom";
import {ReactComponent as DownArrowIcon} from "../../../assets/media/icons/down-arrow.svg";
import {useHoverOutside} from "../../../hooks/hover-outside.hook";
import {classes} from "../../../pipes/classes.pipe";

type DropdownPropsType = {
    menu: (MenuItemType | React.ReactNode)[];
    children: React.ReactNode;
};
const Dropdown = ({children, menu}: DropdownPropsType) => {
    const ref = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useHoverOutside(ref);
    const handleClick = (onClick?:() => void ) => {
        setOpen(false);
        onClick && onClick();
    };
    return (
        <Styles className={classes('dropdown',open && 'dropdown__open')} ref={ref}>
            {children}
            <DownArrowIcon className={'dropdown__arrow'}/>
            <div className={'dropdown__menu'} >
                <ul>
                    {
                        menu.map((Item) => {
                            if(React.isValidElement(Item))
                                return Item;
                            const {name, url, onClick} = Item as MenuItemType;
                            return (
                                <li className={'dropdown__item'}>
                                    {
                                        url ? (
                                            url.startsWith('http')?(
                                                <a href={url || ''} onClick={() =>handleClick(onClick)}>{name}</a>
                                            ):(
                                                <Link to={url || ''} onClick={() =>handleClick(onClick)}>{name}</Link>
                                            )) : (
                                            <a onClick={() => handleClick(onClick)}>{name}</a>
                                        )
                                    }
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </Styles>
    );
};

export default Dropdown;
