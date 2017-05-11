import Backbone from 'backbone';
import sessionModel from '../Models/sessionModel';
import store from '../store';

export default Backbone.Collection.extend({
  model: sessionModel,
  url: 'https://api.backendless.com/v1/data/Users',

  parse(data) {
    console.log(data);
    return data.data;
  }
});
