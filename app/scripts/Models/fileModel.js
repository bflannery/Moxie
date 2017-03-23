import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config';
import {browserHistory} from 'react-router';

export default Backbone.Model.extend({
  url: 'https://api.backendless.com/v1/data/Files',
    idAttribute: 'objectId',
    defaults: {
      name: '',
      description: ''
    },

    addFile(fileUrl, file, clientId, clientName) {
      this.save({fileUrl: fileUrl, file: file, clientId: clientId, clientName: clientName},{type: 'POST'});
    },

    deleteFile(objectId) {
    this.destroy ({ url: `https://api.backendless.com/v1/data/Files/${objectId}`});
  },
});
