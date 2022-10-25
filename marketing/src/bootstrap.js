import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './app';
import { createMemoryHistory} from 'history'

const mount = (el, { onNavigate }) => {
    const history = createMemoryHistory();

    if(onNavigate) {
        history.listen(onNavigate);
    }


    ReactDOM.render(
        <App history={history} />        ,
        el
    )

    return {
        onParentNavigate({pathname: nextPathname}){
            if(history.location.pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    };
};



if(process.env.NODE_ENV === 'development') {
    const el = document.querySelector("#marketing-dev-root");

    if(el) {
        mount(el, {});
    }
}

export { mount };