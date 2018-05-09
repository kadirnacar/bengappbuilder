import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ApplicationState } from '../../store';
import * as LayoutState from '../../reducers/Layout';

class Footer extends React.Component<any, any> {
  render() {
    return (
      <footer className="app-footer" style={{ marginLeft: this.props.sidebarOpen ? null : 0, marginRight: this.props.asideOpen ? 250 : null }}>
        <span><a href="http://www.bengsoft.com">Bengsoft</a> &copy; 2018.</span>
        <span className="ml-auto">Powered by <a href="www.bengsoft.com">Bengsoft</a></span>
      </footer>
    )
  }
}

// export default Footer;
export default connect<any, any, any, any>(
  (state: ApplicationState) => state.layout,
  LayoutState.actionCreators
)(Footer);
