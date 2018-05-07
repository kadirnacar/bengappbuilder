import * as React from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import { withRouter } from 'react-router';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

class Full extends React.Component<any, any> {

    render() {
        const { checked, authenticated } = this.props;
        return <div className="app">
            <Header headerMenu={this.props.headerMenu} />
            <div className="app-body">
                <Sidebar {...this.props} />
                <main className="main">
                    {/* <Breadcrumb routes={this.props.nav} /> */}
                    <Container fluid>
                        {this.props.children}
                    </Container>
                </main>
                <Aside />
            </div>
            <Footer />
        </div>
    }
}

export default Full;
