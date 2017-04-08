import React from 'react';
import {browserHistory} from 'react-router';
import store from '../store';

export default React.createClass({
render() {
  console.log(this.props);

  return(
        <div>
          <button className="add-client-button" onClick={this.toggleNewClient}>Add Client</button>
        </div>
    );
  },

  toggleNewClient(e) {
    store.session.set({ editing: true });
  }

});
