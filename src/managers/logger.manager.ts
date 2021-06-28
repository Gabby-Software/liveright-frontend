import qa from "./qa.manager";

let logFilter: string = '';
let disableLog: boolean = false;
class Logger {
    colors = {
        black: '#000',
        red: '#cd0000',
        green: '#00b000',
        yellow: '#e6a300',
        blue: '#0000c5',
        redBg: '#ffc8bf',
        greenBg: '#d6ffc1',
        yellowBg: '#fff7c3',
        blueBg: '#d7dcff',
    };

    canLog = (arrData: any[]) => {
        return !disableLog && (!logFilter || arrData.some(t => typeof t === 'string' && t.includes(logFilter)));
    };
    setFilter = (filter:string) => logFilter = filter;
    removeFilter = () => logFilter = '';
    disableLogs = disableLog = true;
    enableLogs = disableLog = false;
    log = (...args: any[]) => {
        qa.log(args);
        if (this.canLog(args))
            console.log(...args);
    };
    private logInfo = (color:string, bg:string, title:string, ...args:any[]) => {
        if (this.canLog(args))
            console.log(`%c ${title} `, `color:${color};background:${bg}`,...args);
    };
    warn = (...args: any[]) => {
        qa.log(args);
        this.logInfo(this.colors.yellow, this.colors.yellowBg, 'warn', ...args);
    };
    error = (...args: any[]) => {
        qa.log(args, 'error');
        this.logInfo(this.colors.red,this.colors.redBg, 'error', ...args);
    };
    info = (...args: any[]) => {
        qa.log(args);
        this.logInfo(this.colors.blue, this.colors.blueBg,'info', ...args);
    };
    success = (...args: any[]) => {
        this.logInfo(this.colors.green, this.colors.greenBg, 'success',...args);
    };
    assert = (condition:any, ...args: any[]) => {
        if (!condition) this.warn(...args);
    };
    table = (data: {[key: string]: any}[]) => {
        if ('table' in console) console.table(data);
        else console.log(data)
    }
}

const logger = new Logger();
export default logger;
