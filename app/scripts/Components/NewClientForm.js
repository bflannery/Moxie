import React from 'react';
import store from '../store';


export default React.createClass({

  render() {
    console.log(this.props);
    return (
      <form className="add-new-client" onSubmit={this.addFolder}>
        <i className="fa fa-folder-o folder-icon" aria-hidden="true"></i>
        <input type="text" ref="folderName" className="client-input"/>
      </form>
    );
  },

// addClient
    // Create a new client through Clients Collection
    // Set addFolder: false through Session model

  addFolder(e) {
    e.preventDefault();
    if(this.props.client) {
      let client = this.props.client;
      let clientName = this.props.client.clientName;
      let clientObjectId = this.props.client.objectId;
      let clientURL = this.props.client.folderURL;
      let folderName = this.refs.folderName.value.toLowerCase();
      store.fileStore.createSubFolder(client, clientName, clientObjectId, clientURL, folderName);

    } else {
     let clientName = this.refs.folderName.value;
     store.fileStore.createClientFolder(clientName);
     store.session.set({ addFolder: false});
   }
  }
});
