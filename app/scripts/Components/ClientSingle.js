import React from 'react';

import store from '../store';

export default React.createClass({
  render() {
    console.log(this.props);
    return (
      <li>
      <div>
        <h4 className="client-name"> {this.props.client.name}</h4>
        <span className="client-description"> {this.props.client.description}</span>
      </div>
      </li>
    );
  }
});
