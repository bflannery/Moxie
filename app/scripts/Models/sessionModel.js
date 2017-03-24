import {browserHistory} from 'react-router';
import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config';
import store from '../store';

export default Backbone.Model.extend({

  initialize() {
         if (window.localStorage.getItem('user-token')) {
             this.set({'user-token': window.localStorage.getItem('user-token')});
         }
  },

  url: 'https://api.backendless.com/v1/data/Users',
  idAttribute: 'objectId',
  defaults: {
    auth: false,
    passwordReset: null
  },

  validatePassword(password, confirmPassword) {
      if (password === confirmPassword) return true;
      return false;
  },

  register(email, password, company){
    $.ajax({
      type: 'POST',
      url: 'https://api.backendless.com/v1/users/register',
      contentType: 'application/json',
      data: JSON.stringify({email, password, company}),
      success: (response) => {

        this.login(email, password, company);
      },
      error: () => {
        console.log('User data not saved to server.');
      }
    });
  },

  login(email, password){
    $.ajax({
      type: 'POST',
      url: 'https://api.backendless.com/v1/users/login',
      contentType: 'application/json',
      data: JSON.stringify({login: email, password}),
      success: (response) => {

          window.localStorage.setItem('company', response.company);
          window.localStorage.setItem('user-token',response['user-token']);
          window.localStorage.setItem('email',response.email);
          window.localStorage.setItem('ownerId',response.ownerId);

          if(window.localStorage.company.toLowerCase() === 'we.moxie') {
          this.set({ auth: true});
          browserHistory.push('/home');
        } else {
          this.set({ auth: false});
          store.clients.getClients(window.localStorage.company);
        }
      }
      });
    },

  logout(){
    $.ajax({
      contentType: 'application/json',
      url: 'https://api.backendless.com/v1/users/logout',
      success: ()=> {
        console.log('logged out!');
        this.clear();
        window.localStorage.clear();
        browserHistory.push('/');
      }
    });
  },

forgotPassword(email) {
      $.ajax({
        url:`https://api.backendless.com/v1/users/restorepassword/${email}`,
        success:(response)=>{
        }
      });
    }
});
