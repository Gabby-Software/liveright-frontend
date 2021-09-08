# Chat

### Objective

For handling chat functionality, we're running a separate, Node server.  
Live events (like new message, message delivered/read) handled with [sockets](https://socket.io/docs/v3).  
You can find BE docs here:

***API***  
https://documenter.getpostman.com/view/6844927/TzzBovPK#4dbe8d03-87fa-45f2-93cd-315614ce3999

***Sockets***   
https://hackmd.io/s/rkqbHxSWY#Send-Message

All FE chat related functionality gathered in `modules/chat`  

Socket related calls - `modules/chat/managers/socket.manager`  
API related calls - `modules/chat/managers/chat.manager`

### Global Chat Context

In the global chat context saved all rooms data, as well as messages for each room.  
Additionally, functionality for manipulating chat popups also managed there.

This context is available from anywhere in the app, and can be used via `useChats` hook (`/modules/chat/contexts/chats.context`)

### Chat Room Context

The `ChatRoomContext` wrapping a specific chat room (weather its opened chat page, or a specific chat popup), and providing data of the room, as well as functionality to manipulate messages in room (send message of all kind, listen to new messages etc.)

This context only available inside chat room, and can be used via `useChatRoom` hook (`/modules/chat/contexts/chat-room.context`)

The `ChatRoomProvider` accept roomId as a prop, to know which room provide data for

### UI

All the UI for the chat page is in the `/pages/chat` folder, or its nested folders.  
There is also `/layouts/chat-popups` which rendering chat popups for desktop version.  
The popup itself is actually same component as the messages part of chat page, with some adjustments, that applied in given `ChatRoomProvider` receive isPopup as a prop.