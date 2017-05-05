import Backbone from 'backbone';
import folderFileModel from '../Models/folderFileModel';
import store from '../store';


export default Backbone.Collection.extend({
  model: folderFileModel,
  url: 'https://api.backendless.com/v1/data/FolderFiles',

  parse(data) {
    return data.data;
  },

});
