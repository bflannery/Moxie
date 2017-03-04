import React from 'react';
import {Link} from 'react-router';
import store from '../store';


export default React.createClass({
  render() {
    console.log(this.props);
    if(this.props.clientFile.clientId === this.props.clientId) {
      return (
        <div>
          <Link to={`/preview/${this.props.clientFile.objectId}`}>
            <span> {this.props.clientFile.file} </span>
          </Link>
          </div>
      );
    } else {
      return (
        <div />
      );
    }
  }
});
