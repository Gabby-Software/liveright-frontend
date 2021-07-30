const cookieManager = {
    get(name: string) {
        name += "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    set(name: string, value: string, expiry: number = 24 * 60 * 60) {
        let d: Date = new Date();
        d.setTime(d.getTime() + expiry * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;domain=${document.location.hostname}`;
    },
    remove(name: string) {
        this.set(name, '', 0);
    },
    removeAll(){
        const cookies = document.cookie.split(";");
        for (const cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            this.remove(name)
        }
    }
};

export default cookieManager;
