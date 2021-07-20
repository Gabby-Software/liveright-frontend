export const payments = (path:string) => {
    if(document.location.host.startsWith('localhost'))
        return 'http://localhost:5111'+path;
    return document.location.protocol + '//payments.' + document.location.host + path;
};
