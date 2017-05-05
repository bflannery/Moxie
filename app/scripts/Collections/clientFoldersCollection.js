import Backbone from 'backbone';
import clientFolderModel from '../Models/clientFolderModel';
import store from '../store';
import $ from 'jquery';

export default Backbone.Collection.extend({
  model: clientFolderModel,
  url: 'https://api.backendless.com/v1/data/ClientFolders',

  parse(data) {
    return data.data;
  },

});
