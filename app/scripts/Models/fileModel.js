import Backbone from 'backbone';
import $ from 'jquery';
import {browserHistory} from 'react-router';

export default Backbone.Model.extend({
  url: 'https://api.backendless.com/v1/data/Files',
    idAttribute: 'objectId',
    defaults: {
      name: '',
      description: ''
    },
    addFile(fileUrl, file, clientId) {
      console.log(file);
      this.save({fileUrl: fileUrl, file: file, clientId: clientId},{type: 'PUT'});
    },
});
