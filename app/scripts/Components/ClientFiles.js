import React from 'react';
import ClientFile from './ClientFile';

import store from '../store';

export default React.createClass({
  render() {
    let clientFiles;

    if(!this.props.clientFiles) {
      clientFiles = <div />;
    } else {
      clientFiles = this.props.clientFiles.map((clientFile, i, arr) => {
        return <ClientFile key={i} clientFile={clientFile} clientId = {this.props.client.objectId}/>
      });
    }

    return (
      <ul className ="client-file-list">
        {clientFiles}
      </ul>
    );
  }
});
