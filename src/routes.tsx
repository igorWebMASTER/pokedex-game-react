import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { InitialPage , Map } from './pages';

import { ManageUIContext } from './context/UIContext'
import Layout from './components/Layout';

import React from 'react';
import { Toaster } from 'react-hot-toast';

const Routes = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Switch>
              <ManageUIContext>
               <Layout>
                  <Route exact component={InitialPage}  path="/" />
                  <Route exact component={Map}  path="/game" />
                  <Route render={() => <Redirect to="/" />} />
                  <Toaster/>
                </Layout>
              </ManageUIContext>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
