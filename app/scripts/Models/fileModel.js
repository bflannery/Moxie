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



    // ----------------------------
    // Add File To All Files Table
    // On Success, call AddFileToClientFiles on Clients Collections
    // Trigger Change on File Model
    // ----------------------------

    addFileToData(fileUrl, fileName, clientId, folderName) {
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
              console.log('addFileToData success response: ', response );
                console.log('on file to data success with clientId...')
                store.clients.get(response.clientId).addFileToClientFiles(response.objectId,response.folderName);
                store.files.trigger('change');
              },
            error: (xhr) => {
              console.log('errod adding file to data table: ', xhr);
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
        if(client.clientFiles === null || client.clientFiles.length < 0) {
          console.log('client files null or < 0');
          console.log('calling deleteClientFolder');
            store.folder.deleteClientFolder(client);
          } else {
                $.ajax({
                    type: 'GET',
                    url: 'https://api.backendless.com/v1/data/Files',
                    success: (files) => {
                        let newTotalFiles = files.data.filter((file, i, arr) => {
                            if (file.clientId != client.objectId) {
                                return true;
                            } else {
                                $.ajax({
                                  type: 'DELETE',
                                    url: `https://api.backendless.com/v1/data/Files/${file.objectId}`,
                                    success: (response) => {
                                        console.log('file deleted from files collection');
                                        console.log('calling deleteClientFolderFromFolderCollection from success');
                                        store.clientFile.deleteClientFiles(client);
                                      }
                                    });
                                  }
                                });
                              },
                              error: () => {
                                console.log('did not get files');
                              }
                            });
                          }
                        }

});
