import Backbone from 'backbone';
import $ from 'jquery';
import {browserHistory} from 'react-router';

export default Backbone.Model.extend({
  urlRoot: 'https://api.backendless.com/v1/data/Clients',
    idAttribute: 'objectId',
    defaults: {
      name: '',
      description: ''
    },


    addFileToClient({id, name}) {
          this.save({
              clientFiles: this.get('clientFiles').concat([{
                ___class: 'ClientFiles',
                files: {
                  ___class: 'Files',
                  objectId: id,
                  name: name
                }
              }]),
            }, {
              success: (client, response) => {
                this.trigger('change');
                browserHistory.push('/clients/'+ client.id);
              }
            });
          },

    deleteClient(objectId) {
        this.destroy ({ url: `https://api.backendless.com/v1/data/Clients/${objectId}`});
    },

    deleteFileFromClient(clientFileId) {
      console.log(clientFileId);
    }
});
