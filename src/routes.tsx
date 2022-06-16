import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
// import { InitialPage, Map } from './pages';
const InitialPage = React.lazy(() => import('./pages/InitialPage'))
const Map = React.lazy(() => import('./pages/Map'))
import { ManageUIContext } from './context/UIContext'
import Layout from './components/Layout';

import React, { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { PokemonProvider } from 'context/pokemonContext';

const Routes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <ManageUIContext>
          <PokemonProvider>
            <Layout>
              <Suspense fallback={<div>Loading...</div>}>
                <Route exact component={InitialPage} path="/" />
                <Route exact component={Map} path="/game" />
                <Route render={() => <Redirect to="/" />} />
              </Suspense>
              <Toaster />
            </Layout>
          </PokemonProvider>
        </ManageUIContext>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
