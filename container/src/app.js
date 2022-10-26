import React, {lazy, Suspense, useState, useEffect} from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Header } from './components/header';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { Loader } from './components/loader';
import { createBrowserHistory } from 'history';

const generateClassName = createGenerateClassName({
    productionPrefix: 'container'
});

const history = createBrowserHistory();

const MarketingLazy = lazy(() => import('./components/marketing-app'));
const AuthLazy = lazy(() => import('./components/auth-app'));
const DashboardLazy = lazy(() => import('./components/dashboard-app'));

export const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if(isSignedIn) {
            history.push('/dashboard');
        }
    }, [isSignedIn]);

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
                    <Suspense fallback={<Loader />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/dashboard">
                                {!isSignedIn && <Redirect to="/" />}
                                <DashboardLazy />
                            </Route> 
                            <Route path="/" component={MarketingLazy}/>                            
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    )
}