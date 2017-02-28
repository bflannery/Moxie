import Backbone from 'backbone';
import $ from 'jquery';

export default Backbone.Model.extend({
  url: 'https://api.backendless.com/v1/data/Clients',
    idAttribute: 'objectId',
    defaults: {
      name: '',
      description: ''
    },

    deleteClient(objectId) {
      this.destroy({objectId});
    },

    addFile(fileUrl) {
      this.save({file: fileUrl}, {type: 'PUT'});
    }
});
