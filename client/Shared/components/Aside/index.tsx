import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ApplicationState } from '../../store';
import * as LayoutState from '../../reducers/Layout';
import ScrollArea from 'react-scrollbar';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';


class Aside extends React.Component<any, any> {

  sidebarToggle(e) {
    e.preventDefault();
    this.props.toggleAside();
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    this.props.toggleAside();
  }
  render() {
    return (
      <aside className="aside-menu" style={{ marginRight: this.props.asideOpen || this.props.isOpen ? 0 : null, ...this.props.style }}>
        {this.props.headerComponent}
        <ScrollArea
          className="area"
          contentClassName="content"
          horizontal={false}
          style={{ height: "100%" }}
          smoothScrolling={true}
        >
          {this.props.children}
        </ScrollArea>
      </aside>
    )
  }
}

// export default Aside;
export default connect<any, any, any, any>(
  (state: ApplicationState) => state.layout,
  LayoutState.actionCreators
)(Aside);
