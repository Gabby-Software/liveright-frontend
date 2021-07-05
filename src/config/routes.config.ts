import {lazy} from 'react';
import {RouteType} from "../types/route.type";
import {Routes} from "../enums/routes.enum";
import headers from "./header.config";
import {footerTypes} from "../enums/footer-types";

export const authRoutes: RouteType[] = [
    {
        title: 'Login',
        url: Routes.LOGIN,
        Component: lazy(() => import('../pages/auth/login/login.component')),
        header: {}
    },
    {
        title: 'Sign Up',
        url: Routes.REGISTER,
        Component: lazy(() => import('../pages/auth/sign-up/sign-up.component')),
        header: {},
        props: {exact: true}
    },
    {
        title: 'Forget Password',
        url: Routes.FORGOT_PASSWORD,
        Component: lazy(() => import('../pages/auth/forgot-password/forgot-password.component')),
        header: {}
    },
    {
        title: 'Forget Password Confirmation',
        url: Routes.FORGOT_PASSWORD_CONFIRMATION,
        Component: lazy(() => import('../pages/auth/forgot-password-confirmation/forgot-password-confirmation.component')),
        header: {}
    },
    {
        title: 'Reset Password',
        url: Routes.RESET_PASSWORD,
        Component: lazy(() => import('../pages/auth/reset-password/reset-password.component')),
        header: {}
    },
    {
        title: 'Sign up confirmation',
        url: Routes.REGISTER_CONFIRMATION,
        Component: lazy(() => import('../pages/auth/sign-up-confirmation/sign-up-confirmation.component')),
        header: {}
    },
    {
        title: 'Sign up onboarding',
        url: Routes.REGISTER_ON_BOARD,
        Component: lazy(() => import('../pages/auth/sign-up-onboard/sign-up-onboard.component')),
        header: {}
    },
    {
        title: 'Email verification',
        url: `${Routes.VERIFY_EMAIL}/:id/:token`,
        Component: lazy(() => import('../pages/auth/verify-email/verify-email.component')),
        header: {}
    }
];
export const routes: RouteType[] = [
    {
        title: 'Homepage',
        url: '/',
        Component: lazy(() => import('../pages/dashboard/dashboard.component')),
        props: {exact: true},
        header: {},
    },
    {
        title: 'Calendar',
        url: '/calendar',
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
        title: 'Profile',
        url: Routes.PROFILE,
        Component: lazy(() => import('../pages/profile/profile.component')),
        header: {
            title: 'Account',
            items: headers.profile
        }
    },
    {
        title: 'Edit Profile',
        url: Routes.EDIT_PROFILE,
        Component: lazy(() => import('../pages/profile/edit-profile/edit-profile.component')),
        header: {
            title: 'Edit Profile',
            items: headers.confirm
        }
    },
    {
        title: 'Trainer',
        url: Routes.TRAINER,
        Component: lazy(() => import('../pages/profile/trainer/trainer.component')),
        header: {
            title: 'Trainer',
            items: headers.default_inside
        }
    }
];

export default routes;
