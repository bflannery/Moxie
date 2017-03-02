import Backbone from 'backbone';
import $ from 'jquery';

export default Backbone.Model.extend({
  url: 'https://api.backendless.com/v1/data/Clients',
    idAttribute: 'objectId',
    defaults: {
      name: '',
      description: ''
    },

    addFileToClient({id, name}) {
      this.save({
        clientFiles: this.get('clientFiles').concat([{
          ___class: 'ClientFiles',
          client: name,
          file: {
            ___class: 'Files',
            objectId: id
          }
        }])
      });
    }
});
