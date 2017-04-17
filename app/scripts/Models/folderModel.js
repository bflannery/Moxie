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


    addFolderToData(folderURL , folderName, clientId, parentFolderName) {
      console.log('addFolderToData clientId: ' , clientId);
      $.ajax({
          type: 'POST',
          url: 'https://api.backendless.com/v1/data/Folders',
          contentType: 'application/json',
          data: JSON.stringify({
              folderURL,
              folderName,
              parentFolderName,
              clientId
          }),
          success: (response) => {
            console.log(response);
              if(!clientId) {
                this.trigger('change');
                store.session.set({addFolder: false});
              } else {

              console.log('folder added to folder table...');
              let folderName = response.folderName;
              let folderId = response.objectId;
              store.clients.get(response.clientId).addFolderToClientFolders(folderId, folderName);
              }
            },
          error: () => {
              console.log('no folder to data table');
          }

      });
    },

    deleteClientFolder(client) {
      console.log(client);
      $.ajax({
        type: 'GET',
        url: 'https://api.backendless.com/v1/data/Folders'
      })
      .done((clientFolders)=> {
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
      })
      .fail((xhr)=> {
        console.log('failed to get folders: ' , xhr);
      });
    }
  });
