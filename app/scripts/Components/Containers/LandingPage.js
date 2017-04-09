import React from 'react';
import store from '../../store';

import Login from '../Login';

export default React.createClass({

  getInitialState() {
    return {
      session : store.session.toJSON(),
    };
  },

  componentDidMount() {
    store.session.on('update change', this.updateStatus);
  },

  componentWIllUnmount() {
    store.session.off('update change', this.updateStatus);
  },

  render() {
    return (

      <div className="main-container">
          <Login session={this.state.session}/>
         </div>


    );
  },

//updateStatus
    //sets the Session state to current session
    
  updateStatus(){
    this.setState({session: store.session.toJSON()});
  }

});
