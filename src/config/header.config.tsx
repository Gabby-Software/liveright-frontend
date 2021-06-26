import {ReactComponent as CalendarIcon} from "../assets/media/icons/calendar.svg";
import {ReactComponent as BellIcon} from "../assets/media/icons/bell.svg";
import {ReactComponent as SettingsIcon} from "../assets/media/icons/settings.svg";
import {ReactComponent as TimesIcon} from "../assets/media/icons/times.svg";
import {ReactComponent as CheckIcon} from "../assets/media/icons/check.svg";
import {ReactComponent as BackIcon} from "../assets/media/icons/back-arrow.svg";
import {HeaderItemType, HeaderItemTypes} from "../types/route.type";
import {Routes} from "../enums/routes.enum";

export const DEFAULT_TITLE = 'LiveRight';
const headers: {[key: string]: HeaderItemType[]} = {
    default: [
        {type: HeaderItemTypes.IMAGE, href: Routes.CHAT},
        {type: HeaderItemTypes.SPACE},
        {type: HeaderItemTypes.ICON, Icon: CalendarIcon, href: Routes.CALENDAR},
        {type: HeaderItemTypes.ICON, Icon: BellIcon, href: Routes.NOTIFICATIONS},
    ],
    profile: [
        {type: HeaderItemTypes.ICON, Icon: BackIcon, href: Routes.HOME},
        {type: HeaderItemTypes.SPACE},
        {type: HeaderItemTypes.ICON, Icon: SettingsIcon, href: Routes.SETTINGS},
        {type: HeaderItemTypes.ICON, Icon: BellIcon, href: Routes.NOTIFICATIONS},
    ],
    confirm: [
        {type: HeaderItemTypes.ICON, Icon: TimesIcon, href: Routes.PROFILE},
        {type: HeaderItemTypes.SPACE},
        {type: HeaderItemTypes.SUBMIT, Icon: CheckIcon},
    ]
};

export default headers;
