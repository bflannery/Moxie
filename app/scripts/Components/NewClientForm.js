import React from 'react';
import store from '../store';


export default React.createClass({

  render() {
    return (
      <form className="add-new-client" onSubmit={this.addClient}>
        <input type="text" ref="clientName" className="client-input" placeholder="Add Client"/>
      </form>
    );
  },

// addClient
    // Create a new client through Clients Collection
    // Set addFolder: false through Session model
    
  addClient(e) {
    e.preventDefault();
     let clientName = this.refs.clientName.value.toLowerCase();
     store.clients.create({ name : clientName});
     store.session.set({ addFolder: false});
  }
});
