import React from 'react';
import SubFolderFile from './SubFolderFile';

import store from '../store';

export default React.createClass({



  render() {
    let subFolderFiles;

    if(!this.props.folder.folderFiles) {
      subFolderFiles = <div/>
    } else {
      let folderFiles = this.props.folder.folderFiles;

      subFolderFiles = folderFiles.map((file, i, arr)=> {
        if(file.files.folderId === this.props.folder.objectId) {
      return <SubFolderFile key={i} file={file} clientId={this.props.folder.clientId} session={this.props.session}/>
    }

  });
}



    return (
      <ul className ="secondary-container">
        {subFolderFiles}
      </ul>
    );
  }
});
