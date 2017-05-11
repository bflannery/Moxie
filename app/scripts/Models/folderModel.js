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

    addFileToSubFolder(fileId, fileURL, fileName, subFolderName, subFolderId, clientId) {
      let folderFiles;
      if(this.get('folderFiles')) {
        folderFiles = this.get('folderFiles').concat([
          {
            ___class: 'FolderFiles',
            folderName: subFolderName,
            files: {
                ___class: 'Files',
                objectId: fileId,
            }
          }
        ]);
      } else {
        folderFiles = (
          {
            ___class: 'FolderFiles',
            folderName: subFolderName,
            files: {
                ___class: 'Files',
                objectId: fileId,
            }
          }
        );
      }
      $.ajax({
        type: 'PUT',
          url: `https://api.backendless.com/v1/data/Folders/${subFolderId}`,
          contentType: 'application/json',
          data: JSON.stringify({
              folderFiles
          }),
          success: (response) => {
            console.log('added folder to clientFiles');
            console.log(response);
            window.location.reload();
            console.log('triggered');

          },
          error: () => {
              console.log('not added');
          }
      });
    }

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
