import React from 'react';
import {Link} from 'react-router';
import store from '../store';
import $ from 'jquery';


export default React.createClass({
  render() {
    console.log(this.props);
    let fileLink;


    if(this.props.session.auth === false) {
      if(this.props.file.files) {
      fileLink = (
          <div>
            <Link to={this.props.file.files.fileUrl} target="_blank" className="file-link">
              <i className="fa fa-file-o file-icon" aria-hidden="true"></i>
              <span> {this.props.file.files.fileName} </span>
            </Link>
            </div>
      );
    } else {
      fileLink = <div/>
    }
  }
    else {
        if(this.props.file.files) {
          fileLink = (
                <div>
                  <Link to={this.props.file.files.fileUrl} target="_blank" className="file-link">
                    <i className="fa fa-file-o file-icon" aria-hidden="true"></i>
                    <span> {this.props.file.files.fileName} </span>
                  </Link>
                  <button onClick={this.removeFile} type="submit" className="delete-file-button">
                    <i className="fa fa-times-circle" aria-hidden="true"></i>
                  </button>
                </div>

            );
        }
    }
    return (
      <li className="client-file">
      {fileLink}
      </li>
    );
  },

//removeFile
    //Create local variables for clientFile values
    //Call deleteFileFromStorage through Files Collection

removeFile(e) {
  e.preventDefault();
  let folderFile = this.props.file;
  store.fileStore.deleteFileFromStorage(folderFile);
}
});
