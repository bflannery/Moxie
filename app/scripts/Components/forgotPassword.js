import React from 'react';
import store from '../store';
import {browserHistory} from 'react-router';

export default React.createClass({

  getInitialState() {
    return {
      message: null
    };
  },

  componentDidMount() {
    store.session.on('update change', () => {
      this.setState({ message: store.session.get('pwReset') });
    });

  },

  componentWillUnmount() {
    store.session.off();
  },

  render(){
    let message = null;

    if(this.state.message) {
      message = (
        <div className="reset-message">
          {this.state.message}
        </div>
      );
    }
    return (
      <div className="forgot-pw-container">
      <h1> Forgot Password </h1>
      <form className="login-register" onSubmit={ this.handleSubmit }>
       <input type="email" name="email" ref="email" placeholder="Your Email"/>
       <input type="submit" id="submit" name="submit" value="Submit" />
       { message }
     </form>
     </div>
    );
  },

  handleSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.value;
    store.session.newPassword(email);
    browserHistory.push('/');
  }
});
