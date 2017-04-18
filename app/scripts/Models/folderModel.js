import {browserHistory} from 'react-router';
import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config';
import store from '../store';

export default Backbone.Model.extend({
    url: 'https://api.backendless.com/v1/data/Folders',
    idAttribute: 'objectId',
    defaults: {
        folderName: '',
        folderURL: ''
    },


    addClientFolder(folderURL , folderName, clientId) {
      console.log(clientId);
      this.save({
        folderURL : folderURL,
        folderName : folderName,
        clientId : clientId
      }).done((response)=>{
        console.log('added Client');
        console.log(response);
        store.folders.trigger('change');
      }).fail((xhr)=> {
        console.log('error: ' , xhr);
      });
    },


    deleteClientFolder(client) {
      console.log(client);
      $.ajax({
        type: 'GET',
        url: 'https://api.backendless.com/v1/data/Folders'
      }).done((clientFolders)=> {
        console.log(clientFolders);
        let newClientFolder = clientFolders.data.filter((clientFolder, i ,arr)=> {
          if(clientFolder.clientId !== client.objectId) {
            return true;
          } else {
            $.ajax({
              type: 'DELETE',
              url: `https://api.backendless.com/v1/data/Folders/${clientFolder.objectId}`,
              success: () => {
                console.log('folder deleted');
                store.clients.get(client.objectId).deleteClient(client);
              },
              error: ()=> {
                console.log('folder was not deleted');
              }

            });
          }
        });
      }).fail((xhr)=> {
        console.log('failed to get folders: ' , xhr);
      });
    }
  });