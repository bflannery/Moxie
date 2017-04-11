import React from 'react';
import {browserHistory} from 'react-router';
import store from '../../store';

export default React.createClass({
  render() {
    let sideBar = (
      <div className = "sidebar-button-container">
        <button className="side-button add-client-button" onClick={this.toggleNewClient}>Add Client</button>
        <button className="side-button add-file-button" onClick={this.dropZoneModal}> Add Files </button>
      </div>
    );

    if(this.props.clientId) {
      sideBar = (
        <div className = "sidebar-button-container">
          <button className="side-button add-client-button" onClick={this.toggleNewClient}>Add Folder</button>
          <button className="side-button add-file-button" onClick={this.dropZoneModal}> Add Files </button>
        </div>
      );
    }
    return(
        <aside className="sidebar sidebar-2">
        {sideBar}
        </aside>

    );
  },

//toggleNewClient
  //Set addFolder : true through Session Model

  toggleNewClient(e) {
    store.session.set({ addFolder: true });
  },

  dropZoneModal(e) {
    store.session.set({ addFileModal: true});
  }
});
