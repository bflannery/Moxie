import React from 'react';
import store from '../store';
import UploadFile from './UploadFile';


export default React.createClass({

render() {
      let uploadFiles;

      if(!this.props.uploadFiles) {
        uploadFiles = <div />;
      } else {
        uploadFiles = this.props.uploadFiles.map((uploadFile, i, arr) => {
          return <UploadFile key={i} uploadFile = {uploadFile} />
        });
      }
  return (
    <ul className = "upload-file-container">
      {uploadFiles}
    </ul>
  );
}

});
