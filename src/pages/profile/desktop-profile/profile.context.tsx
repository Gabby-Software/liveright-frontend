import React, {createContext, useState} from 'react';

type ProfileContextType = {
    editMode: boolean;
    setEditMode: (isEdit: boolean) => void;
    imageFile: File|null,
    setImageFile: (file: File|null) => void;
    tnbFile: File|null;
    setTnbFile: (file:File|null) => void;
};
export const ProfileContext = createContext<ProfileContextType>({
    editMode: false,
    setEditMode:() => {},
    imageFile: null, setImageFile: () => {},
    tnbFile: null, setTnbFile: () => {}
});

export default function ProfileProvider({children}: {children: React.ReactNode}) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [imageFile, setImageFile] = useState<File|null>(null);
    const [tnbFile, setTnbFile] = useState<File|null>(null);
    return (
        <ProfileContext.Provider value={{editMode, setEditMode, imageFile, setImageFile, tnbFile, setTnbFile}}>
            {children}
        </ProfileContext.Provider>
    );
}

