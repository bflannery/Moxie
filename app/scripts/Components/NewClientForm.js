import React from 'react';
import store from '../store';


export default React.createClass({
  render() {
    return (
      <form className="add-new-client">
        <input type="text" ref="clientName" className="new-input" placeholder="Add New Client"/>
        <textarea type="text" ref="clientDescription" className="workout-info" placeholder="Description"/>
        <input type="submit" value="Add" className="create-button" onClick={this.addClient}/>
      </form>
    );
  },

  addClient(e) {
     e.preventDefault();
     let clientName = this.refs.clientName.value;
     let clientDescription = this.refs.clientDescription.value;

     store.clients.create({
       name : clientName,
       description : clientDescription
     });
  }

});
