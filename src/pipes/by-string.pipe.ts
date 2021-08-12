export const byString = (o: { [key: string]: any }, s: string) => {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    const a = s.split('.');
    try {
        for (const k of a) {
            if (k in o) {
                o = o[k];
            } else {
                return null;
            }
        }
    } catch (e) {return null}
    return o;
}
