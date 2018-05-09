import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ApplicationState } from '../../store';
import * as LayoutState from '../../reducers/Layout';


class Aside extends React.Component<any, any> {
  render() {
    return (
      <aside className="aside-menu" style={{  marginRight: this.props.asideOpen ? 0 : null }}>
        {/*Aside Menu*/}
      </aside>
    )
  }
}

// export default Aside;
export default connect<any,any,any,any>(
  (state: ApplicationState) => state.layout,
  LayoutState.actionCreators
)(Aside);
