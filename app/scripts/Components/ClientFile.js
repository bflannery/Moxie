import React from 'react';
import {Link} from 'react-router';
import store from '../store';
import fileDownload from 'react-file-download';
import $ from 'jquery';


export default React.createClass({

  render() {
    if(this.props.clientFile) {
      return (
          <li className="client-file">
              <Link to={this.props.clientFile.files.fileUrl} target="_blank" className="file-link">
                <i className="fa fa-file-o file-icon" aria-hidden="true"></i>
                <span> {this.props.clientFile.files.file} </span>
              </Link>
              <button onClick={this.removeFile} type="submit" className="delete-file-button">
                <i className="fa fa-times-circle" aria-hidden="true"></i>
              </button>
          </li>
        );
    } else {
      return (
        <div />
      );
    }
  },


//removeFile
    //Create local variables for clientFile values
    //Call deleteFileFromStorage through Files Collection

  removeFile(e) {
    e.preventDefault();
    let fileId = this.props.clientFile.files.objectId;
    let fileUrl = this.props.clientFile.files.fileUrl;
    let clientId = this.props.clientFile.files.clientId;
    let clientFileId = this.props.clientFile.objectId;
    store.files.get(fileId).deleteFileFromStorage(fileId, fileUrl, clientId, clientFileId);
  }
});
