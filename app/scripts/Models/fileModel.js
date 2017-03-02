import Backbone from 'backbone';
import $ from 'jquery';
import {browserHistory} from 'react-router';

export default Backbone.Model.extend({
  url: 'https://api.backendless.com/v1/data/Files',
    idAttribute: 'objectId',
    defaults: {
      name: '',
      description: ''
    },
        addFile(fileUrl) {
          this.save({file: fileUrl},{type: 'PUT'},
          {
          success: (file, response) => {
            console.log(file);
            this.trigger('change');
          }
      });
    },
});
