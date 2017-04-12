import React from 'react';
import ClientFile from './ClientFile';

import store from '../store';

export default React.createClass({
  render() {
    let clientFiles;
    console.log(this.props);
    if(!this.props.client.clientFiles) {
      clientFiles = <div />;
    } else {
      clientFiles = this.props.client.clientFiles.map((clientFile, i, arr) => {
        return <ClientFile key={i} clientFile={clientFile}/>
      });
    }

    return (
      <ul className ="secondary-container">
        {clientFiles}
      </ul>
    );
  }
});
