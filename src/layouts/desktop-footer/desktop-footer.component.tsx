import React, {useState, useEffect} from 'react';
import Styles from './desktop-footer.styles';
import profilePlaceholder from '../../assets/media/profile-placeholder.png';


type Props = {};
const DesktopFooter = ({}:Props) => {
    return (
        <Styles>
            <div className={'footer__basic'}>
                <img alt={'profile'} src={profilePlaceholder}/>
            </div>
            <div className={'footer__actions'}>
            </div>
        </Styles>
    )
};

export default DesktopFooter;
