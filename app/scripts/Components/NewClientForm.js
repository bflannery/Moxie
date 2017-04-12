import React from 'react';
import store from '../store';


export default React.createClass({

  render() {
    return (
      <form className="add-new-client" onSubmit={this.addClient}>
        <i className="fa fa-folder-o folder-icon" aria-hidden="true"></i>
        <input type="text" ref="clientName" className="client-input"/>
      </form>
    );
  },

// addClient
    // Create a new client through Clients Collection
    // Set addFolder: false through Session model

  addClient(e) {
    e.preventDefault();
     let clientName = this.refs.clientName.value.toLowerCase();
     store.file.createClientFolder(clientName);
     store.session.set({ addFolder: false});
  }
});
