import Backbone from 'backbone';
import $ from 'jquery';

export default Backbone.Model.extend({
  urlRoot: 'https://api.backendless.com/v1/data/Clients',
    idAttribute: 'objectId',
    defaults: {
      name: '',
      description: ''
    },
});

// addFileToClient({fileUrl, clientID}) {
//   this.save({
//     clientFiles: this.get('clientFiles').concat([{
//       ___class: 'ClientFiles',
//       client: clientID,
//       file: {
//         ___class: 'Files',
//         objectId: fileUrl
//       }
//     }])
//   });
// },
