import {useEffect, RefObject} from 'react';

export const useOutsideClick = (
    ref: RefObject<HTMLElement>,
    cb: (e?: MouseEvent | TouchEvent) => void,
    focused: boolean,
    otherDeps: any[] = [],
): void => {
    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
        if (ref.current?.contains(e.target as Node)) {
            return;
        }

        cb(e);
    };

    useEffect(() => {
        if (focused) {
            document.addEventListener('mousedown', handleMouseDown);
            document.addEventListener('touchstart', handleMouseDown);

            return () => {
                document.removeEventListener('mousedown', handleMouseDown);
                document.addEventListener('touchend', handleMouseDown);
            };
        }
    }, [focused, ...otherDeps]);
};
