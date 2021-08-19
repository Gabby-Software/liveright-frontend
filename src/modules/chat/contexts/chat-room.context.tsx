import React, {useState, useEffect, useContext, createContext, FC} from 'react';

type ChatRoomContextType = {

}

const ChatRoomContext = createContext<ChatRoomContextType>({});

export const useChatRoom = () => useContext(ChatRoomContext) as ChatRoomContextType;

export const ChatRoomProvider: FC<{}> = ({children}) => {
    return (
        <ChatRoomContext.Provider value={{}}>{children}</ChatRoomContext.Provider>
    );
}