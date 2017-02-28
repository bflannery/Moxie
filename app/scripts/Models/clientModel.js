import Backbone from 'backbone';
import $ from 'jquery';

export default Backbone.Model.extend({
  rootUrl: 'https://api.backendless.com/v1/data/Clients',
    idAttribute: 'objectId',
    defaults: {
      name: '',
      description: ''
    },

    deleteClient(objectId) {
      console.log(objectId);
      this.destroy({objectId});
    }
});
