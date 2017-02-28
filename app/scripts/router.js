import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import App from './Components/Containers/App';
import LandingPage from './Components/Containers/LandingPage';
import MoxieHome from './Components/Containers/MoxieHome';
import Register from './Components/RegisterPage';
import ForgotPassword from './Components/ForgotPassword';
import Dropzone from './Components/Dropzone';

import ClientsPage from './Components/Containers/ClientsPage';
import ClientHome from './Components/Containers/ClientHome';




const router = (

  <Router history ={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={LandingPage}/>
       <Route path='/register' component={Register}/>
       <Route path='/home' component={MoxieHome}/>
       <route path='/clients' component = {ClientsPage}/>
       <route path='/clients/:id' component = {ClientHome}/>
       <Route path='/clients/files/:id' component = {Dropzone}/>
       <Route path='/forgotpassword' component={ForgotPassword}/>
    </Route>
  </Router>
);

export default router;
