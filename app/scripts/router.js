import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import App from './Components/Containers/App';
import LandingPage from './Components/Containers/LandingPage';

import Register from './Components/RegisterPage';
import ForgotPassword from './Components/ForgotPassword';


import MoxieHome from './Components/Containers/MoxieHome';
import MoxieClientHome from './Components/Containers/MoxieClientHome';




const router = (

  <Router history ={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={LandingPage}/>
       <Route path='/register' component={Register}/>
       <Route path='/home' component={MoxieHome}/>
       <route path='/clients/:id' component = {MoxieClientHome}/>
       <Route path='/forgotpassword' component={ForgotPassword}/>
    </Route>
  </Router>
);

export default router;
