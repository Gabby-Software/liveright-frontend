import React, {useState, useEffect, FC} from 'react';
import Styles from './chat-rooms.styles';
import {FormInputUI} from "../../../../components/forms/form-input/form-input.component";

type Props = {};
const ChatRooms: FC<Props> = ({}) => {
    const [search, setSearch] = useState('');
    return (
        <Styles>
            <FormInputUI name={'search'}
                         value={search} label={'Search chat room'}
                         onUpdate={setSearch}
            />
        </Styles>
    );
};

export default ChatRooms;
