import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import App from './Components/Containers/App';
import LandingPage from './Components/Containers/LandingPage';

import Register from './Components/RegisterPage';
import ForgotPassword from './Components/ForgotPassword';


import MoxieHome from './Components/Containers/MoxieHome';
import MoxieClientHome from './Components/Containers/MoxieClientHome';
import SubFolderPage from './Components/Containers/SubFolderPage';

import Files from './Components/Containers/Files';
import Recent from './Components/Containers/Recent';
import Trash from './Components/Containers/Trash';


const router = (

  <Router history ={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={LandingPage}/>
       <Route path='/register' component={Register}/>
       <Route path='/home' component={MoxieHome}/>
       <Route path='/clients/:id' component = {MoxieClientHome}/>
       <Route path='/folders/:id' component = {SubFolderPage}/>
       <Route path='/forgotpassword' component={ForgotPassword}/>
       <Route path='/files' component = {Files}/>
       <Route path='/recent' component = {Recent}/>
       <Route path='/trash' component = {Trash} />
    </Route>
  </Router>
);

export default router;
