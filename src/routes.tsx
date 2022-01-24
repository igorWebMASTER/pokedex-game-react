import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { LandingPage , Map, Home } from './pages';

const Routes = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact component={LandingPage}  path="/" />
                <Route exact component={Map}  path="/game" />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;