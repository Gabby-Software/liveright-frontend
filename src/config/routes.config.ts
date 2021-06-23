import {lazy} from 'react';
import {RouteType} from "../types/route.type";

export const authRoutes: RouteType[] = [
    {
        title: 'Login',
        url: '/login',
        Component: lazy(() => import('../pages/auth/login/login.component'))
    },
    {
        title: 'Sign Up',
        url: '/sign-up',
        Component: lazy(() => import('../pages/auth/sign-up/sign-up.component'))
    },
];
export const routes: RouteType[] = [
    {
        title: 'Homepage',
        url: '/',
        Component: lazy(() => import('../pages/dashboard/dashboard.component')),
        props: {exact: true}
    },
    {
        title: 'Liveright 2',
        url: '/test',
        Component: lazy(() => import('../components/test/test.component'))
    },
];

export default routes;
