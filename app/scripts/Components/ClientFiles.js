import React from 'react';
import ClientFile from './ClientFile';

import store from '../store';

export default React.createClass({
  render() {
    let clientFiles;
    let clientFolders;
    let AllFiles = [];
      clientFiles = this.props.client.clientFiles.map((clientFile, i, arr) => {
        console.log(clientFile);
      });

    return (
      <ul className ="secondary-container">
        {clientFiles}
      </ul>
    );
  }
});
//
// return <ClientFile key={i} clientFile={clientFile}/>
