import React from 'react';
import store from '../../store';

import NewClientForm from '../NewClientForm';
import ClientsList from '../ClientsList';

export default React.createClass({

  getInitialState() {
    return {
      clients: store.clients.toJSON()
    };
  },

  componentDidMount() {
    store.clients.fetch();
    store.clients.on('update change', this.updateState);
  },

  componentWillUnmount() {
    store.clients.off('update change', this.updateState);
  },

  updateState() {
    this.setState({
      clients: store.clients.toJSON(),
    });
  },

  render() {
    return (
      <div className="moxie-home">
        <h1> We.Moxie </h1>
        <div className="client=list-container">
          <h2> Add New Client </h2>
          <NewClientForm/>
          <ClientsList clients={this.state.clients}/>
        </div>
        <input className="logout-button" id="logout-button" type="submit" value="Log Out" onClick={this.handleLogout}/>
      </div>
    );
  },
  handleLogout(e) {
      e.preventDefault();
      store.session.logout();
    }

});
