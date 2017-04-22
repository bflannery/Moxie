import React from 'react';
import ClientFolder from './ClientFolder';

import store from '../store';

export default React.createClass({
  render() {
    console.log(this.props);
    let allItems = <div/>;
    let clientItems = [];
    let client = this.props.client;

    clientItems = clientItems.concat(client.clientFiles);

    console.log(clientItems);



    return (
      <ul className ="secondary-container">
        {allItems}
      </ul>
    );
  }
});
