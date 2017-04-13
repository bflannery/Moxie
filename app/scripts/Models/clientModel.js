import Backbone from 'backbone';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import store from '../store';

export default Backbone.Model.extend({
  urlRoot: 'https://api.backendless.com/v1/data/Clients',
    idAttribute: 'objectId',
    defaults: {
      clientName: '',
      addFolder: false,
      addFileModal : false,
      folderURL : ''
    },

// ----------------------------
// All File To ClientFiles Data Table
// Trigger Update To Client for ClientHome render
// Push to ClientHome
// ----------------------------


    addFileToClientFiles({id, name}) {
          this.set({addFileModal: false});
          this.save({
              clientFiles: this.get('clientFiles').concat([{
                ___class: 'ClientFiles',
                files: {
                  ___class: 'Files',
                  objectId: id,
                  name: name
                }
              }]),
            }, {
              success: (response) => {
                console.log(response);
                this.trigger('change');

              }
            });
          },

  // ----------------------------
  // All Folder To ClientFolders Data Table
  // Trigger Update To Client for ClientHome render
  // Push to ClientHome
  // ----------------------------

  addFolderToClientFolders(id, name) {
    console.log('made it to clientFolders');
    console.log(id);
    console.log(name);
    this.save({
        clientFolders: this.get('clientFolders').concat([{
          ___class: 'ClientFolders',
          folders: {
            ___class: 'Folders',
            objectId: id,
            name: name
          }
        }]),
      },
      {
        success: (response) => {
          console.log('added folder to clientFolders');
        this.trigger('change');
        store.session.set({addFolder: false});
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
        let newClientFiles = this.get('clientFiles').filter((clientFile, i, arr)=>{
          if(clientFileId !== clientFile.objectId) {
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


// ----------------------------
//Delete Client From Clients Table
// Triggers('change')
// ----------------------------


  deleteClientFromDataTable(clientId) {
    this.destroy ({ url: `https://api.backendless.com/v1/data/Clients/${clientId}`});
  },
});
