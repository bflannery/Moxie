import Backbone from 'backbone';
import clientFileModel from '../Models/fileModel';
import store from '../store';
import $ from 'jquery';

export default Backbone.Collection.extend({
  model: clientFileModel,
  url: 'https://api.backendless.com/v1/data/ClientFiles',

  parse(data) {
    return data.data;
  },

  //Delete Client Files from ClientFiles Collection
  // On Success, call deleteClientFromClientsCollections on Clients Collection
  // If no clientFiles ...

  deleteClientFilesFromClientFilesCollection(clientId) {
    // console.log(clientId);
    $.ajax({
      type: 'GET',
      url: 'https://api.backendless.com/v1/data/ClientFiles',
      success: (clientFiles) => {
        // console.log(clientFiles.data);
        let newTotalClientFiles = clientFiles.data.filter((clientFile, i, arr) => {
          if (clientFile.files.clientId != clientId) {
            return true;
          } else {
              $.ajax({
                type: 'DELETE',
                url: `https://api.backendless.com/v1/data/ClientFiles/${clientFile.objectId}`,
                success: () => {
                  console.log('file deleted from client files collection');
                },
                error: () => {
                  console.log('file not deleted from client files collections');
                }
              });
            }
          });
          store.clients.deleteClientFromClientsCollections(clientId);
        },
      error: () => {
        console.log('no client files');
        }
    });
  }
});
