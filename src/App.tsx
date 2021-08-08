import React, {Suspense} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import {routes, authRoutes} from "./config/routes.config";
import {useSeo} from "./hooks/seo.hook";
import {Skeleton} from "antd";
import styled from "styled-components";
import Layout from "./layouts/layout/layout.component";
import {AuthFormProvider} from "./modules/auth/auth.context";
import Toast from "./components/toast/toast.component";
import AuthHandler from "./pages/auth-handler/auth-handler.component";
import PageNotFound from "./pages/page-not-found/page-not-found.component";
import UpdatePopup from "./components/update-popup/update-popup.component";

const Styles = styled.div`
    font-family: 'Work Sans', sans-serif;
    .suspense {
        ${p =>p.theme.extend.layout};
    }
    .desktop {
        @media all and (max-width: ${p => p.theme.vars.media.tablet}px) {display: none}    
    }
    .mobile {
        @media all and (min-width: ${p => p.theme.vars.media.tablet+1}px) {display: none}
    }
`;

function App() {
    useSeo();
    return (
        <Styles>
                <Switch>
                    <Route path={'/auth'} exact>
                        <AuthHandler/>
                    </Route>
                    <Route path={authRoutes.map(r => r.url)}>
                        <AuthFormProvider>
                            <Suspense fallback={<Skeleton className={'suspense'}/>}>
                            {
                                authRoutes.map(R => (
                                    <Route exact path={R.url} key={R.url} {...R.props}>
                                        <R.Component/>
                                    </Route>
                                ))
                            }
                            </Suspense>
                        </AuthFormProvider>
                    </Route>
                    <Route exact path={routes.map(r => r.url)}>
                        <Layout>
                            <Suspense fallback={<Skeleton className={'suspense'}/>}>
                            {
                                routes.map(R => (
                                    <Route exact={false} path={R.url} key={R.url} {...R.props}>
                                        <R.Component/>
                                    </Route>
                                ))
                            }
                            </Suspense>
                        </Layout>
                    </Route>
                    <Route>
                        <PageNotFound/>
                    </Route>
                </Switch>
            <Toast/>
            <UpdatePopup/>
        </Styles>
    );
}

export default App;
