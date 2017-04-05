import Backbone from 'backbone';
import fileModel from '../Models/fileModel';
import store from '../store';
import $ from 'jquery';

export default Backbone.Collection.extend({
    model: fileModel,
    url: 'https://api.backendless.com/v1/data/Files',

    parse(data) {
        return data.data;
    },

    //Delete Client Files From Files Table
    //On Success, call deleteClientFilesFromClientFilesCollection on Client Files Collection
    //If no client files in file collection ...

    deleteClientFilesFromFilesCollection(clientId) {
      $.ajax({
        type: 'GET',
        url: 'https://api.backendless.com/v1/data/Files',
        success: (files) => {
          // console.log(files.data);
          let newTotalFiles = files.data.filter((file, i, arr) => {
            if (file.clientId != clientId) {
              return true;
            } else {
                $.ajax({
                  type: 'DELETE',
                  url: `https://api.backendless.com/v1/data/Files/${file.objectId}`,
                  success: () => {
                    console.log('file deleted from files collection');
                  },
                  error: () => {
                    console.log('file not deleted from files collections');
                  }
                });
              }
            });
          store.clientFiles.deleteClientFilesFromClientFilesCollection(clientId);
          },
        error: () => {
          console.log('no clients');
          }
      });
    }
});
