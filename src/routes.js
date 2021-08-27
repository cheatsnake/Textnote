import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import AppPage from './pages/AppPage/AppPage';
import AuthPage from './pages/AuthPage/AuthPage';

export const useRoutes = (isLogin) => {
    if (isLogin) {
        return (
            <Switch>
                <Route path="/" exact component={AppPage}/>
                <Redirect to="/"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/log" exact component={AuthPage}/>
            <Redirect to="/log"/>
        </Switch>
    )

};