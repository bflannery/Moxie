import React from 'react';
import {browserHistory} from 'react-router';
import store from '../../store';

export default React.createClass({
  render() {
    return(
      <aside className="sidebar sidebar-2">
        <button className="add-client-button" onClick={this.toggleNewClient}>Add Client</button>
        <button className="add-file-button" onClick={this.dropZoneModal}> Add Files </button>
      </aside>
    );
  },

//toggleNewClient
  //Set addFolder : true through Session Model

  toggleNewClient(e) {
    store.session.set({ addFolder: true });
  },

  dropZoneModal() {

  }
});
