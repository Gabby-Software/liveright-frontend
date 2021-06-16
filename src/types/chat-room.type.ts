import {DatabaseItemType} from "./database-item.type";

export type ChatRoomType = DatabaseItemType & {
  account_one: number;
  account_two: number;
  chatroom_id: number;
  
};
