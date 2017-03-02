import Backbone from 'backbone';
import fileModel from '../Models/fileModel';
import store from '../store';

export default Backbone.Collection.extend({
  model: fileModel,
  url: 'https://api.backendless.com/v1/data/Files',

  parse(data) {
    console.log(data.data);
    return data.data
  }
});
