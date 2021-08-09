import React from 'react';
import Styles, {ProfileImageStyled} from './session-user-avatar.styles';
import {noImage} from "../../../../pipes/no-image.pipe";

interface Props {
    avatar?: {url?: string};
    first_name: string;
    last_name: string;
}

const SessionUserAvatar: React.FC<Props> = (props) => {
    const {avatar, first_name, last_name} = props;

    return (
        <Styles>
          <ProfileImageStyled url={avatar?.url} placeholder={noImage(first_name, last_name)} />
          {first_name} {last_name}
        </Styles>
    );
};

export default SessionUserAvatar;
