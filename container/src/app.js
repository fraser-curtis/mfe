import React, {lazy, Suspense, useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from './components/header';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { Loader } from './components/loader';

const generateClassName = createGenerateClassName({
    productionPrefix: 'container'
});

const MarketingLazy = lazy(() => import('./components/marketing-app'));
const AuthLazy = lazy(() => import('./components/auth-app'));

export const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
                    <Suspense fallback={<Loader />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/" component={MarketingLazy}/>
                        </Switch>
                    </Suspense>
                    
                </div>
            </StylesProvider>
        </BrowserRouter>
    )
}