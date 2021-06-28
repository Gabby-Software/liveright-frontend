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

const Styles = styled.div`
    font-family: 'Work Sans', sans-serif;
    .suspense {
        ${p =>p.theme.extend.layout};
    }
`;

function App() {
    useSeo();
    return (
        <Styles>
                <Switch>
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
                    <Route path={routes.map(r => r.url)}>
                        <Layout>
                            <Suspense fallback={<Skeleton className={'suspense'}/>}>
                            {
                                routes.map(R => (
                                    <Route path={R.url} key={R.url} {...R.props}>
                                        <R.Component/>
                                    </Route>
                                ))
                            }
                            </Suspense>
                        </Layout>
                    </Route>
                </Switch>
            <Toast/>
        </Styles>
    );
}

export default App;
