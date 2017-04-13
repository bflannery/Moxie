import Backbone from 'backbone';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import store from '../store';

export default Backbone.Model.extend({
  urlRoot: 'https://api.backendless.com/v1/data/ClientFiles',
    idAttribute: 'objectId',
    defaults: {
      name: '',
      
    },


  });
