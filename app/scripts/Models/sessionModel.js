import {browserHistory} from 'react-router';
import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config';
import store from '../store';

export default Backbone.Model.extend({

  initialize() {
         if (window.localStorage.getItem('user-token')) {
             this.set({auth: true, 'user-token': window.localStorage.getItem('user-token')});
         }
  },

  url: 'https://api.backendless.com/v1/data/Users',
  idAttribute: 'objectId',
  defaults: {
    auth: false,
    passwordReset: null,
    addFolder: false,
    addFileModal: false

  },
  // ----------------------------
  // Validate User Password
  // ----------------------------

  validatePassword(password, confirmPassword) {
      if (password === confirmPassword) return true;
      return false;
  },

// ----------------------------
//Register New User
// On Success, call Login on Session
// ----------------------------

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

// ----------------------------
//Log In Existing User
// On Success, store user info in local storage
// If Moxie user, set auth true
    // push user to Moxie Home
// If Moxie client, set auth false
    // call getClients on Clients collection
// ----------------------------


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


          if(window.localStorage.email.toLowerCase().includes('wemoxie')) {
          this.set({auth: true});
          browserHistory.push('/home');
        } else {
          this.set({auth: false});
          store.clients.getClients(window.localStorage.company);
        }
      }
      });
    },

// ----------------------------
//Log Out Current User
// On Success, clear local Storage and push to Landing Page
// ----------------------------

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

// ----------------------------
// Send Password to Existing User
// ----------------------------

forgotPassword(email) {
      $.ajax({
        url:`https://api.backendless.com/v1/users/restorepassword/${email}`,
        success:(response)=>{
        }
      });
    }
});
