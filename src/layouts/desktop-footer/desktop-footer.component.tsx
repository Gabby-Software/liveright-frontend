import React, {useState, useEffect} from 'react';
import Styles from './desktop-footer.styles';
import profilePlaceholder from '../../assets/media/profile-placeholder.png';
import {useAuth} from "../../hooks/auth.hook";
import ProfileImage from "../../components/profile-image/profile-image.component";
import {noImage} from "../../pipes/no-image.pipe";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import FormButton from "../../components/forms/form-button/form-button.component";
import {Link} from "react-router-dom";
import {identity} from "../../pipes/identity.pipe";
import {Routes} from "../../enums/routes.enum";
import {classes} from "../../pipes/classes.pipe";


type Props = {};
const DesktopFooter = ({}: Props) => {
    const {first_name, last_name, avatar, type} = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const {t} = useTranslation();
    return (
        <Styles className={classes('footer', isOpen&&'footer__open')}>
            <div className={'footer__wrapper'}>
                <div className={'footer__basic'}>
                    <ProfileImage url={avatar?.url} placeholder={noImage(first_name, last_name)}
                        onClick={() => setIsOpen(!isOpen)}/>
                    <div className={'footer__info'}>
                        <div className={'footer__name'}>{first_name} {last_name}</div>
                        <div className={'footer__account-type'}>{t('logged-as', {type: t(type)})}</div>
                    </div>
                </div>
                <div className={'footer__actions'}>
                    <div className={'footer__actions__title'}>{t('what-to-do')}</div>
                    <div className={'footer__actions__cont'}>
                        <FormButton type={'ghost'} className={'footer__action'}>Switch to client</FormButton>
                        <a href={identity(Routes.PROFILE)} className={'footer__action'}>
                            <FormButton type={'ghost'}>Edit my information</FormButton>
                        </a>
                        <Link to={'#'} className={'footer__action'}>
                            <FormButton type={'ghost'}>Manage payment info</FormButton>
                        </Link>
                        <Link to={identity(Routes.SETTINGS)} className={'footer__action'}>
                            <FormButton type={'ghost'}>LiveRight Settings</FormButton>
                        </Link>
                        <Link to={'#'} className={'footer__action'}>
                            <FormButton type={'ghost'}>Get Help</FormButton>
                        </Link>
                        <FormButton type={'primary'} className={'footer__action'}>Log Out</FormButton>
                    </div>
                </div>
            </div>
        </Styles>
    )
};

export default DesktopFooter;
