import React, {Suspense} from 'react';
import './App.css';
import {Link, Route, Switch} from 'react-router-dom';
import {routes, authRoutes} from "./config/routes.config";
import {useSeo} from "./hooks/seo.hook";
import {Space} from "antd";
import styled from "styled-components";
import Layout from "./layouts/layout/layout.component";
import {AuthFormProvider} from "./modules/auth/auth.context";

const Styles = styled.div`
    font-family: 'Work Sans', sans-serif;
`;

function App() {
    useSeo();
    return (
        <Styles>
            <Suspense fallback={<div/>}>
                <Switch>
                    <Route path={authRoutes.map(r => r.url)}>
                        <AuthFormProvider>
                            {
                                authRoutes.map(R => (
                                    <Route path={R.url} key={R.url} {...R.props}>
                                        <R.Component/>
                                    </Route>
                                ))
                            }
                        </AuthFormProvider>
                    </Route>
                    <Route path={routes.map(r => r.url)}>
                        <Layout>
                            {
                                routes.map(R => (
                                    <Route path={R.url} key={R.url} {...R.props}>
                                        <R.Component/>
                                    </Route>
                                ))
                            }
                        </Layout>
                    </Route>
                </Switch>
            </Suspense>
        </Styles>
    );
}

export default App;
