import React from 'react';
import ClientFolder from './ClientFolder';

import store from '../store';

export default React.createClass({
  render() {


    let clientFolders;
    if(!this.props.client.clientFolders) {
      clientFolders = <div />;
    } else {
      clientFolders = this.props.client.clientFolders.map((clientFolder, i, arr) => {
        return <ClientFolder key={i} clientFolder={clientFolder}/>
      });
    }

    return (
      <ul className ="secondary-container">
        {clientFolders}
      </ul>
    );
  }
});
