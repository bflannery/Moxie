import Backbone from 'backbone';
import $ from 'jquery';
import {
    browserHistory
} from 'react-router';
import store from '../store';

export default Backbone.Model.extend({
    url: 'https://api.backendless.com/v1/data/Clients',
    idAttribute: 'objectId',
    defaults: {
        clientName: '',
        addFolder: false,
        addFileModal: false,
        addPhoto: false,
        folderURL: ''
    },



    // ----------------------------
    // All File To ClientFiles Data Table
    // Trigger Update To Client for ClientHome render
    // Push to ClientHome
    // ----------------------------


    addFileToClientFiles(fileId, folderName) {
        this.set({
            addFileModal: false
        });
        this.save({
            clientFiles: this.get('clientFiles').concat([{
                ___class: 'ClientFiles',
                folderName: folderName,
                files: {
                    ___class: 'Files',
                    objectId: fileId,
                }
            }]),
        }, {
            success: (response) => {
              console.log('file added to clientFiles');
                store.files.trigger('change');
            },
            error: (xhr) => {
              console.log('error saving clientFile', xhr);
            }
        });
    },

    // ----------------------------
    // All Folder To ClientFolders Data Table
    // Trigger Update To Client for ClientHome render
    // Push to ClientHome
    // ----------------------------

    addFolderToClientFolders(subFolderId, folderName, clientId) {
      console.log(clientId);
      let clientFolders;
      if(this.get('clientFolders')) {
          clientFolders = this.get('clientFolders').concat([
            {
              ___class: 'ClientFolders',
              folderName: folderName,
              folders: {
                  ___class: 'Folders',
                  objectId: subFolderId,
                }

            }]);
        } else {
          clientFolders = [{
            ___class: 'ClientFolders',
            folderName: folderName,
            folders: {
                ___class: 'Folders',
                objectId: subFolderId,
              }
          }];
        }
        $.ajax({
          type: 'PUT',
            url: `https://api.backendless.com/v1/data/Clients/${clientId}`,
            contentType: 'application/json',
            data: JSON.stringify({
                clientFolders
            }),
            success: (response) => {
              console.log('added folder to clientFolders');
                this.trigger('change');
                store.session.set({
                    addFolder: false
                });
                browserHistory.push('/folders/' + subFolderId);

            },
            error: () => {
                console.log('not added');
            }
        });
    },

    // ----------------------------
    // Delete File From ClientFiles Data Table
    // Update ClientFiles Table
    // ----------------------------


    deleteFileFromClient(clientFileId) {
        let newClientFiles = this.get('clientFiles').filter((clientFile, i, arr) => {
            if (clientFileId !== clientFile.objectId) {
                return true;
            }
        });
        this.save({
            clientFiles: newClientFiles
        }, {
            success: () => {
                $.ajax({
                    type: 'DELETE',
                    url: `https://api.backendless.com/v1/data/ClientFiles/${clientFileId}`,
                    success: () => {
                        console.log('deleted from ClientFiles')
                    },
                    error: () => {
                        console.log('not deleted from ClientFiles');
                    }
                });
            }
        });
    },

    deleteFolderFromClient(clientFolderId) {
        let newClientFolders = this.get('clientFolders').filter((clientFolder, i, arr) => {
            if (clientFolderId !== clientFolder.objectId) {
                return true;
            }
        });
        this.save({
            clientFolders: newClientFolders
        }, {
            success: () => {
                $.ajax({
                    type: 'DELETE',
                    url: `https://api.backendless.com/v1/data/ClientFolders/${clientFolderId}`,
                    success: () => {
                        console.log('deleted from ClientFolders');
                    },
                    error: () => {
                        console.log('not deleted from ClientFolders');
                    }
                });
            }
        });
    },



    // ----------------------------
    //Delete Client From Clients Table
    // Triggers('change')
    // ----------------------------

    deleteClient(client) {
      console.log(client);
      this.destroy({url: `https://api.backendless.com/v1/data/Clients/${client.objectId}`},
        {
            success: () => {
                console.log('client deleted!');
            },
            error: () => {
                console.log('client was NOT deleted!');
            }
        });
    },


    getItems() {
      let allItems = [];
      let files = this.attributes.clientFiles.map((clientFile, i, arr)=>{
          allItems.concat(clientFile);
          return true;
      });
      console.log(allItems);
    }
});
