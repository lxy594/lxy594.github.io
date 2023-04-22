import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {ConfigProvider} from 'antd'
// import {loadDevTools} from 'jira-dev-tool'
import { DevTools,loadServer } from 'jira-dev-tool' //换 yarn add jira-dev-tool@next版本
// 要在jira-dev-tool后引入and.css
import 'antd/dist/reset.css'
import {AppProviders} from './context'
loadServer(() => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  )
  root.render(
    // <React.StrictMode>
    <AppProviders>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b',
          },
        }}
      >
        <DevTools/>
        <App />
      </ConfigProvider>
    </AppProviders>
    // </React.StrictMode>
  )
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
