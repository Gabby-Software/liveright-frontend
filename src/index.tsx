import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from 'styled-components';
import theme from "./assets/styles";
import store from "./store/config.store";
import {Provider} from "react-redux";
import {I18nProvider} from "./modules/i18n/i18n.context";
import {BrowserRouter} from 'react-router-dom';
import './config/validation.config';
import "antd/dist/antd.css";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <I18nProvider>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                    <App/>
                    </BrowserRouter>
                </ThemeProvider>
            </I18nProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
