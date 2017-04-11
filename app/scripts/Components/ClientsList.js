import React from 'react';
import ClientSingle from './ClientSingle';

export default React.createClass({
  render() {

    let clients;

    if(this.props.clients.length < 1) {
      clients = <li> No Clients </li>;
    } else {
      clients = this.props.clients.map((client, i, arr)=> {
        if(window.localStorage.getItem('ownerId') === this.props.clients[i].ownerId)
          return <ClientSingle key={i} client={client} files={this.props.files}/>;
      });
    }
    return (
    <ul className="client-file-container">
      {clients}
    </ul>
  );
  }
});
