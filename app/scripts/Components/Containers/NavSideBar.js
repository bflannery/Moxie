import React from 'react';
import {browserHistory , Link} from 'react-router';
import store from '../../store';
import NavBarClientFolders from '../NavBarClientFolders';

export default React.createClass({
  render() {
    console.log(this.props)

    let navBar;
    if(this.props.session.auth === false) {

      if(this.props.client) {
        navBar = <NavBarClientFolders clientFolders={this.props.client.clientFolders}/>
      } else {
        navBar = <div />;
      }
    } else {
        navBar = (
          <ul className = "navSideBar-links-container">
            <Link to="/home" onClick={this.resetState} className ="navSideBar-links">Clients</Link>
            <Link to="/files" onClick={this.resetState} className="navSideBar-links">Files</Link>

            </ul>
        );
    }
    return(
        <nav className = "sidebar sidebar-1">
        {navBar}
        </nav>
    );

  },

  resetState() {
    store.client.set({addFolder: false});
    store.client.set({addFileModal: false});
    store.session.set({addFolder: false});
    store.session.set({addFileModal: false});
  }
});




//<Link to="/recent" onClick={this.resetState} className ="navSideBar-links">Recent</Link>
//<Link to="/trash" onClick={this.resetState} className ="navSideBar-links">Trash</Link>
