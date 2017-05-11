import React from 'react';
import {Link} from 'react-router';
import store from '../store';
import $ from 'jquery';


export default React.createClass({

  render() {
    console.log(this.props);

    if(this.props.session.auth === false) {
      return (
          <li className = "client-file">
            <Link to ={`/folders/${this.props.clientFolder.folders.objectId}`} className="folder-link">
              <i className="fa fa-folder-o folder-icon" aria-hidden="true"></i>
              <span> {this.props.clientFolder.folders.folderName} </span>
            </Link>
        </li>
        );
    } else {
    if(this.props.clientFolder) {
      return (
          <li className = "client-file">
            <Link to ={`/folders/${this.props.clientFolder.folders.objectId}`} className="folder-link">
              <i className="fa fa-folder-o folder-icon" aria-hidden="true"></i>
              <span> {this.props.clientFolder.folders.folderName} </span>
            </Link>
            <button onClick={this.removeFolder} type="submit" className="delete-file-button">
              <i className="fa fa-times-circle" aria-hidden="true"></i>
            </button>
        </li>
        );
    } else {
      return (
        <div />
      );
    }
    }
  },


//removeFile
    //Create local variables for clientFile values
    //Call deleteFileFromStorage through Files Collection

    removeFolder(e) {
      e.preventDefault();
      let clientFolder = this.props.clientFolder;
      store.fileStore.deleteSubFolderFromStorage(clientFolder);
    }
  });
