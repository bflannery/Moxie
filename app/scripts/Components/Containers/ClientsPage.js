import React from 'react';
import store from '../../store';

import NewClientForm from '../NewClientForm';
import ClientsList from '../ClientsList';
import Header from '../Header';

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
        <Header/>
        <div className="client-list-container">
          <h2 className="client-form-title"> Add New Client </h2>
          <NewClientForm/>
          <ClientsList clients={this.state.clients}/>
        </div>
      </div>
    );
  }
});
