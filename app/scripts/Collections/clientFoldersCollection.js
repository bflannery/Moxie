import Backbone from 'backbone';
import clientFolderModel from '../Models/fileModel';
import store from '../store';
import $ from 'jquery';

export default Backbone.Collection.extend({
  model: clientFileModel,
  url: 'https://api.backendless.com/v1/data/ClientFiles',

  parse(data) {
    return data.data;
  },

});
