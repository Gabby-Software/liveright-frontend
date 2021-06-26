import React, {createContext, useState} from 'react';

type ProfileContextType = {editMode: boolean, setEditMode: (isEdit: boolean) => void};
export const ProfileContext = createContext<ProfileContextType>({editMode: false, setEditMode:() => {}});

export default function ProfileProvider({children}: {children: React.ReactNode}) {
    const [editMode, setEditMode] = useState<boolean>(false);
    return (
        <ProfileContext.Provider value={{editMode, setEditMode}}>
            {children}
        </ProfileContext.Provider>
    );
}

