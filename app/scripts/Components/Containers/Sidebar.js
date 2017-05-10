import React from 'react';
import {browserHistory} from 'react-router';
import store from '../../store';

export default React.createClass({


  render() {
    let sideBar;
    if(this.props.session.auth === false) {
        sideBar = <div />;
    } else {
      if(this.props.clientId) {
        sideBar = (
          <div className = "sidebar-button-container">
          <button className="side-button add-client-button" onClick={this.toggleNewFolder}>Add Folder</button>
          <button className="side-button add-image-button" onClick={this.imageModal}> Add Client Logo </button>


          </div>
        );
      } else if (this.props.folder){
        sideBar = (
          <div className = "sidebar-button-container">
          <button className="side-button add-file-button" onClick={this.dropZoneModal}> Add Files </button>
          </div>
        );
      } else {
      sideBar = (
        <div className = "sidebar-button-container">
          <button className="side-button add-client-button" onClick={this.toggleNewFolder}>Add Client</button>
        </div>
      );
    }
  }
    return(
        <aside className="sidebar sidebar-2">
        {sideBar}
        </aside>

    );
  },

//toggleNewClient
  //Set addFolder : true through Session Model

  toggleNewFolder(e) {
    store.session.set({ addFolder: true });
  },

  dropZoneModal(e) {
    store.session.set({ addFileModal: true});
  },

  imageModal(e) {
    store.clients.get(this.props.clientId).set({addPhoto: true});
  }
});
