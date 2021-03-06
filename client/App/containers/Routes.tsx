import * as React from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { PrivateRoute } from '../../Shared/routes';
import { withRouter } from 'react-router';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Full from '../../Shared/containers/Full';
import { ApplicationState } from '../store';
import * as AuthState from '../../Shared/reducers/Auth';
import Login from '../../Shared/views/Login';
import Register from '../../Shared/views/Login/Register';
import Activate from '../../Shared/views/Login/Activate';
import NewPassword from '../../Shared/views/Login/NewPassword';
import ForgetPassword from '../../Shared/views/Login/ForgetPassword';
import Dashboard from '../views/Dashboard/';
import nav from './_nav';

class App extends React.Component<any, any> {
    componentWillMount() {
        // if (this.props.location.pathname.indexOf("/admin") > -1) {
        //     window.location.href="/admin";
        // }
    }
    render() {
        const { checked, authenticated } = this.props;
        return <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forgetpassword" component={ForgetPassword} />
            <Route path="/activate/:guid" component={Activate} />
            <Route path="/newpassword/:guid" component={NewPassword} />
            <Full nav={nav}>
                <Route path="/" component={Dashboard} />

                {/* <PrivateRoute exact path="/" component={Dashboard} authenticated={authenticated} />
                {authenticated ? null : <Redirect from="/" to="/login" />} */}
            </Full>
        </Switch>
    }
}


export default withRouter(connect<any, any, any, any>(
    (state: ApplicationState) => state.session,
    AuthState.actionCreators
)(App));
