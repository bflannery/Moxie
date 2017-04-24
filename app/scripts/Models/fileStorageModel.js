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
        }).done((response)=> {
              response = JSON.parse(response);
              let responseURL = response.fileURL;
              let splitURL = responseURL.split('/');
              let folderURL = splitURL.slice(0,splitURL.length-1).join('/');
              console.log('create Client Folder passed');
              console.log('calling createClient');
              store.clients.create({
                clientName: clientName,
                folderURL: folderURL
              },{
                success: (response) => {
                  console.log(response);
                  console.log('client created');
                  store.folder.addClientFolder(folderURL, clientName, response.id);
                },
                error: (xhr) => {
                  console.log('client not created: ', xhr);
            }
          });
        }).fail((xhr)=> {
          console.log('create client folder error ', xhr);
        });
      },



      uploadFile(file, fileName, clientId, clientName) {
        if(!clientId && !clientName) {
          let fd = new FormData();
          fd.append('upload', file);
          $.ajax({
              type: 'POST',
              data: fd,
              processData: false,
              contentType: false,
              url: 'https://api.backendless.com/v1/files/Moxie/' + fileName,
              success: (response) => {
                  console.log('success on files storage to Moxie...');
                  response = JSON.parse(response);
                  store.file.addFileToData(response.fileURL, fileName, clientId, clientName);
              },
              error: (response) => {
                  if (response.responseText === '{"code":6003,"message":"Unable to upload the file: file already exists"}') {
                      alert('File Already Exists');
                  } else {
                    console.log('ya messed up');
                  }

              }
          });

        } else {
          let fd = new FormData();
          fd.append('upload', file);
          $.ajax({
              type: 'POST',
              data: fd,
              processData: false,
              contentType: false,
              url: 'https://api.backendless.com/v1/files/Moxie/clients/' + clientName + '/' + fileName,
              success: (response) => {
                  console.log('success on files storage to Moxie/client:id...');
                  response = JSON.parse(response);
                  store.file.addFileToData(response.fileURL, fileName, clientId, clientName);
              },
              error: (response) => {
                  if (response.responseText === '{"code":6003,"message":"Unable to upload the file: file already exists"}') {
                      alert('File Already Exists');
                  }

              }
          });
        }
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
            }).done((response)=> {
              response = JSON.parse(response);
              let responseURL = response.fileURL;
              let splitURL = responseURL.split('/');
              let folderURL = splitURL.slice(0,splitURL.length-1).join('/');
              console.log('subFolder created');
              store.folder.addFolderToData(folderURL, folderName, clientName, clientId);
            }).fail((xhr)=> {
              console.log('subFoler error: ', xhr);
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
            }).done((response) => {
                  console.log('client folder and files deleted from storage');
                  store.file.deleteClientFilesFromFiles(client);
              }).fail((response, xhr)=> {
                  if (response.responseText === '{"code":6000,"message":"File or directory cannot be found."}') {
                      console.log('client folder does not exist on storage');
                      store.file.deleteClientFilesFromFiles(client);

                  } else {
                      console.log('client folder and files not deleted from storage');
                  }
              });
            },

            // ----------------------------
            // Delete File From Client Folder in File Storage
            // On Success , call deleteFileFromDataTable
            // ----------------------------

            deleteFileFromStorage(objectId, fileUrl, clientId, clientFileId) {
                $.ajax({
                    type: 'DELETE',
                    url: fileUrl,
                    success: () => {
                      console.log('deleted File From Storage');
                      store.file.deleteFileFromDataTable(objectId, clientId, clientFileId);
                    },
                    error: (xhr) => {
                      console.log('error deleting from storage ', xhr);
                    }
                });
            },

  });
