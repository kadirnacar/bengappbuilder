import * as React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { mapToCssModules } from 'reactstrap/lib/utils';
import * as classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Widget from '../../../Shared/components/Widget';
import Aside from '../../../Shared/components/Aside/';
import { ApplicationState } from '../../store';
import * as LayoutState from '../../../Shared/reducers/Layout';
import * as classnames from 'classnames';
import AsideMenu from './AsideMenu';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Button } from 'reactstrap';

import Page from '../../../Shared/Layout/Page';

class FormDetail extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleProperty = this.toggleProperty.bind(this);
        this.state = {
            isOpen: false,
            activeTab: '1'
        };
    }
    shouldComponentUpdate(){
        return false;
    }
    componentWillUnmount() {
        this.props.toggleAside(false);

    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
            activeTab: '1'
        });
    }
    toggleProperty(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    
    render() {
        console.log("Detail");
        return (
            <div className="animated fadeIn page-content">
                <Navbar color="success" dark expand="md">
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav pills>
                            <NavItem>
                                <NavLink tag="button" className="btn btn-sm btn-square">dd</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <AsideMenu />
                <br />
                <Page style={{ border: "1px solid #000", height: 100 }}
                    container="fluid" />
            </div>
        )
    }
}

// export default withRouter(FormDetail);

export default withRouter(connect<any, any, any, any>(
    (state: ApplicationState) => state.layout,
    LayoutState.actionCreators
)(FormDetail));

