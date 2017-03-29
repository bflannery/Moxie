import React from 'react';
import {Link} from 'react-router';
import store from '../store';


export default React.createClass({

  render() {
    console.log(this.props);
    if(this.props.clientFile) {
      return (
          <li className="client-file">
            <div className="file-name-container">
              <Link to={`/preview/${this.props.clientFile.files.objectId}`} className="file-link">
                <i className="fa fa-file-o file-icon" aria-hidden="true"></i>
                <span> {this.props.clientFile.files.file} </span>
                <button onClick={this.removeFile} type="submit" className="delete-file-button">
                  <i className="fa fa-times-circle" aria-hidden="true"></i>
                </button>
              </Link>
            </div>
          </li>
        );
    } else {
      return (
        <div />
      );
    }
  },

  removeFile(e) {
    e.preventDefault();
    let fileId = this.props.clientFile.files.objectId;
    let fileUrl = this.props.clientFile.files.fileUrl;
    let clientId = this.props.clientFile.files.clientId
    let clientFileId = this.props.clientFile.objectId;
    store.files.get(fileId).deleteFileFromStorage(fileId, fileUrl, clientId, clientFileId);
}
});
