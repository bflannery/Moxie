import React from 'react';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';

import store from '../../store';
import Client from '../../Models/clientModel';

import ClientItems from '../ClientItems';
import ClientFiles from '../ClientFiles';
import ClientFolders from '../ClientFolders';
import DropzoneModal from '../DropzoneModal';
import Header from '../Header';
import Sidebar from './Sidebar';
import NavSideBar from './NavSideBar';
import NewClientForm from '../NewClientForm';

export default React.createClass({
  getInitialState() {
    return {
      session: store.session.toJSON()
    }
  },

  render() {
    return (
      <div className="subfolder-container">
        <Header/>
        <div className="main-container">
        <h1> SUBFOLDER HOME </h1>
        <NavSideBar session={this.state.session} />
        <Sidebar session={this.state.session}/>
        </div>
      </div>
    );
  }
});
