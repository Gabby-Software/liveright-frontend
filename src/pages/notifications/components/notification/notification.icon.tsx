import React, {ComponentType} from "react";
import {NotificationTypeType} from "../../../../types/notification.type";
import {ReactComponent as SessionIcon} from "../../../../assets/media/icons/session-action.svg";
import {ReactComponent as WorkoutIcon} from "../../../../assets/media/icons/workout-action.svg";
import {ReactComponent as MealIcon} from "../../../../assets/media/icons/meal-action.svg";
import {ReactComponent as InvoiceIcon} from "../../../../assets/media/icons/invoice-action.svg";
import {ReactComponent as UnreadIcon} from "../../../../assets/media/icons/view.svg";
import {ReactComponent as ReadIcon} from "../../../../assets/media/icons/view-off.svg";
import {Routes} from "../../../../enums/routes.enum";

export const notificationIconMap: {[key: string]: ComponentType<any>} = {
    session:SessionIcon,
    invoice: InvoiceIcon,
    meal: MealIcon,
    exercise: WorkoutIcon
};
export const notificationSeen = (seen: boolean) => seen? ReadIcon : UnreadIcon;
export const NotificationIcon = ({type}: {type:NotificationTypeType}) => {
    const Icon = notificationIconMap[type];
    return Icon?<Icon/>:null;
};
