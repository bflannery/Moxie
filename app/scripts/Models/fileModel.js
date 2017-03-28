import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config';
import {browserHistory} from 'react-router';
import store from '../store';

export default Backbone.Model.extend({
  url: 'https://api.backendless.com/v1/data/Files',
    idAttribute: 'objectId',
    defaults: {
      name: '',
      description: ''
    },

    addFile(fileUrl, file, clientId, clientName) {
      $.ajax({
        type: 'POST',
        url: 'https://api.backendless.com/v1/data/Files',
        contentType: 'application/json',
        data: JSON.stringify({fileUrl, file, clientId, clientName}),
        success: (file)=> {
          store.clients.get(file.clientId).addFileToClient({id: file.objectId, name: file.file});
          this.trigger('change');
        }
      });
  },

    deleteFile(objectId) {
    this.destroy ({ url: `https://api.backendless.com/v1/data/Files/${objectId}`});
  },
});
