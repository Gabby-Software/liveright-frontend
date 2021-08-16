import React, {useEffect, useState} from 'react';
import Styles, {ProfileImageStyled} from './session-user-avatar.styles';
import {noImage} from "../../../../pipes/no-image.pipe";
import api from "../../../../managers/api.manager";

interface Props {
    avatar?: {url: string} | null;
    first_name?: string;
    last_name?: string;
}

const SessionUserAvatar: React.FC<Props> = (props) => {
    const {avatar, first_name = '', last_name = ''} = props;
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (avatar?.url) {
            const checkUrl = async () => {
                try {
                    await api.get(avatar.url);
                    setUrl(avatar.url);
                } catch (e) {
                    console.log(e);
                }
            }

            checkUrl();
        }
    }, [])

    return (
        <Styles>
          <ProfileImageStyled url={url} placeholder={noImage(first_name, last_name)} />
          {first_name} {last_name}
        </Styles>
    );
};

export default SessionUserAvatar;
