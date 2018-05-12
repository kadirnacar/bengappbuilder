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

import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Button } from 'reactstrap';

class AsideMenu extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleProperty = this.toggleProperty.bind(this);
        this.state = {
            isOpen: false,
            activeTab: '1'
        };
    }
    componentDidMount() {

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
        return (
                <Aside style={{ top: 0, paddingTop: 40, paddingLeft: 10 }}
                    headerComponent={
                        <Navbar color="secondary" dark expand="md">
                            <NavbarBrand href="#"
                                onClick={(event) => {
                                    event.preventDefault();
                                }}>
                                <Button className="toggle-aside" size="sm" onClick={(event) => {
                                    this.props.toggleAside();
                                }}>
                                    <i className="fa fa-cogs"></i>
                                </Button>
                            </NavbarBrand>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink tag="button"
                                        className={classnames({ "btn-square": true, "btn-dark": true, btn: true, active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggleProperty('1'); }}>
                                        <div>Özellikler</div>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag="button"
                                        className={classnames({ "btn-square": true, "btn-dark": true, btn: true, active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggleProperty('2'); }}>
                                        <div>Nesneler</div>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Navbar>
                    }>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            tab 1
          </TabPane>
                        <TabPane tabId="2">
                            tab 2
          </TabPane>
                    </TabContent>
                </Aside>
        )
    }
}

// export default withRouter(FormDetail);

export default withRouter(connect<any, any, any, any>(
    (state: ApplicationState) => state.layout,
    LayoutState.actionCreators
)(AsideMenu));

