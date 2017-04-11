import Backbone from 'backbone';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import store from '../store';

export default Backbone.Model.extend({
  urlRoot: 'https://api.backendless.com/v1/data/ClientFiles',
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

    deleteClientFilesFromClientFilesCollection(clientId, clientFilesObject) {

      if(clientFilesObject.length > 0) {
        $.ajax({
          type: 'GET',
          url: 'https://api.backendless.com/v1/data/ClientFiles',
          success: (clientFiles) => {
            console.log(clientFiles)
            let newTotalClientFiles = clientFiles.data.filter((clientFile, i, arr) => {
              if (clientFile.files.clientId != clientId) {
                return true;
              } else {
                let fileObjectId = clientFile.files.objectId;
                  $.ajax({
                    type: 'DELETE',
                    url: `https://api.backendless.com/v1/data/ClientFiles/${clientFile.objectId}`,
                    success: () => {
                      console.log('file deleted from client files collection');
                      console.log('calling deleteClientFilesFromAllFilesCollection');
                      store.file.deleteClientFilesFromAllFilesCollection(clientId, clientFilesObject);
                    },
                    error: () => {
                      console.log('file not deleted from client files collections');
                    }
                  });
                }
              });

            },
          error: () => {
            console.log('no client files');
            }
          });
      } else {
        console.log('calling deleteClientFilesFromAllFilesCollection');
        store.file.deleteClientFilesFromAllFilesCollection(clientId, clientFilesObject);

      }
    }
});
