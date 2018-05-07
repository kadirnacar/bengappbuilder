import * as React from 'react';

class Footer extends React.Component<any, any> {
  render() {
    return (
      <footer className="app-footer">
        <span><a href="http://www.bengsoft.com">Bengsoft</a> &copy; 2018.</span>
        <span className="ml-auto">Powered by <a href="www.bengsoft.com">Bengsoft</a></span>
      </footer>
    )
  }
}

export default Footer;
