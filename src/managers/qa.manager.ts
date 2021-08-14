import cookieManager from "./cookie.manager";
import api from "./api.manager";
import {EP_ADD_NOTIFICATION, EP_GET_TRAINER, EP_GET_UNREAD_NOTIFICATIONS} from "../enums/api.enum";
import logger from "./logger.manager";
import {toast} from "../components/toast/toast.component";
import notificationManager from "../modules/notifications/notifications.manager";

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
    const data = `SCREEN SIZE: ${window.innerWidth} x ${window.innerHeight}\nUSER AGENT: ${window.navigator.userAgent}\n\nAUTH DATA:${cookieManager.get('auth')}\n\n\n`;
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
    };
    public addNotification = () => {
        api.get(EP_ADD_NOTIFICATION)
            .then(() => logger.info('Notification added'))
            .catch(() => toast.show({type:'error', msg:'some error occur, pleaase try again later'}))

    };
    public showTrainer = () => {
        api.get(EP_GET_TRAINER)
            .then(res=>res.data)
    }
    public unregisterPushNotifications = () => {
        notificationManager.unsubscribeFromNotifications();
    }
    public showBeamsInfo=() => {
        notificationManager.getBeamsData();
    }
}
const qa = new QaManager();
const error = console.error;
console.error = (...data:any) => {
    qa.log(data, 'error');
    error(...data);
};
window.QA = qa;
export default qa;
