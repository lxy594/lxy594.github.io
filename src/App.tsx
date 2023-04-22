import React from 'react'
import './App.css'
import {useAuth} from "./context/auto-context";
import {AuthenticatedApp} from "./authenticated-app";
import {UnauthenticatedApp} from "./unauthenticated-app";
import 'antd/dist/reset.css';
import {ErrorBoundary} from 'component/error-boundary';
import { FullPageErrorFallback } from 'component/lib';

function App() {
    const {user} = useAuth()
    return (
        <div className="App">
            <ErrorBoundary fallbackRender={FullPageErrorFallback}>
            {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
            </ErrorBoundary>
            {/*<ProjectListScreen/>*/}
        </div>
    )
}

export default App
