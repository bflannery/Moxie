import React from 'react';
import {Link} from 'react-router';
import store from '../store';

export default React.createClass({
  render() {
    return (
  <div className="register-container">
        <div className="form-container">
          <h1 className="landing-title"> Moxie </h1>
          <form onSubmit={this.handleSubmit} className="login-register-form">
            <input className="register-input" ref="email" type="email" placeholder="Email"/>
            <input className="register-input" ref="password" type="password" placeholder="Password"/>
            <input className="register-input" ref="confirmPassword" type="password" placeholder="Confirm Password"/>
            <button> Register </button>
            <p className="message">Already A Member? <Link to="/"> Login!</Link></p>
          </form>
        </div>
        </div>

    );
  },
  handleSubmit(e) {
    e.preventDefault();
      const email= this.refs.email.value;
      const password= this.refs.password.value;
      const confirmPassword= this.refs.confirmPassword.value;
      store.session.register(email, password);
  }
});
