import {browserHistory} from 'react-router';
import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config';
import store from '../store';

export default Backbone.Model.extend({

initialize() {
  if (window.localStorage['user-token']) {
			this.set({
        'user-token': window.localStorage['user-token'],
        'company': window.localStorage.company,
        'email' : window.localStorage.email
      });
      if(window.localStorage.company === 'wemoxie') {
        this.set({auth: true});
        }
      }
    },


  url: 'https://api.backendless.com/v1/data/Users',
  idAttribute: 'objectId',
  defaults: {
    auth: false,
    passwordReset: null,
    addFolder: false,
    addFileModal: false,
    email: '',
    company: '',
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
    this.save({
      email, password, company},{
      url:'https://api.backendless.com/v1/users/register'
    })
    .done((response)=> {
      console.log('when true: ', response);
      this.login(email, password);
    })
    .fail((xhr)=> {
      console.log('error: ' , xhr);
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

  login(login, password){
    this.save({ login, password }, {
      type: 'POST',
      url: 'https://api.backendless.com/v1/users/login'
    }).done((response)=> {
      console.log(response);

      localStorage.setItem('company', response.company);
      window.localStorage.setItem('user-token',response['user-token']);
      window.localStorage.setItem('email',response.email);
      window.localStorage.setItem('ownerId',response.ownerId);

      if(response.email.toLowerCase().includes('wemoxie')) {
          this.set({auth: true});
          console.log('logged in as moxie!');
          browserHistory.push('/home');
        } else {
          this.set({auth: false});
          console.log('logged in as client!')
          store.clients.getClients(response.company);
        }
      }).fail((xhr)=>{
        console.log('login error: ' , xhr);
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

// forgotPassword(email) {
//       $.ajax({
//         url:`https://api.backendless.com/v1/users/restorepassword/${email}`,
//         success:(response)=>{
//         }
//       });
//     },
});
