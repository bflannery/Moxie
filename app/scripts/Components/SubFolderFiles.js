import React from 'react';
import SubFolderFile from './SubFolderFile';

import store from '../store';

export default React.createClass({



  render() {
    console.log(this.props);
    let subFolderFiles;

    if(this.props.folder.clientId) {

      let folderFiles = this.props.folder.folderFiles;

      subFolderFiles = folderFiles.map((file, i, arr)=> {
      return <SubFolderFile key={i} file={file} clientId={this.props.folder.clientId} session={this.props.session}/>
    });

  } else {
    subFolderFiles = <div/>
  }

    return (
      <ul className ="secondary-container">
        {subFolderFiles}
      </ul>
    );
  }
});
