import Backbone from 'backbone';
import $ from 'jquery';

export default Backbone.Model.extend({
  urlRoot: 'https://api.backendless.com/v1/data/Clients',
    idAttribute: 'objectId',
    defaults: {
      name: '',
      description: ''
    },

  deleteClient(objectId) {
  this.destroy ({ url: `https://api.backendless.com/v1/data/Clients/${objectId}`})
},
});
