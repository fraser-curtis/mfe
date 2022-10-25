import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/header';
import { MarketingApp } from './components/marketing-app';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
    productionPrefix: 'container'
});

export const App = () => {
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header/>
                    <MarketingApp/>
                </div>
            </StylesProvider>
        </BrowserRouter>
    )
}