import React from 'react';
import store from '../store';


export default React.createClass({
  render() {
    return (
      <form className="add-new-client">
        <input type="text" ref="clientName" className="client-input" placeholder="Client Name"/>
        <button type="submit" className="create-button" onClick={this.addClient}> Add Client </button>
      </form>
    );
  },

  addClient(e) {
     e.preventDefault();
     let clientName = this.refs.clientName.value;

     store.clients.create({
       name : clientName
     });
  }

});
