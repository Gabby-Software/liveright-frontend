import cookieManager from "./cookie.manager";

declare global {
    interface Window { QA: QaManager }
}

type QALogType = {
    time?: string;
    status?: 'error' | 'info';
    data: any;
};
const currentTime = () => {
    const t = (n: number) => String(n).padStart(2, '0');
    return `${t(new Date().getHours())}:${t(new Date().getMinutes())}:${t(new Date().getSeconds())}`;
};

const generateReport = (logs: QALogType[]) => {
    const data = `SCREEN SIZE: ${window.innerWidth} x ${window.innerHeight}\nUSER AGENT: ${window.navigator.userAgent}\n\n\n`;
    return logs.reduce((report, {time,status, data}) => {
        let msg = '';
        try {
            msg = JSON.stringify(data);
        } catch(e){ msg = 'unstringified data'}
        return report + `[${time}]: ${status === 'error' ? "  --!!!ERROR!!!--  ": "  INFO  "}  -  ${msg}\n\n`;
    }, data);
};
const download = (data: string) => {
    const a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    a.setAttribute('download', `QA report ${new Date().toLocaleDateString()}.txt`);
    document.body.appendChild(a);
    a.click();
    a.remove();
};
class QaManager {
    private logs: QALogType[] = [];
    public log = (data: any = '', status: 'error'|'info' = 'info') => {
        this.logs = [{time: `${currentTime()}`, status, data}, ...this.logs].slice(0, 30);
    };
    public report = () => {
        download(generateReport(this.logs));
    };
    public showUser = () => {
        const user = cookieManager.get('auth');
        if(user) return JSON.parse(user);
        return 'no user data';
    }
}
const qa = new QaManager();

window.QA = qa;
export default qa;
