import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import App from './Components/Containers/App';
import landingPage from './Components/Containers/landingPage';
import moxieHome from './Components/Containers/moxieHome';
import register from './Components/registerPage';
import forgotPassword from './Components/forgotPassword';



const router = (

  <Router history ={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={landingPage}/>
       <Route path='/register' component={register}/>
       <Route path='/home' component={moxieHome}/>
       <Route path='/forgotpassword' component={forgotPassword}/>
    </Route>
  </Router>
);

export default router;
