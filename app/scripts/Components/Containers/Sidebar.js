import React from 'react';
import {browserHistory} from 'react-router';
import store from '../../store';

export default React.createClass({
  render() {
    return(
      <div>
        <button className="add-client-button" onClick={this.toggleNewClient}>Add Client</button>
        <button className="add-file-button" onClick={this.dropZoneModal}> Add Files </button>
      </div>
    );
  },

  toggleNewClient(e) {
    store.session.set({ addFolder: true });
  },

  dropZoneModal() {

  }



});
