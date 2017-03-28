import React from 'react';
import {Link} from 'react-router';
import store from '../store';


export default React.createClass({

  render() {
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
    let id = this.props.clientFile.objectId;
    let fileName = this.props.clientFile.file;
    store.files.get(id).deleteFileFromData(id);
    store.files.get(id).deleteFileFromFiles(fileName);
}
});
