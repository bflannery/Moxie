import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config';
import {
  browserHistory
} from 'react-router';
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
    if (clientId) {
      store.files.create({
        fileName: fileName,
        fileURL: fileURL,
        folderName: folderName
      }, {
        success: (response) => {
          console.log('file created');
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
        console.log('subFile data success');
        let subFolder = store.folders.get(response.folderId);
        store.folders.get(response.folderId).addFileToSubFolder(response.objectId, fileURL, fileName, folderName, folderId, clientId);

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
    if (!client.clientFolders || client.clientFolders.length === 0) {
      console.log('clientFolders is null or 0');
      console.log('calling deleteClient');
      store.clients.get(client.objectId).deleteClient(client);
    } else {
      let newClientFolders = client.clientFolders.map((clientFolder, i, arr) => {
        console.log(clientFolder);
        if (clientFolder.folders.folderFiles.length > 0) {
          let newClientFiles = clientFolder.folders.folderFiles.map((folderFile, i, arr) => {
            console.log(folderFile);
            $.ajax({
              type: 'DELETE',
              url: `https://api.backendless.com/v1/data/Files/${folderFile.files.objectId}`,
              success: () => {
                $.ajax({
                  type: 'DELETE',
                  url: `https://api.backendless.com/v1/data/FolderFiles/${folderFile.objectId}`,
                  success: () => {
                    $.ajax({
                      type: 'DELETE',
                      url: clientFolder.folders.folderURL,
                      success: () => {
                        console.log('clientFolder deleted from File Storage');
                        $.ajax({
                          type: 'DELETE',
                          url: `https://api.backendless.com/v1/data/Folders/${clientFolder.folders.objectId}`,
                          success: () => {
                            console.log('clientFolder deleted from Folders');
                            $.ajax({
                              type: 'DELETE',
                              url: `https://api.backendless.com/v1/data/ClientFolders/${clientFolder.objectId}`,
                              success: (response) => {
                                console.log(response);
                                console.log('clientFolder deleted from ClientFolders');
                                store.clients.get(client.objectId).deleteClient(client);
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          });
        } else {
          $.ajax({
            type: 'DELETE',
            url: clientFolder.folders.folderURL,
            success: () => {
              console.log('clientFolder deleted from File Storage');
              $.ajax({
                type: 'DELETE',
                url: `https://api.backendless.com/v1/data/Folders/${clientFolder.folders.objectId}`,
                success: () => {
                  console.log('clientFolder deleted from Folders');
                  $.ajax({
                    type: 'DELETE',
                    url: `https://api.backendless.com/v1/data/ClientFolders/${clientFolder.objectId}`,
                    success: (response) => {
                      console.log(response);
                      console.log('clientFolder deleted from ClientFolders');
                      store.clients.get(client.objectId).deleteClient(client);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  },



  deleteSubFolderFiles(clientFolder) {
    console.log(clientFolder);
    if(!clientFolder.folders.folderFiles || clientFolder.folders.folderFiles.length === 0) {
      console.log('clientFiles is null or 0');
      console.log('calling deleteClientFolder');
      $.ajax({
        type: 'DELETE',
        url: `https://api.backendless.com/v1/data/ClientFolders/${clientFolder.objectId}`,
        success: () => {
          console.log('clientFolder deleted from ClientFolders');
          store.folders.get(clientFolder.folders.objectId).deleteClientFolder(clientFolder);
        }
      });
    } else {
      if (clientFolder.folders.folderFiles.length > 0) {
        let newClientFiles = clientFolder.folders.folderFiles.map((folderFile, i, arr) => {
          console.log(folderFile);
          $.ajax({
            type: 'DELETE',
            url: `https://api.backendless.com/v1/data/Files/${folderFile.files.objectId}`,
            success: () => {
              console.log('clientFiles deleted from Files');
              $.ajax({
                type: 'DELETE',
                url: `https://api.backendless.com/v1/data/FolderFiles/${folderFile.objectId}`,
                success: () => {
                  console.log('clientFolderFiles deleted from FolderFiles')
                      $.ajax({
                        type: 'DELETE',
                        url: `https://api.backendless.com/v1/data/Folders/${clientFolder.folders.objectId}`,
                        success: () => {
                          console.log('clientFolder deleted from Folders');
                          $.ajax({
                            type: 'DELETE',
                            url: `https://api.backendless.com/v1/data/ClientFolders/${clientFolder.objectId}`,
                            success: (response) => {
                              console.log(response);
                              console.log('clientFolder deleted from ClientFolders');
                              store.folders.trigger('change');
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
        });
      } else {
        $.ajax({
          type: 'DELETE',
          url: `https://api.backendless.com/v1/data/Folders/${clientFolder.folders.objectId}`,
          success: () => {
            console.log('clientFolder deleted from Folders');
            $.ajax({
              type: 'DELETE',
              url: `https://api.backendless.com/v1/data/ClientFolders/${clientFolder.objectId}`,
              success: (response) => {
                console.log(response);
                console.log('clientFolder deleted from ClientFolders');
              }
            });
          }
        });
      }
    }
  },

  deleteFolderFile(folderFile) {
    console.log(folderFile);
    $.ajax({
      type: 'DELETE',
      url: `https://api.backendless.com/v1/data/Files/${folderFile.files.objectId}`,
      success: () => {
        console.log('Folder File deleted from Files');
        $.ajax({
          type: 'DELETE',
          url: `https://api.backendless.com/v1/data/FolderFiles/${folderFile.objectId}`,
          success: () => {
            console.log('FolderFile deleted from FolderFiles');
          }
        });
      }
    });

  }
});
