import React, {lazy, Suspense} from 'react';
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
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header/>
                    <Suspense fallback={<Loader />}>
                        <Switch>
                            <Route path="/auth" component={AuthLazy} />
                            <Route path="/" component={MarketingLazy}/>
                        </Switch>
                    </Suspense>
                    
                </div>
            </StylesProvider>
        </BrowserRouter>
    )
}