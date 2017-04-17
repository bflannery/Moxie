import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config';
import { browserHistory } from 'react-router';
import store from '../store';

export default Backbone.Model.extend({
    url: 'https://api.backendless.com/v1/data/Files',
    idAttribute: 'objectId',
    defaults: {
        fileName: '',
        description: '',
    },


    // ----------------------------
    // Dropzone Upload to Backendless File Storage
    // On Success call addFileToData
    // Alert File Exists if Response Code 6003
    // ----------------------------

    uploadFile(file, fileName, clientId, clientName) {
      if(!clientId && !clientName) {
        let fd = new FormData();
        fd.append('upload', file);
        $.ajax({
            type: 'POST',
            data: fd,
            processData: false,
            contentType: false,
            url: 'https://api.backendless.com/v1/files/Moxie/' + fileName,
            headers: {
                'application-id': config.appId,
                'secret-key': config.secret,
                'application-type': 'REST'
            },
            success: (response) => {
                console.log('success on files storage to Moxie...');
                response = JSON.parse(response);
                this.addFileToData(response.fileURL, fileName, clientId, client);
            },
            error: (response) => {
                if (response.responseText === '{"code":6003,"message":"Unable to upload the file: file already exists"}') {
                    alert('File Already Exists');
                } else {
                  console.log('ya messed up');
                }

            }
        });

      } else {
        let fd = new FormData();
        fd.append('upload', file);
        $.ajax({
            type: 'POST',
            data: fd,
            processData: false,
            contentType: false,
            url: 'https://api.backendless.com/v1/files/Moxie/clients/' + clientName + '/' + fileName,
            headers: {
                'application-id': config.appId,
                'secret-key': config.secret,
                'application-type': 'REST'
            },
            success: (response) => {
                console.log('success on files storage to Moxie/client:id...');
                response = JSON.parse(response);
                this.addFileToData(response.fileURL, fileName, clientId, clientName);
            },
            error: (response) => {
                if (response.responseText === '{"code":6003,"message":"Unable to upload the file: file already exists"}') {
                    alert('File Already Exists');
                }

            }
        });
      }
    },

    // ----------------------------
    // Add File To All Files Table
    // On Success, call AddFileToClientFiles on Clients Collections
    // Trigger Change on File Model
    // ----------------------------

    addFileToData(fileUrl, fileName, clientId, folderName) {
      console.log(clientId);
      if(clientId) {
        $.ajax({
            type: 'POST',
            url: 'https://api.backendless.com/v1/data/Files',
            contentType: 'application/json',
            data: JSON.stringify({
                fileUrl,
                fileName,
                clientId,
                folderName
            }),
            success: (response) => {
              console.log('addFileToData success response: ' + response );
                console.log('on file to data success with clientId...')
                store.clients.get(response.clientId).addFileToClientFiles({
                    fileId: response.objectId,
                    folderName: response.folderName
                });
            }
        });

      } else {
        $.ajax({
            type: 'POST',
            url: 'https://api.backendless.com/v1/data/Files',
            contentType: 'application/json',
            data: JSON.stringify({
                fileUrl,
                fileName,
            }),
            success: (response) => {
                console.log('on file to data success without clientId...');

      }
    });
  }
    },

    // ----------------------------
    // Delete File From Client Folder in File Storage
    // On Success , call deleteFileFromDataTable
    // ----------------------------

    deleteFileFromStorage(objectId, fileUrl, clientId, clientFileId) {
        $.ajax({
            type: 'DELETE',
            url: fileUrl,
            success: () => {
                console.log('deleted File From Storage');
                this.deleteFileFromDataTable(objectId, clientId, clientFileId);
            }
        });
    },

    // ----------------------------
    // Delete File From Data Files Table
    // On Success, call deleteFileFromClients on Clients Collections
    // ----------------------------


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


    // ----------------------------
    //Delete Client Files From Files Table
    //On Success, call deleteClientFilesFromClientFilesCollection on Client Files Collection
    //If no client files in file collection ...
    // ----------------------------

    deleteClientFilesFromFiles(client) {
      console.log(client);
        if(client.clientFiles.length > 0) {
        $.ajax({
            type: 'GET',
            url: 'https://api.backendless.com/v1/data/Files',
            success: (files) => {
              console.log(files);
                let newTotalFiles = files.data.filter((file, i, arr) => {
                    if (file.clientId != client.objectId) {
                        return true;
                    } else {
                        if (!file) {
                            console.log('no files for client exists in collection');
                        } else {
                            $.ajax({
                                type: 'DELETE',
                                url: `https://api.backendless.com/v1/data/Files/${file.objectId}`,
                                success: (response) => {
                                  console.log(response);
                                    console.log('file deleted from files collection');
                                    console.log('calling deleteClientFolderFromFolderCollection from success');
                                    store.clientFile.deleteClientFiles(client);
                                }
                            });
                        }
                    }
                });
            }
        });
    } else {
      console.log('object length is < 0')
      console.log('calling deleteClientFolderFromFolderCollection from else statement');
      store.clientFile.deleteClientFiles(client);
    }
  }
});
