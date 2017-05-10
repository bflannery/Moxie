import React from 'react';
import ClientSingle from './ClientSingle';
import MoxieFile from './MoxieFile';

export default React.createClass({
  render() {
    let clients;

    if(this.props.clients.length < 1) {
      clients = <div/>;
    } else {
      clients = this.props.clients.map((client, i, arr)=> {
        if(window.localStorage.getItem('ownerId') === this.props.clients[i].ownerId)
          return <ClientSingle key={i} client={client} files={this.props.files}/>;
      });
    }
    return (
    <ul className="secondary-container">
      {clients}
    </ul>
  );
  }
});
