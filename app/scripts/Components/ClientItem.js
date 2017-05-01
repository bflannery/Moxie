import React from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import store from '../store';
import $ from 'jquery';

export default React.createClass({
  render() {

    let itemLink;

    if(this.props.session.auth === false) {
        if(this.props.item.files) {
          itemLink = (
              <div>
                <Link to={this.props.item.files.fileUrl} target="_blank" className="file-link">
                  <i className="fa fa-file-o file-icon" aria-hidden="true"></i>
                  <span> {this.props.item.files.fileName} </span>
                </Link>
                </div>
          );
        } else if(this.props.item.folders) {
          itemLink = (
              <div>
                <Link to= {`/folders/${this.props.item.folders.objectId}`} className="file-link">
                  <i className="fa fa-folder-o folder-icon" aria-hidden="true"></i>
                  <span> {this.props.item.folders.folderName} </span>
                </Link>
                </div>
          );
        }

    } else {
        if(this.props.item.files) {
          itemLink = (
            <div>
              <Link to={this.props.item.files.fileUrl} target="_blank" className="file-link">
                <i className="fa fa-file-o file-icon" aria-hidden="true"></i>
                <span> {this.props.item.files.fileName} </span>
              </Link>
              <button onClick={this.removeFile} type="submit" className="delete-file-button">
                <i className="fa fa-times-circle" aria-hidden="true"></i>
              </button>
            </div>

        );
      } else if (this.props.item.folders){
        itemLink = (
          <div>
            <Link to ={`/folders/${this.props.item.folders.objectId}`} className="folder-link">
              <i className="fa fa-folder-o folder-icon" aria-hidden="true"></i>
              <span> {this.props.item.folders.folderName} </span>
            </Link>
            <button onClick={this.removeFolder} type="submit" className="delete-file-button">
              <i className="fa fa-times-circle" aria-hidden="true"></i>
            </button>
        </div>
      );
      }
    }
    return (
      <li className="client-file">
      {itemLink}
      </li>
    );
  },

//removeFile
    //Create local variables for clientFile values
    //Call deleteFileFromStorage through Files Collection

removeFile(e) {
  e.preventDefault();
  let fileId = this.props.item.files.objectId;
  let fileUrl = this.props.item.files.fileUrl;
  let clientId = this.props.item.files.clientId;
  let clientFileId = this.props.item.objectId;
  store.fileStore.deleteFileFromStorage(fileId, fileUrl, clientId, clientFileId);
},

removeFolder(e) {
  e.preventDefault();
  let subFolderId = this.props.item.folders.objectId;
  let subFolderURL = this.props.item.folders.folderURL;
  let clientId = this.props.item.folders.clientId;
  let clientFolderId = this.props.item.objectId;
  store.fileStore.deleteFolderFromStorage(subFolderId, subFolderURL, clientId, clientFolderId);
}
});
