import * as React from 'react';
import {
    Badge,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Dropdown
} from 'reactstrap';
import { withRouter } from 'react-router-dom';

import '../../public/img/avatars/6.jpg';
import { connect } from 'react-redux';

class HeaderDropdown extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    dropAccnt() {
        return (
            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav>
                    {this.props.user ? this.props.user.Name : null}
                    <img src={'img/6.jpg'} className="img-avatar" />
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem onClick={this.props.logout ? this.props.logout.bind() : null}><i className="fa fa-lock"></i> Logout</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    render() {
        const { ...attributes } = this.props;
        return (
            this.dropAccnt()
        );
    }
}

export default HeaderDropdown;