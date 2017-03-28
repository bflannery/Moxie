import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config';
import {browserHistory} from 'react-router';
import store from '../store';

export default Backbone.Model.extend({
  url: 'https://api.backendless.com/v1/data/Files',
    idAttribute: 'objectId',
    defaults: {
      name: '',
      description: ''
    },


//Dropzone Upload to Backendless File Storage
//On Success call addFileToData
uploadFile(file, fileName, clientId, clientName) {
    let fd = new FormData();
      fd.append('upload', file);
      $.ajax({
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        url: 'https://api.backendless.com/v1/files/Moxie/' + clientName + '/' + fileName,
        headers: {
          'application-id': config.appId,
          'secret-key': config.secret,
          'application-type': 'REST'
        },
        success: (response)=>{
          response = JSON.parse(response);
          this.addFileToData(response.fileURL, fileName, clientId, clientName);
        },
        error: (response) => {
          if(response.responseText === '{"code":6003,"message":"Unable to upload the file: file already exists"}') {
            alert('File Already Exists');
          }

        }
      });
    },

//Create table location for file to link with clientFiles
    addFileToData(fileUrl, file, clientId, clientName) {
      $.ajax({
        type: 'POST',
        url: 'https://api.backendless.com/v1/data/Files',
        contentType: 'application/json',
        data: JSON.stringify({fileUrl, file, clientId, clientName}),
        success: (file)=> {
          store.clients.get(file.clientId).addFileToClient({id: file.objectId, name: file.file});
          this.trigger('change');
        }
      });
  },

    deleteFile(objectId) {
    this.destroy ({ url: `https://api.backendless.com/v1/data/Files/${objectId}`});
  },
});
