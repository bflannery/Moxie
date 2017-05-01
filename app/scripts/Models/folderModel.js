import {browserHistory} from 'react-router';
import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config';
import store from '../store';

export default Backbone.Model.extend({
    url: 'https://api.backendless.com/v1/data/Folders',
    idAttribute: 'objectId',
    defaults: {
        folderName: '',
        folderURL: '',
    },

    deleteClientFolder(client) {
      console.log(client);
      $.ajax({
        type: 'GET',
        url: 'https://api.backendless.com/v1/data/Folders'
      }).done((clientFoldersData)=> {
        let clientFolders = clientFoldersData.data;
        console.log(clientFolders.data);
        let newClientFolder = clientFolders.filter((clientFolder, i ,arr)=> {
          if(clientFolder.clientId !== client.objectId) {
            return true;
          } else {
            $.ajax({
              type: 'DELETE',
              url: `https://api.backendless.com/v1/data/Folders/${clientFolder.objectId}`,
              success: () => {
                console.log('folder deleted');
                store.clients.get(client.objectId).deleteClient(client);
              },
              error: ()=> {
                console.log('folder was not deleted');
              }

            });
          }
        });
      }).fail((xhr)=> {
        console.log('failed to get folders: ' , xhr);
      });
    },

    addSubFolder(clientName, clientId, subFolderName, subFolderURL) {
      this.save({
        folderURL : subFolderURL,
        folderName : subFolderName,
        clientName: clientName,
        clientId: clientId
      }).done((response)=>{
        console.log('added SubFolder');
        console.log(response);
        let client = store.clients.get(response.clientId);
        console.log(client);
        store.clients.get(response.clientId).addFolderToClientFolders(response.objectId, response.folderName, clientId);
      }).fail((xhr)=> {
        console.log('error: ' , xhr);
      });
    },

    deleteSubFolder(subFolderId, clientId, clientFolderId) {
      $.ajax({
          type: 'DELETE',
          url: `https://api.backendless.com/v1/data/Folders/${subFolderId}`,
          success: () => {
              console.log('deleted Folder From Table');
              store.clients.get(clientId).deleteFolderFromClient(clientFolderId);
          }
      });
    },

    addFileToSubFolder(fileId, fileURL, fileName, subFolderName, clientId) {
      console.log(fileId);
      console.log(fileURL);
      console.log(fileName);
      console.log(subFolderName);
      console.log(clientId);


        let folderFiles = this.get('folderFiles');
        this.save({
            folderFiles: folderFiles.concat([{
                ___class: 'FolderFiles',
                subFolderName: subFolderName,
                files: {
                    ___class: 'Files',
                    objectId: fileId,
                }
            }]),
        }, {
            success: (response) => {
              console.log('file added to folderFiles');
                store.files.trigger('change');
            },
            error: (xhr) => {
              console.log('error saving folderFile', xhr);
            }
        });
    },


  });



      // addClientFolder(folderURL , folderName, clientId) {
      //   console.log(clientId);
      //   this.save({
      //     folderURL : folderURL,
      //     folderName : folderName,
      //     clientId : clientId
      //   }).done((response)=>{
      //     console.log('added Client');
      //     console.log(response);
      //     this.trigger('change');
      //   }).fail((xhr)=> {
      //     console.log('error: ' , xhr);
      //   });
      // },
