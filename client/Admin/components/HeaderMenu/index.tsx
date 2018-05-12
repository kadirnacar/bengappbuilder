import * as React from 'react';
import {
    Badge,
    DropdownItem,
    DropdownMenu,
    NavItem,
    DropdownToggle,
    Dropdown
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class HeaderMenu extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            [<NavItem key="1" className="px-3">
                <NavLink to="/"><i className="fa fa-home"></i> Anasayfa</NavLink>
            </NavItem>,
            <NavItem  key="2" className="px-3">
                <NavLink to="/forms"><i className="fa fa-wpforms"></i> Sayfalar</NavLink>
            </NavItem>
            ]
        );
    }
}

export default (HeaderMenu);