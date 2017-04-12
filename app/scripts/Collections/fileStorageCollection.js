import Backbone from 'backbone';
import fileStorageModel from '../Models/fileStorageModel';
import store from '../store';
import $ from 'jquery';

export default Backbone.Collection.extend({
  model: fileStorageModel,
  url: 'https://api.backendless.com/v1/files/Moxie',

  parse(data) {
    console.log(data);
    return data.data;
  },

});
