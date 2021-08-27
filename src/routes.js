import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import AppPage from './pages/AppPage/AppPage';
import AuthPage from './pages/AuthPage/AuthPage';

export const useRoutes = (isLogin) => {
    if (isLogin) {
        return (
            <Switch>
                <Route path="/Textnote" exact component={AppPage}/>
                <Redirect to="/Textnote"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/Textnote/log" exact component={AuthPage}/>
            <Redirect to="/Textnote/log"/>
        </Switch>
    )

};