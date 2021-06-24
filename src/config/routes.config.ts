import {lazy} from 'react';
import {RouteType} from "../types/route.type";

export const authRoutes: RouteType[] = [
    {
        title: 'Login',
        url: '/login',
        Component: lazy(() => import('../pages/auth/login/login.component')),
        header: {}
    },
    {
        title: 'Sign Up',
        url: '/sign-up',
        Component: lazy(() => import('../pages/auth/sign-up/sign-up.component')),
        header: {}
    },
    {
        title: 'Forget Password',
        url: '/forgot-password',
        Component: lazy(() => import('../pages/auth/forgot-password/forgot-password.component')),
        header: {}
    },
    {
        title: 'Reset Password',
        url: '/reset-password',
        Component: lazy(() => import('../pages/auth/reset-password/reset-password.component')),
        header: {}
    }
];
export const routes: RouteType[] = [
    {
        title: 'Homepage',
        url: '/',
        Component: lazy(() => import('../pages/dashboard/dashboard.component')),
        props: {exact: true},
        header: {}
    },
    {
        title: 'Calendar',
        url: '/calendar',
        Component: lazy(() => import('../pages/calendar/calendar.component')),
        header: {}
    },
    {
        title: 'Liveright 2',
        url: '/test',
        Component: lazy(() => import('../components/test/test.component')),
        header: {}
    },
    {
        title: 'Account',
        url: '/profile',
        Component: lazy(() => import('../pages/profile/profile.component')),
        header: {
            title: 'Account'
        }
    }
];

export default routes;
