import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config';
import { browserHistory } from 'react-router';
import store from '../store';

export default Backbone.Model.extend({
    url: 'https://api.backendless.com/v1/data/Files',
    idAttribute: 'objectId',
    defaults: {
        name: '',
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
                let client = 'moxie';
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
            url: 'https://api.backendless.com/v1/files/Moxie/' + clientName + '/' + fileName,
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

    addFileToData(fileUrl, file, clientId, clientName) {
      if(clientId) {
        $.ajax({
            type: 'POST',
            url: 'https://api.backendless.com/v1/data/Files',
            contentType: 'application/json',
            data: JSON.stringify({
                fileUrl,
                file,
                clientId,
                clientName
            }),
            success: (file) => {
                console.log('on file to data success with clientId...')
                store.clients.get(file.clientId).addFileToClientFiles({
                    id: file.objectId,
                    name: file.file
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
                file,
                clientName
            }),
            success: (file) => {
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
    //Delete Client Folder and Client Files From File Storage
    // On Success , call detelClientFilesFromFilesCollection on Files Collection
    // If No Client Folder in file storage ...
    // ----------------------------

    deleteClientFolderFromStorage(clientName, clientId, clientFiles) {
        $.ajax({
            type: 'DELETE',
            url: 'https://api.backendless.com/v1/files/Moxie/' + clientName,
            success: () => {
                console.log('client folder and files deleted from storage');
                console.log('calling deleteClientFilesFromFilesCollection');
                store.clientFile.deleteClientFilesFromClientFilesCollection(clientId, clientFiles);
            },
            error: (response) => {
                console.log(response.responseText);
                if (response.responseText === '{"code":6000,"message":"File or directory cannot be found."}') {
                    console.log('client folder does not exist on storage');
                    console.log('calling deleteClientFilesFromFilesCollection')
                    store.clientFile.deleteClientFilesFromClientFilesCollection(clientId, clientFiles);
                } else {
                    console.log('client folder and files not deleted from storage');
                }
            }
        });
    },

    // ----------------------------
    //Delete Client Files From Files Table
    //On Success, call deleteClientFilesFromClientFilesCollection on Client Files Collection
    //If no client files in file collection ...
    // ----------------------------

    deleteClientFilesFromAllFilesCollection(clientId, fileObject) {
        if(fileObject.length > 0) {
        $.ajax({
            type: 'GET',
            url: 'https://api.backendless.com/v1/data/Files',
            success: (allFiles) => {
                let newTotalFiles = allFiles.data.filter((file, i, arr) => {
                    if (file.clientId != clientId) {
                        return true;
                    } else {
                        if (!file) {
                            console.log('no files for client exists in collection');
                        } else {
                            $.ajax({
                                type: 'DELETE',
                                url: `https://api.backendless.com/v1/data/Files/${file.objectId}`,
                                success: (response) => {
                                    console.log('file deleted from files collection');
                                    console.log('calling deleteClientFromClientCollection from success')
                                    store.clients.get(clientId).deleteClientFromDataTable(clientId);
                                }
                            });
                        }
                    }
                });
            }
        });
    } else {
      console.log('object length is < 0')
      console.log('calling deleteClientFromDataTable from else statement');
      store.clients.get(clientId).deleteClientFromDataTable(clientId);
    }
  }
});
