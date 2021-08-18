import React, {useState, useEffect, FC} from 'react';
import Styles from './chat-rooms.styles';
import {FormInputUI} from "../../../../components/forms/form-input/form-input.component";
import {ReactComponent as SearchIcon} from "../../../../assets/media/icons/search.svg";

type Props = {};
const ChatRooms: FC<Props> = ({}) => {
    const [search, setSearch] = useState('');
    return (
        <Styles>
            <FormInputUI name={'search'}
                         icon={<SearchIcon/>}
                         value={search} label={'Search chat room'}
                         onUpdate={setSearch}
            />
        </Styles>
    );
};

export default ChatRooms;
