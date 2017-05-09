import React from 'react';
import NavBarClientFolder from './NavBarClientFolder';

import store from '../store';

export default React.createClass({
  render() {

    let navBarClientFolders;

    if(this.props.clientFolders === undefined || this.props.clientFolders.length === 0) {
      navBarClientFolders = <div />;
    } else {
      navBarClientFolders = this.props.clientFolders.map((clientFolder, i, arr) => {
        return <NavBarClientFolder key={i} clientFolder={clientFolder}/>
      });
    }

    return (
      <ul className ="secondary-container">
        {navBarClientFolders}
      </ul>
    );
  }
});
