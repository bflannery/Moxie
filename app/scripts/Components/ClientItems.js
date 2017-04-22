import React from 'react';
import ClientItem from './ClientItem';

import store from '../store';

export default React.createClass({
  render() {
    console.log(this.props);
    let allItems;
    let clientItems = [];
    let client = this.props.client;


    if(!client.clientFiles) {
      allItems = <div />;
    } else {
       clientItems = clientItems.concat(client.clientFiles, client.clientFolders);
       console.log(clientItems);

    allItems = clientItems.map((clientItem, arr, i ) => {
      return <ClientItem key={i} clientItem={clientItem} session={this.props.session}/>
    });
  }

    return (
      <ul className ="secondary-container">
        {allItems}
      </ul>
    );
  }
});
