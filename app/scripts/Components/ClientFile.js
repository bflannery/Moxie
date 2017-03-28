import React from 'react';
import {Link} from 'react-router';
import store from '../store';


export default React.createClass({

  render() {
    if(this.props.clientFile.clientId === this.props.client.objectId) {
      return (
          <li className="client-file">
            <div className="file-name-container">
              <Link to={`/preview/${this.props.clientFile.objectId}`} className="file-link">
                <i className="fa fa-file-o file-icon" aria-hidden="true"></i>
                <span> {this.props.clientFile.file} </span>
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
    store.files.get(id).deleteFile(id);
}
});
