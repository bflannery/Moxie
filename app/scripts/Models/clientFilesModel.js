import Backbone from 'backbone';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import store from '../store';

export default Backbone.Model.extend({
  url: 'https://api.backendless.com/v1/data/ClientFiles',
    idAttribute: 'objectId',
    defaults: {
      name: '',
      description: ''

    },

    // ----------------------------
    //Delete Client Files from ClientFiles Collection
    // On Success, call deleteClientFromClientsCollections on Clients Collection
    // If no clientFiles ...
    // ----------------------------

    deleteClientFiles(client) {
      console.log(client);
      let emptyClientFiles = client.clientFiles.forEach((clientFile, i, arr)=> {
        $.ajax({
          type: 'DELETE',
          url: `https://api.backendless.com/v1/data/ClientFiles/${clientFile.objectId}`,
          success: (response) => {
            console.log('file deleted, response: ' , response);
          },
          error: (xhr)=>{
            console.log('file delete error: ', xhr);
          }
        });
      if(emptyClientFiles === undefined) {
        console.log('all clientFiles deleted');
        store.folder.deleteClientFolder(client);
      } else {
        console.log('not all clientFiles deleted');
      }
    });
  }
});
