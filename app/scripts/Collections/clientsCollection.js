import Backbone from 'backbone';
import clientModel from '../Models/clientModel';
import store from '../store';

export default Backbone.Collection.extend({
  model: clientModel,
  url: 'https://api.backendless.com/v1/data/Clients',

  parse(data) {
    return data.data
  }
});
