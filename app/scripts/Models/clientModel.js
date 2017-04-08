import Backbone from 'backbone';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import store from '../store';

export default Backbone.Model.extend({
  urlRoot: 'https://api.backendless.com/v1/data/Clients',
    idAttribute: 'objectId',
    defaults: {
      name: '',
      description: '',
      addFolder: false,
      addFileModal : false
    },

//All File To ClientFiles Data Table
// Trigger Update To Client for ClientHome render
// Push to ClientHome
    addFileToClientFiles({id, name}) {
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
              success: (client, response) => {
                this.set({addFileModal: false});
                this.trigger('change');

              }
            });
          },

  // Delete File From ClientFiles Data Table
  // Update ClientFiles Table
  // On Success, Trigger Update Change
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



//Delete Client From Clients Table
// On Succes, call deleteClientFromStorage

  deleteClientFromDataTable(clientName, clientId) {
    this.destroy ({ url: `https://api.backendless.com/v1/data/Clients/${clientId}`});
  },
});
