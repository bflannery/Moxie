import {browserHistory} from 'react-router';
import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config';

export default Backbone.Model.extend({

  initialize() {
    if(window.localStorage['user-token']) {
      this.set({
        auth: true,
        'user-token': window.localStorage['user-token'],
        ownerId: window.localStorage.ownerId
      });
    }
  },

  idAttribute: '_id',
  defaults: {
    authenticated: false,
    passwordReset: null
    },

    register(email, password, confirmPW) {
      if(password === confirmPW) {
        this.save(
          {email, password},
          {
            url: 'https://api.backendless.com/v1/users/register',
            success: (response) => {
              console.log('Registration complete!');
              this.login(email, password);
            },
            error: (response) => {
              console.log('User data not svaed to server.');
            }
          }
        );
      } else {
        alert('Passwords do not match');
      }
    },

});
