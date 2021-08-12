import {notificationsTypes} from "./notification-types.enum";
import {ReactComponent as InvitationIcon} from "../../../assets/media/icons/profile.svg";
import {ReactComponent as InvoicesIcon} from "../../../assets/media/icons/invoices.svg";
import {ReactComponent as SessionsIcon} from "../../../assets/media/icons/sessions.svg";
import {ReactComponent as InfoIcon} from "../../../assets/media/icons/info.svg";
import {Routes} from "../../../enums/routes.enum";

export const notificationUrl: (message: string, data: {[key:string]:string|number}) => string =
    (message, data) => {
    switch(message) {
        case notificationsTypes.INVITATION_ACCEPT:
        case notificationsTypes.INVITATION_REJECT:
        case notificationsTypes.INVITATION_RECEIVED:
            return Routes.NOTIFICATIONS;
        case notificationsTypes.INVOICE_CREATED:
        case notificationsTypes.INVOICE_STATUS_CHANGED:
            return Routes.INVOICES+`${data.invoice_id}`;
        case notificationsTypes.SESSION_CREATED:
        case notificationsTypes.SESSION_DELETED:
        case notificationsTypes.SESSION_REQUESTED:
        case notificationsTypes.SESSION_UPDATED:
            return Routes.SESSIONS+`${data.session_id}`;
        default:
            return Routes.NOTIFICATIONS;
    }
}