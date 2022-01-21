import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';

const Routes = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={LandingPage}  path="/" />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;