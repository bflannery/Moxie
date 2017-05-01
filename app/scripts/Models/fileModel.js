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
    },

    // ----------------------------
    // Add File To All Files Table
    // On Success, call AddFileToClientFiles on Clients Collections
    // Trigger Change on File Model
    // ----------------------------

    addFileToData(fileURL, fileName, folderName) {
      console.log(clientId);
      if(clientId) {
        store.files.create({
          fileName: fileName,
          fileURL: fileURL,
          folderName : folderName
        }, {
          success: (response) => {
            console.log ('file created');
            console.log(response);
            store.clients.get(clientId).addFileToClientFiles(response.id, folderName);

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

    addSubFileToData(fileURL, fileName, folderId, folderName, clientId) {
      $.ajax({
          type: 'POST',
          url: 'https://api.backendless.com/v1/data/Files',
          contentType: 'application/json',
          data: JSON.stringify({
              fileURL,
              fileName,
              folderId,
              folderName,
              clientId
          }),
          success: (response) => {
              console.log('on subFile data success');
              let subFolder = store.folders.get(response.folderId);
              console.log(subFolder);
              store.folders.get(response.folderId).addFileToSubFolder(response.objectId, fileURL, fileName, folderName, clientId);

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
        if(client.clientFolders === null || client.clientFolders.length === 0) {
          console.log('client folders null or < 0');
          console.log('calling deleteClientFolder');
            store.clientFolder.deleteClientFolder(client);
          } else {
                $.ajax({
                    type: 'GET',
                    url: 'https://api.backendless.com/v1/data/Files',
                    success: (files) => {
                      console.log(files);
                        let newTotalFiles = files.data.filter((file, i, arr) => {
                            if (file.clientId != client.objectId) {
                                return true;
                            } else {
                                $.ajax({
                                  type: 'DELETE',
                                    url: `https://api.backendless.com/v1/data/Files/${file.objectId}`,
                                    success: (response) => {
                                      console.log(response);
                                        console.log('file deleted from files collection');
                                        console.log('calling deleteClientFolderFromFolderCollection from success');
                                        store.folderFile.deleteClientFolderFiles(client);
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


// $.ajax({
//     type: 'POST',
//     url: 'https://api.backendless.com/v1/data/Files',
//     contentType: 'application/json',
//     data: JSON.stringify({
//         fileUrl,
//         fileName,
//         folderName
//     }),
//     success: (response) => {
//       console.log('addFileToData success response: ', response );
//         console.log('on file to data success with clientId...');
//         store.clients.get(clientId).addFileToClientFiles(response.objectId,response.folderName);
//         store.files.trigger('change');
//       },
//     error: (xhr) => {
//       console.log('error adding file to data table: ', xhr);
//     }
//   });
