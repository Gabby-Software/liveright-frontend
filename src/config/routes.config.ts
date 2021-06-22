import {lazy} from 'react';
import {RouteType} from "../types/route.type";

const routes: RouteType[] = [
    {
        title: 'Homepage',
        url: '/',
        Component: lazy(() => import('../components/test/test.component')),
        props: {exact: true}
    },
    {
        title: 'Liveright 2',
        url: '/test',
        Component: lazy(() => import('../components/test/test.component'))
    },
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

export default routes;
