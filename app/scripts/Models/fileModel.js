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
//Alert File Exists if Response Code 6003

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


// Add File To All Files Table
// On Success, call AddFileToClientFiles on Clients Collections
// Trigger Change on File Model

  addFileToData(fileUrl, file, clientId, clientName) {
    $.ajax({
      type: 'POST',
      url: 'https://api.backendless.com/v1/data/Files',
      contentType: 'application/json',
      data: JSON.stringify({fileUrl, file, clientId, clientName}),
      success: (file)=> {
        store.clients.get(file.clientId).addFileToClientFiles({id: file.objectId, name: file.file});
      }
    });
  },

// Delete File From Data Table
// On Success, call deleteFileFromClients on Clients Collections

deleteFileFromDataTable(objectId, clientId, clientFileId) {
  $.ajax({
    type: 'DELETE',
    url: `https://api.backendless.com/v1/data/Files/${objectId}`,
    success: () => {
      console.log('deleted File From Table');
      store.clients.get(clientId).deleteFileFromClient(clientFileId);
      }
    });
  },

  // Call deleteFileFromClient on Clients Collections
  // Delete File from File Storage and Files Data Table

    deleteFileFromStorage(objectId, fileUrl, clientId, clientFileId) {
      $.ajax({
        type: 'DELETE',
        url: fileUrl,
        success: () => {
          console.log('deleted File From Storage');
          this.deleteFileFromDataTable(objectId, clientId, clientFileId);
        }
    });
  }
});
