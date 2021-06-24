import React, {useState, useEffect} from 'react';
export const useEvent = (name: string, callback: (e: Event) => void) => {
    useEffect(() => {
        window.addEventListener(name, callback);
        return () => window.removeEventListener(name, callback);
    }, []);
};
