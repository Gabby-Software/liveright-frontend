import {NotificationType} from "../../types/notification.type";
import moment from 'moment';
import {Routes} from "../../enums/routes.enum";

export const notificationsData: NotificationType[] = [

    {
        type: "exercise",
        datetime: moment().format("YYYY-MM-DD HH:mm:ss"),
        content: 'Micheal just changed your workout plan',
        seen: false,
        url: Routes.WORKOUTS+'/53'
    },
    {
        type: "invoice",
        datetime: moment().add(-10, 'minutes').format("YYYY-MM-DD HH:mm:ss"),
        content: 'You just recieved an invoice from Micheal Supper',
        seen: false,
        url: Routes.INVOICES+'/13'
    },
    {
        type: "invoice",
        datetime: moment().add(-25, "minutes").format("YYYY-MM-DD HH:mm:ss"),
        content: 'Micheal just changed your workout plan',
        seen: true,
        url: Routes.INVOICES+'/4'
    },
    {
        type: "meal",
        datetime: moment().add(-73, 'minutes').format("YYYY-MM-DD HH:mm:ss"),
        content: 'Micheal just changed your meal plan',
        seen: true,
        url: Routes.MEALS+'/4'
    },
    {
        type: "exercise",
        datetime: moment().add(-3, 'hours').format("YYYY-MM-DD HH:mm:ss"),
        content: 'Micheal just changed your workout plan',
        seen: true,
        url: Routes.WORKOUTS+'/44'
    },
    {
        type: "meal",
        datetime: moment().add(-1, 'days').format("YYYY-MM-DD HH:mm:ss"),
        content: 'Micheal just changed your meal plan',
        seen: true,
        url: Routes.MEALS+'/22'
    },
    {
        type: "session",
        datetime: moment().add(-1.2, 'days').format("YYYY-MM-DD HH:mm:ss"),
        content: 'Micheal just requested to schedule a session',
        seen: true,
        url: Routes.SESSIONS+'/101'
    },
    {
        type: "exercise",
        datetime: moment().add(-2, 'days').format("YYYY-MM-DD HH:mm:ss"),
        content: 'Micheal just changed your workout plan',
        seen: true,
        url: Routes.WORKOUTS+'/53'
    },
    {
        type: "invoice",
        datetime: moment().add(-2.5, 'days').format("YYYY-MM-DD HH:mm:ss"),
        content: 'You just recieved an invoice from Micheal Supper',
        seen: true,
        url: Routes.INVOICES+'/13'
    },
    {
        type: "invoice",
        datetime: moment().add(-29, "days").format("YYYY-MM-DD HH:mm:ss"),
        content: 'Micheal just changed your workout plan',
        seen: true,
        url: Routes.INVOICES+'/4'
    },
    {
        type: "meal",
        datetime: moment().add(-3.1, 'days').format("YYYY-MM-DD HH:mm:ss"),
        content: 'Micheal just changed your meal plan',
        seen: true,
        url: Routes.MEALS+'/4'
    },
    {
        type: "exercise",
        datetime: moment().add(-5, 'days').format("YYYY-MM-DD HH:mm:ss"),
        content: 'Micheal just changed your workout plan',
        seen: true,
        url: Routes.WORKOUTS+'/44'
    },
    {
        type: "meal",
        datetime: moment().add(-6, 'days').format("YYYY-MM-DD HH:mm:ss"),
        content: 'Micheal just changed your meal plan',
        seen: true,
        url: Routes.MEALS+'/22'
    }
];
