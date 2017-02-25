import React from 'react';
import {Link} from 'react-router';
import store from '../store';

export default React.createClass({
  render() {
    return (
  <div className="landing-page-container">
        <div className="form-container">
          <form onSubmit={this.handleSubmit} className="register-form">
            <input className="register-input" ref="email" type="email" placeholder="Email"/>
            <input className="register-input" ref="password" type="password" placeholder="Password"/>
            <input className="register-input" ref="confirmPassword" type="password" placeholder="Confirm Password"/>
            <input className="login-button" type="submit" value="submit"/>
            <span className="redirect-link">Already A Member? <Link to="/"> Login Here!</Link></span>
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
