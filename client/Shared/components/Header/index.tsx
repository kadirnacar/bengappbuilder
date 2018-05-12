import * as React from 'react';
import {
  Nav,
  NavItem,
  NavbarToggler,
  NavLink,
  NavbarBrand,
} from 'reactstrap';
import HeaderDropdown from './HeaderDropdown';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ApplicationState } from '../../store';
import * as LayoutState from '../../reducers/Layout';

class Header extends React.Component<any, any> {

  sidebarToggle(e) {
    e.preventDefault();
    //  document.body.classList.toggle('sidebar-hidden');
    this.props.toggleSidebar();
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    this.props.toggleSidebar();
    // document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    // document.body.classList.toggle('aside-menu-hidden');
    this.props.toggleAside();
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle.bind(this)}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <NavbarBrand href="#"></NavbarBrand>
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle.bind(this)}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <Nav className="d-md-down-none" navbar>
          {this.props.headerMenu}
        </Nav>
        <Nav className="ml-auto" navbar>
          <HeaderDropdown />
        </Nav>
        {/* <NavbarToggler className="d-md-down-none" onClick={this.asideToggle.bind(this)}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler> */}
      </header>
    );
  }
}

// export default Header;

export default connect<any,any,any,any>(
  (state: ApplicationState) => state.layout,
  LayoutState.actionCreators
)(Header);

