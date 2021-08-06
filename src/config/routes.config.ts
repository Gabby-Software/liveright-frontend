import {lazy} from 'react';
import {RouteType} from "../types/route.type";
import {Routes} from "../enums/routes.enum";
import headers, {headerBackTo} from "./header.config";
import {footerTypes} from "../enums/footer-types";

export const authRoutes: RouteType[] = [
    // {
    //     title: 'Login',
    //     url: Routes.LOGIN,
    //     Component: lazy(() => import('../pages/auth/login/login.component')),
    //     header: {}
    // },
    // {
    //     title: 'Sign Up',
    //     url: Routes.REGISTER,
    //     Component: lazy(() => import('../pages/auth/sign-up/sign-up.component')),
    //     header: {},
    //     props: {exact: true}
    // },
    // {
    //     title: 'Forget Password',
    //     url: Routes.FORGOT_PASSWORD,
    //     Component: lazy(() => import('../pages/auth/forgot-password/forgot-password.component')),
    //     header: {}
    // },
    // {
    //     title: 'Forget Password Confirmation',
    //     url: Routes.FORGOT_PASSWORD_CONFIRMATION,
    //     Component: lazy(() => import('../pages/auth/forgot-password-confirmation/forgot-password-confirmation.component')),
    //     header: {}
    // },
    // {
    //     title: 'Reset Password',
    //     url: Routes.RESET_PASSWORD,
    //     Component: lazy(() => import('../pages/auth/reset-password/reset-password.component')),
    //     header: {}
    // },
    // {
    //     title: 'Sign up confirmation',
    //     url: Routes.REGISTER_CONFIRMATION,
    //     Component: lazy(() => import('../pages/auth/sign-up-confirmation/sign-up-confirmation.component')),
    //     header: {}
    // },
    {
        title: 'Sign up onboarding',
        url: Routes.REGISTER_ON_BOARD,
        Component: lazy(() => import('../pages/auth/sign-up-onboard/sign-up-onboard.component')),
        header: {}
    },
    // {
    //     title: 'Email verification',
    //     url: `${Routes.VERIFY_EMAIL}/:id/:token`,
    //     Component: lazy(() => import('../pages/auth/verify-email/verify-email.component')),
    //     header: {}
    // }
];
export const routes: RouteType[] = [
    {
        title: 'Homepage',
        url: Routes.HOME,
        Component: lazy(() => import('../pages/dashboard/dashboard.component')),
        props: {exact: true},
        header: {},
    },
    {
        title: 'Calendar',
        url: Routes.CALENDAR,
        Component: lazy(() => import('../pages/calendar/calendar.component')),
        header: {
            items: headers.default_inside
        },
        footer: footerTypes.NONE
    },
    {
        title: 'Liveright 2',
        url: '/test',
        Component: lazy(() => import('../components/test/test.component')),
        header: {}
    },
    {
        title: 'Trainer',
        url: Routes.TRAINER,
        Component: lazy(() => import('../pages/trainer/trainer.component')),
        header: {
            title: 'My Trainer',
            items: headers.default_inside
        }
    },
    {
        title: 'Create Invoice',
        url: Routes.CREATE_INVOICE,
        Component: lazy(() => import('../pages/create-invoice/create-invoice.component')),
        back: {
          url: Routes.INVOICES,
          alias: "invoices"
        },
        header: {
            title: 'Generate new Invoice',
            items: headers.default_inside
        }
    },
    {
        title: 'View invoice',
        url: Routes.INVOICES + '/:id',
        Component: lazy(() => import('../pages/invoice/invoice.component')),
        header: {
            title: 'Invoice',
            items: headerBackTo(Routes.INVOICES)
        },
        back: {
            url: Routes.INVOICES,
            alias: 'invoices'
        }
    },
    {
        title: 'Invoices',
        url: Routes.INVOICES,
        Component: lazy(() => import('../pages/invoices/invoices.component')),
        header: {
            title: 'Invoices',
            items: headers.default_inside
        }
    },
    {
        title: 'Clients',
        url: Routes.CLIENTS,
        Component: lazy(() => import('../pages/clients/clients.component')),
        header: {
            title: "Clients",
        }
    },
    {
        title: 'Clients',
        url: Routes.CLIENTS+'/:id',
        Component: lazy(() => import('../pages/client/client.component')),
        header: {
            title: "Client",
        },
        footer: footerTypes.TRAINER
    },
    {
        title: 'Clients',
        url: Routes.CLIENTS+'/:id',
        Component: lazy(() => import('../pages/client/client.component')),
        header: {
            title: "",
        },
        footer: footerTypes.TRAINER
    },
    {
        title: 'Clients',
        url: Routes.CLIENTS+'/:id'+Routes.HUB,
        Component: lazy(() => import('../pages/client-hub/client-hub.component')),
        header: {
            title: "",
        },
        footer: footerTypes.TRAINER
    },
    {
        title: 'Clients',
        url: Routes.CLIENTS+'/:id'+Routes.PROFILE,
        Component: lazy(() => import('../pages/client-profile/client-profile.component')),
        header: {
            title: "",
        },
        footer: footerTypes.TRAINER
    },
    {
        title: 'Sessions',
        url: Routes.SESSIONS+'/:id',
        Component: lazy(() => import('../pages/session/session.component')),
        header: {
            title: "Sessions",
            items: headers.add
        }
    },
    {
        title: 'Sessions',
        url: Routes.SESSIONS,
        Component: lazy(() => import('../pages/sessions/sessions.component')),
        header: {
            title: "Your Sessions",
            items: headers.filter
        }
    },
    {
        title: 'Plans',
        url: Routes.PLANS,
        Component: lazy(() => import('../pages/plans/plans.component')),
        header: {
            title: "Plans",
            items: headers.default
        }
    },
    {
        title: 'Notifications',
        url: Routes.NOTIFICATIONS,
        Component: lazy(() => import('../pages/notifications/notifications.component')),
        header: {
            title: "Notifications",
            items: headers.default
        }
    },
    {
        title: 'Notification Settings',
        url: Routes.NOTIFICATIONS_SETTINGS,
        Component: lazy(() => import('../pages/notifications-settings/notifications-settings.component')),
        header: {
            title: "Settings",
            items: headers.default
        }
    }
];

export default routes;
