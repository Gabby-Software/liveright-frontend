import React, {useState, useEffect} from 'react';
import Styles from './header.styles';
import {Link, useLocation} from 'react-router-dom';
import profilePlaceholder from '../../assets/media/profile-placeholder.png';
import {classes} from "../../pipes/classes.pipe";
import {useHeader} from "../../hooks/header.hook";
import {HeaderItemType, HeaderItemTypes} from "../../types/route.type";
import headers, {DEFAULT_TITLE} from "../../config/header.config";
import {useAuth} from "../../hooks/auth.hook";
import userTypes from "../../enums/user-types.enum";
import {useTrainer} from "../../hooks/trainer.hook";
import {useClientsTrainer} from "../../hooks/clients-trainer.hook";
import {noImage} from "../../pipes/no-image.pipe";
import logger from "../../managers/logger.manager";

const Header = () => {
    const {pathname} = useLocation();
    const {type: userType} = useAuth();
    const trainer = useClientsTrainer();
    const title = DEFAULT_TITLE;
    const items = headers.default;
    logger.info("TRAINER", trainer);
    const renderHeaderItem = ({type, href, Icon}: HeaderItemType) => {
        switch (type) {
            case HeaderItemTypes.IMAGE:
                if(userType !== userTypes.CLIENT || !trainer)
                    return null;
                return (
                    <Link to={href || ''} className={'header__profile'}>
                        {
                            trainer.avatar?.url?(
                                <img alt={'trainer'} src={trainer.avatar.url} className={'header__profile__img'}/>
                            ):(
                                <div className={'header__profile__img'}>{noImage(trainer.first_name, trainer.last_name)}</div>
                            )
                        }
                    </Link>
                );
            case HeaderItemTypes.ICON:
                Icon = Icon as React.ComponentType;
                return (
                    <Link to={href || ''}
                          className={classes('header__icon',
                              pathname === href && 'header__icon__active')}>
                        <Icon/>
                    </Link>
                );
            case HeaderItemTypes.SPACE:
                return (
                    <div className={'header__space'}/>
                );
            case HeaderItemTypes.SUBMIT:
                Icon = Icon as React.ComponentType;
                return (
                    <label className={'header__icon'} htmlFor={href || 'form-submit'}>
                        <Icon/>
                    </label>
                );
        }
    };
    return (
        <Styles>
            <div className={'header__placeholder'}/>
            <nav className={'header__nav'}>
                <h1 className={'header__title'}>{title}</h1>
                {items?.map((t,i) => <React.Fragment key={i}>{renderHeaderItem(t)}</React.Fragment>)}
            </nav>
        </Styles>
    );
};

export default Header;
