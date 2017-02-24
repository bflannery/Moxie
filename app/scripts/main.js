import React from 'react';
import ReactDom from 'react-dom';
import router from './router';
import config from './config';

let appContainer = document.getElementById('app-container');


ReactDom.render(router, appContainer);
