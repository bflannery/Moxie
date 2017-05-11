import Backbone from 'backbone';
import folderModel from '../Models/folderModel';
import store from '../store';


export default Backbone.Collection.extend({
  model: folderModel,
  url: 'https://api.backendless.com/v1/data/Folders',

  parse(folders) {
    return folders.data;
  },

});
