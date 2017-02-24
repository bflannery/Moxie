import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import App from './Components/Containers/App';
import Register from './Components/RegisterPage';
import LandingPage from './Components/Containers/LandingPage';

const router = (

  <Router history ={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={LandingPage}/>
       <Route path='/register' component={Register}/>
    </Route>
  </Router>
);

export default router;
