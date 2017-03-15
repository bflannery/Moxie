import Backbone from 'backbone';
import clientModel from '../Models/clientModel';
import store from '../store';
import $ from 'jquery';
import {browserHistory} from 'react-router';

export default Backbone.Collection.extend({
  model: clientModel,
  url: 'https://api.backendless.com/v1/data/Clients',

  parse(data) {
    return data.data;
  },

  getClients(company) {
    $.ajax({
      type: 'GET',
      url: 'https://api.backendless.com/v1/data/Clients',
      success: (clients) => {
        return clients.data.filter((client, i ,arr)=>{
            if(client.name === company) {
              browserHistory.push('/clients/' + client.objectId);
            }
        });
      },
      error: () => {
        console.log('no clients');
      }
      });
    }
});
