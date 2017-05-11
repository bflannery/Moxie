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

    deleteClientFolder(clientFolder) {
      $.ajax({
        type: 'DELETE',
        url: `https://api.backendless.com/v1/data/Folders/${clientFolder.folders.objectId}`,
        success: () => {
          console.log('clientFolder deleted from Folders ');
          window.location.reload();
        },
        error: () => {
          console.log('clientFolder NOT deleted from Folders');
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
