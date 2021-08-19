import {ChatRoomType} from "../../modules/chat/types/chat-room.type";
import profilePlaceholder from '../../assets/media/profile-placeholder.png';
import moment from 'moment';

export const mockRooms: ChatRoomType[] = [
    {
        id: 1,
        first_name: 'John',
        last_name: 'Travol',
        avatar: profilePlaceholder,
        last_message: 'Sound Great!',
        last_message_date: moment().add(-24, 'minutes').format(),
        room_id: Math.random().toString(36).substring(2),
        unread_count: 2
    },
    {
        id: 2,
        first_name: 'John',
        last_name: 'Travol',
        avatar: profilePlaceholder,
        last_message: 'Lorem Ipsum dolor sit ammet tralala trululu lalali lula',
        last_message_date: moment().add(-2, 'hours').format(),
        room_id: Math.random().toString(36).substring(2),
        unread_count: 1
    },
    {
        id: 3,
        first_name: 'John',
        last_name: 'Travol',
        avatar: profilePlaceholder,
        last_message: 'Sound Great!',
        last_message_date: moment().add(-2, 'days').format(),
        room_id: Math.random().toString(36).substring(2),
        unread_count: 0
    },
    {
        id: 4,
        first_name: 'John',
        last_name: 'Travol',
        avatar: profilePlaceholder,
        last_message: 'Sound Great!',
        last_message_date: moment().add(-1, 'week').format(),
        room_id: Math.random().toString(36).substring(2),
        unread_count: 0
    },
];