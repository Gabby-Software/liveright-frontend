export const hour = (hhmm:string) => {
    if(!/^\d{2}:\d{2}$/.test(hhmm))
        return 0;
    return +hhmm.split(':')[0];
};
