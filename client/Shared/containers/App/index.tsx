import * as React from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import { PrivateRoute } from '../../routes';
import { withRouter } from 'react-router';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Full from '../../containers/Full';

class App extends React.Component<any, any> {
    componentWillMount() {

    }
    render() {
        return <BrowserRouter>
           {this.props.children}
        </BrowserRouter>
    }
}

export default App;
