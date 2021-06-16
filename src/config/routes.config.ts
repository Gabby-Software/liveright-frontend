import {lazy} from 'react';
import {RouteType} from "../types/route.type";

const routes: RouteType[] = [
    {
        title: 'Homepage',
        url: '/',
        Component: lazy(() => import('../components/test/test.component'))
    },
    {
        title: 'Liveright 2',
        url: '/test',
        Component: lazy(() => import('../components/test/test.component'))
    },
];

export default routes;
