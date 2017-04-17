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
            let responseURL = response.fileURL;
            let splitURL = responseURL.split('/');
            let folderURL = splitURL.slice(0,splitURL.length-1).join('/');
              console.log('create Client Folder passed');
              console.log('calling createClient');
              store.clients.create(
                {
                  clientName: clientName,
                  folderURL : folderURL
                },
                { success: (response)=> {
                    console.log('client created');
                    store.folder.addFolderToData(folderURL , clientName, response.id);
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
                let responseURL = response.fileURL;
                let splitURL = responseURL.split('/');
                let folderURL = splitURL.slice(0,splitURL.length-1).join('/');
                console.log(folderURL);

                  store.folder.addFolderToData(folderURL, folderName, clientName, clientId);
                    console.log('on success...')
                  },
              error: (response) => {
                    console.log('on fail...');
                  }
          });
        },

        // ----------------------------
        //Delete Client Folder and Client Files From File Storage
        // On Success , call detelClientFilesFromFilesCollection on Files Collection
        // If No Client Folder in file storage ...
        // ----------------------------

        deleteClientFolder(client) {
            $.ajax({
              type: 'DELETE',
              url: client.folderURL,
              success: () => {
                  console.log('client folder and files deleted from storage');
                  store.file.deleteClientFilesFromFiles(client);
              },
              error: (response) => {
                console.log(response);
                  if (response.responseText === '{"code":6000,"message":"File or directory cannot be found."}') {
                      console.log('client folder does not exist on storage');
                      store.file.deleteClientFilesFromFiles(client);

                  } else {
                      console.log('client folder and files not deleted from storage');
                  }
              }
          });
        }
  });
