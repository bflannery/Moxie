import Backbone from 'backbone';
import config from '../config';
import $ from 'jquery';


export default Backbone.Model.extend({
rootUrl: 'https://api.backendless.com/v1/data/clientFiles',
  idAttribute: 'objectId',
  defaults: {
    name: '',
    workoutDate: ''
  },
addFileToClient({name}) {
    this.save({
          files: this.get('files').concat([{
          ___class: 'Files',
          name   : name,
        }]),
      }, {
    success: (response) => {
      this.trigger('change');
        }
      });
  }

});
