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

    upload(filesArr) {
    let fd = new FormData();
    let files = filesArr.map((file, i) => {
      fd.append('upload', filesArr[i]);
      $.ajax({
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        url: 'https://api.backendless.com/v1/files/Moxie/'+filesArr[i].name,
        success: (response)=>{
          response = JSON.parse(response);
          console.log(response);
          this.addFile(response.fileURL);
        }
      });
    });
  },

    deleteFile(objectId) {
      this.destroy({objectId});
    },

    addFile(fileUrl) {
      console.log(fileUrl);
      this.save({file: fileUrl}, {type: 'PUT'});
    }
});
