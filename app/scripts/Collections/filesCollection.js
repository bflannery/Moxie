import Backbone from 'backbone';
import fileModel from '../Models/fileModel';
import store from '../store';
import $ from 'jquery';

export default Backbone.Collection.extend({
    model: fileModel,
    url: 'https://api.backendless.com/v1/data/Files',

    parse(data) {
      return data.data.sort(function(a,b){
        let nameA = a.name;
        let nameB = b.name;
        if(nameA < nameB) {
          return -1;
        }
        if(nameA > nameB) {
          return 1;
        }
        return 0;
      });
    },
});
