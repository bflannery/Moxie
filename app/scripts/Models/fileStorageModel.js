import {browserHistory} from 'react-router';
import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config';
import store from '../store';

export default Backbone.Model.extend({
    url: 'https://api.backendless.com/v1/files/Moxie',
    idAttribute: 'objectId',
    defaults: {
        name: '',
    },

    createClientFolder(clientName) {
      let folder = 'moxie';
      let fd = new FormData();
      fd.append('upload', folder);
      $.ajax({
          type: 'POST',
          data: fd,
          processData: false,
          contentType: false,
          url: 'https://api.backendless.com/v1/files/Moxie/clients/' + clientName + '/' + 'moxie' ,
          headers: {
              'application-id': config.appId,
              'secret-key': config.secret,
              'application-type': 'REST'
          },
          success: (response) => {
            response = JSON.parse(response);
              console.log('create Client Folder passed');
              console.log('calling createClient');
              store.clients.create(
                {
                  clientName: clientName,
                  folderURL : response.fileUrl
                },
                { success: (response)=> {
                    console.log('client created');
                    store.folder.addFolderToData(response.fileUrl , clientName);
                }, error: ()=> {
                    console.log('client not created');
                }
              });
          },
              error: (response) => {
              console.log('create Client Folder failed')
              }
          });
        },

        createSubFolder(client, clientName, clientId, clientURL, folderName) {

          let fd = new FormData();
          fd.append('upload', client);

          $.ajax({
              type: 'POST',
              processData: false,
              contentType: false,
              data: fd,
              url: 'https://api.backendless.com/v1/files/Moxie/subFolders/' + folderName + '/moxie',
              headers: {
                  'application-id': config.appId,
                  'secret-key': config.secret,
                  'application-type': 'REST'
              },
              success: (response) => {
                response = JSON.parse(response);
                console.log(response);
                  store.folder.addFolderToData(response.fileURL, folderName, clientName, clientId);
                    console.log('on success...')
                  },
              error: (response) => {
                    console.log('on fail...');
                  }
          });
        }

  });
