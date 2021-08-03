import React, {useState, useEffect} from 'react';
import {manualHeader} from "./header.hook";
export const useTitle = (title: string) => {
    useEffect(() => {
        manualHeader.setTitle(title);
        return () => manualHeader.setTitle('');
    }, [title])
};
