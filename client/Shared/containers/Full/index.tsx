import * as React from 'react';
import { Container } from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import { withRouter } from 'react-router';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ApplicationState } from '../../store';
import * as LayoutState from '../../reducers/Layout';

class Full extends React.Component<any, any> {
    componentWillMount() {
        if (this.props.sidebarShow == false) {
            this.props.toggleSidebar();
        }
    }
    render() {
        const { checked, authenticated } = this.props;
        return <div className="app">
            <Header headerMenu={this.props.headerMenu} />
            <div className="app-body">
                <Sidebar {...this.props} />
                <main className="main" style={{ marginLeft: this.props.sidebarOpen ? null : 0 , marginRight: this.props.asideOpen ? 250 : null}}>
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

// export default Full;
export default connect<any, any, any, any>(
    (state: ApplicationState) => state.layout,
    LayoutState.actionCreators
)(Full);
