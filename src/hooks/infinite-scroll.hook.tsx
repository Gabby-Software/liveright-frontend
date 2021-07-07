import React, {useState, useEffect, useRef} from 'react';
import {useEvent} from "./event.hook";
import logger from "../managers/logger.manager";
export const useInfiniteScroll = (fetch: (page: number) => Promise<boolean>) => {
    const loading = useRef(false);
    const page = useRef(1);
    const haveMore = useRef(true);
    useEvent('scroll', () => {
        if(document.body.scrollHeight - window.scrollY - window.innerHeight <= 40) {
            if(!loading.current && haveMore.current) {
                page.current ++;
                loading.current = true;
                fetch(page.current)
                    .then(hasMore => {
                        haveMore.current = hasMore;
                        loading.current = false;
                    });
            }
        }
    });
};
