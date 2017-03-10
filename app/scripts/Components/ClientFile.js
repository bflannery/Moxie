import React from 'react';
import {Link} from 'react-router';
import store from '../store';


export default React.createClass({
  render() {
    console.log(this.props);
    if(this.props.clientFile.clientId === this.props.client.objectId) {
      return (
        <li className="client-file">
        <i className="fa fa-file-o file-icon" aria-hidden="true"></i>
        <div className="file-name-container">
          <Link to={`/preview/${this.props.clientFile.objectId}`} className="file-link">
            <span> {this.props.clientFile.file} </span>
            </Link>
            <button onClick={this.removeFile} type="submit" className="delete-file-button">
             <i className="fa fa-times-circle" aria-hidden="true">
            </i></button>
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
