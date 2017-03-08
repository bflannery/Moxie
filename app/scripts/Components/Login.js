import React from 'react';
import {Link} from 'react-router';
import store from '../store';



export default React.createClass({
  render(){
    return (
      <div className="login-container">
        <div className="form-container">
          <h1 className="landing-title"> Moxie </h1>
          <form onSubmit={this.handleSubmit} className="login-register-form">
            <input className="login-input" ref="email" type="email" placeholder="Email"/>
            <input className="login-input" ref="password" type="password" placeholder="Password"/>
            <button> Login </button>
            <p className="message"> Not A Member? <Link to="/register">Create An Account!</Link></p>
            <p className="message"> Forgot Password? <Link to="/forgotpassword">Retrieve Password</Link></p>
          </form>
        </div>
      </div>

    );
  },

  handleSubmit(e){
    e.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    store.session.login(email, password);
  }
});
