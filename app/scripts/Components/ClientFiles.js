import React from 'react';
import ClientFile from './ClientFile';

import store from '../store';

export default React.createClass({
  render() {
    let clientFiles;

    if(!this.props.client.clientFiles) {
      clientFiles = <div />;
    } else {
      clientFiles = this.props.client.clientFiles.map((clientFile, i, arr) => {
        return <ClientFile key={i} clientFile={clientFile}/>
      });
    }

    return (
      <ul className ="client-file-container">
        {clientFiles}
      </ul>
    );
  }
});
