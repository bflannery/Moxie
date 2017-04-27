import React from 'react';
import SubFolderFile from './SubFolderFile';

import store from '../store';

export default React.createClass({
  render() {
    console.log(this.props);
    let subFolderFiles = <div/>;

    if(this.props.folder.files) {
      let subFolderFiles = this.props.folder.files.map((file, i, arr)=> {
      return <SubFolderFile file={file} clientId={this.props.folder.clientId} session={this.props.session}/>
    })
    }

    return (
      <ul className ="secondary-container">
        {subFolderFiles}
      </ul>
    );
  }
});
