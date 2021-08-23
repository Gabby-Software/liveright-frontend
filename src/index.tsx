import 'antd/dist/antd.css'
import './index.css'
import './config/validation.config'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import App from './App'
import theme from './assets/styles'
import { ChatsProvider } from './modules/chat/contexts/chats.context'
import { I18nProvider } from './modules/i18n/i18n.context'
import reportWebVitals from './reportWebVitals'
import store from './store/config.store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nProvider>
        <ChatsProvider>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </ChatsProvider>
      </I18nProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
