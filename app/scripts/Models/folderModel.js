import {browserHistory} from 'react-router';
import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config';
import store from '../store';

export default Backbone.Model.extend({
    url: 'https://api.backendless.com/v1/data/Folders',
    idAttribute: 'objectId',
    defaults: {
        name: '',
        timestamp: new Date()
    },



    addFolderToData(folderURL , folderName, clientName, clientId) {
      $.ajax({
          type: 'POST',
          url: 'https://api.backendless.com/v1/data/Folders',
          contentType: 'application/json',
          data: JSON.stringify({
              folderURL,
              folderName,
              clientName,
              clientId
          }),
          success: (response) => {
              console.log('folder added to folder table...');
              let folderName = response.folderName;
              let folderId = response.objectId;
              store.clients.get(response.clientId).addFolderToClientFolders(folderId, folderName)
          },
          error: () => {
              console.log('no folder to data table')
          }

      });
    }
  });
