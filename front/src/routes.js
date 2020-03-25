import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

function Routes() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={props => (
            localStorage.getItem('ongID')
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )} />
    )

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register}/>

                <PrivateRoute path="/profile" component={Profile}/>
                <PrivateRoute path="/incidents/new" component={NewIncident}/>
            </Switch>    
        </BrowserRouter>
    )
}

export default Routes;