import React from 'react';
import store from '../../store';


export default React.createClass({

  render() {
    return (
      <div className="moxie-home">
        <h1> We.Moxie </h1>
        <input className="login-button" id="logout-button" type="submit" value="Log Out" onClick={this.handleLogout}/>
      </div>
    );
  },
  handleLogout(e) {
      e.preventDefault();
      store.session.logout();
    }

});
