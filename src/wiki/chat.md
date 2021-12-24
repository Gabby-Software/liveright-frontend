# Chat

### Objective

For handling chat functionality, we're running a separate, Node server.  
Live events (like new message, message delivered/read) handled with [sockets](https://socket.io/docs/v3).  
You can find BE docs here:

**_API_**  
https://documenter.getpostman.com/view/6844927/TzzBovPK#4dbe8d03-87fa-45f2-93cd-315614ce3999

**_Sockets_**  
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

### The Message Object

The message object type specified in chat socket docs (link above) and in the `/modules/chat/types/ChatMessageType`.  
The content in there defined by few aspects:

- `content.text` - The message text
- `content.files` - array of files (url to file) attached to the message
- `content.embedLinks` - array of links (url+title) scrapped from the message text
- `types` - array of types (strings) which define how to display the content text/files

**_Examples:_**  
If types are `['text', 'file', 'file']` then message should display the `content.text` and 2 files from `content.files` array as attachments

If types are `['image', 'image', 'image']` then message should display 3 files from `content.files` as an images

Additionally, there is some special, project specific messages - remind invoice, create session and session reschedule. for thos exist additional, optional meta, which added in case there is according message type. it is `invoice_meta_data` and `session_meta_data` (see chat sockets docs for exact format. link above)

For any new type which would appear, you should:

1. Create a component to display this message type
2. Handle that message type, to display the corresponding component in the `/pages/chat/components/chat-message` component

**_Attention_**

ChatMessage is same component rendered for mobile/desktop/popup view.
For any change/add made, make sure its look fine on each of them.

### UI

All the UI for the chat page is in the `/pages/chat` folder, or its nested folders.  
There is also `/layouts/chat-popups` which rendering chat popups for desktop version.  
The popup itself is actually same component as the messages part of chat page, with some adjustments, that applied in given `ChatRoomProvider` receive isPopup as a prop.
