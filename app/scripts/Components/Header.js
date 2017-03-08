import React from 'react';
import HeaderNav from './HeaderNav';

export default React.createClass({
  render() {
    return (
      <div className="header">
        <div className="header-logo-container">
          <h2 className="header-logo"> We.Moxie </h2>
        </div>
        <HeaderNav />
        </div>
    );
  }
});
