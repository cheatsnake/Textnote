import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import AppPage from './pages/AppPage/AppPage';
import AuthPage from './pages/AuthPage/AuthPage';

export const useRoutes = (isLogin) => {
    if (isLogin) {
        return (
            <Switch>
                <Route path="/textnote" exact component={AppPage}/>
                <Redirect to="/textnote"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/textnote/log" exact component={AuthPage}/>
            <Redirect to="/textnote/log"/>
        </Switch>
    )

};