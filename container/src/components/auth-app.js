import { mount } from 'auth/AuthApp'
import React, {useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

export default function AuthApp()  {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
      const { onParentNavigate } =  mount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ({ pathname: nextPathname }) => {
                if(history.location.pathname !== nextPathname) {
                    history.push(nextPathname);
                }
            }
        });

        if(onParentNavigate) {
            history.listen(onParentNavigate);
        }

    }, []);

    return <div ref={ref} />;
}