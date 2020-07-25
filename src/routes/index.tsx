import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

import GlobalStyles from '../styles/global';

const Routes: React.FC = () => (
    <>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/repositories/:repository+" component={Repository} />
            </Switch>
        </BrowserRouter>
        <GlobalStyles />
    </>
);

export default Routes;