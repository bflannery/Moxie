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
      <h1 className="landing-title">We.Moxie</h1>
      <h3> Forgot Password </h3>
      <form className="login-register-form" onSubmit={ this.handleSubmit }>
       <input type="email" name="email" ref="email" placeholder="Your Email"/>
       <button type="submit" id="submit"> Submit </button>
       { message }
     </form>
     </div>
    );
  },

  //handleSubmit
    //Create local variable for email value
    //Call forgotPassword on Session Model
    //Push to Home

  handleSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.value;
    store.session.forgotPassword(email);
    browserHistory.push('/');
  }
});
