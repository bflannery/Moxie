import Backbone from 'backbone';
import folderModel from '../Models/folderModel';
import store from '../store';
import $ from 'jquery';

export default Backbone.Collection.extend({
  model: folderModel,
  url: 'https://api.backendless.com/v1/data/Folders',

  parse(data) {
    return data.data;
  },

});
