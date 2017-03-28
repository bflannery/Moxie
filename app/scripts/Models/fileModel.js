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
      this.save({fileUrl: fileUrl, file: file, clientId: clientId, clientName: clientName },
      {
        success: (file)=> {
          store.clients.get(file.attributes.clientId).addFileToClient({id: file.attributes.objectId, name: file.attributes.file});
          console.log(file);
        }
      });
  },

    deleteFile(objectId) {
    this.destroy ({ url: `https://api.backendless.com/v1/data/Files/${objectId}`});
  },
});
