import React from 'react';
import ClientSingle from './ClientSingle';
import MoxieFile from './MoxieFile';

export default React.createClass({
  render() {
    console.log(this.props);

    let clients;
    let files;

    if(this.props.clients.length < 1) {


      clients = <li> No Clients </li>;
    } else {
      clients = this.props.clients.map((client, i, arr)=> {
        if(window.localStorage.getItem('ownerId') === this.props.clients[i].ownerId)
          return <ClientSingle key={i} client={client} files={this.props.files}/>;
      });

      files = this.props.files.filter((file, i ,arr)=> {
        if(file.clientName !== 'moxie') {
          return true;
        } else {
          return <MoxieFile key={i} file={file}/>;
        }
      });

      console.log(files);
      console.log(clients);
    }
    return (
    <ul className="secondary-container">
      {clients}
    </ul>
  );
  }
});
