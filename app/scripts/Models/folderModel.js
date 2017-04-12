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



    addFolderToData(folderURL , clientName) {
      console.log(folderURL);
      $.ajax({
          type: 'POST',
          url: 'https://api.backendless.com/v1/data/Folders',
          contentType: 'application/json',
          data: JSON.stringify({
              folderURL,
              clientName
          }),
          success: (folder) => {
            console.log(folder);
              console.log('folder added to folder table...');
          },
          error: () => {
              console.log('no folder to data table')
          }

      });
    }
  });
