import Backbone from 'backbone';
import clientModel from '../Models/clientModel';
import store from '../store';
import $ from 'jquery';
import {browserHistory} from 'react-router';

export default Backbone.Collection.extend({
  model: clientModel,
  url: 'https://api.backendless.com/v1/data/Clients',

  parse(clients) {
    return clients.data;
  },

  // Get All Clients
  // Filter Client based on Client name
  // Push to Client Page

  getClients(company) {
    $.ajax({
      type: 'GET',
      url: 'https://api.backendless.com/v1/data/Clients',
      success: (clients) => {
        return clients.data.filter((client, i ,arr)=>{
            if(client.clientName === company) {
              this.trigger('change');
              browserHistory.push('/clients/' + client.objectId);
            }
        });
      },
      error: () => {
        console.log('no clients');
      }
      });
    },

    //Delete Client From Clients Collection
    //On Success, trigger change

    deleteClientFromClientsCollections(clientId) {
      // console.log(clientId);
      $.ajax({
        type: 'GET',
        url: 'https://api.backendless.com/v1/data/Clients',
        success: (clients) => {
          return clients.data.filter((client, i ,arr)=>{
            // console.log(client);
            if(client.objectId != clientId) {
              return true;
            } else {
              $.ajax({
                type: 'DELETE',
                url: `https://api.backendless.com/v1/data/Clients/${client.objectId}`,
                success: () => {
                  console.log('client deleted from clients collection');
                },
                error: () => {
                  console.log('client not deleted from clients collections');
                }
              });

            }
          });
        }
      });
        this.trigger('update change');
    },
});
