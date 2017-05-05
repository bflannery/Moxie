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
                  response = response.toJSON();
                  console.log(response);
                  console.log('client created');
                  window.localStorage.setItem('clientName' , response.clientName);
                  window.localStorage.setItem('objectId' , response.objectId);
                  browserHistory.push(`clients/${response.objectId}`);
                  store.clients.trigger('change');
                },
                error: (xhr) => {
                  console.log('client not created: ', xhr);
            }
          });
        }).fail((xhr)=> {
          console.log('create client folder error ', xhr);
        });
      },
      

      uploadSubFile(file, fileName, folderId, folderName, clientId) {
        console.log(clientId);
        let fd = new FormData();
        fd.append('upload', file);
        $.ajax({
            type: 'POST',
            data: fd,
            processData: false,
            contentType: false,
            url: 'https://api.backendless.com/v1/files/Moxie/subFolders/' + folderName  + '/' + fileName,
            success: (response) => {
                console.log('success on files storage to subFolder...');
                response = JSON.parse(response);
                console.log(response);
                store.file.addSubFileToData(response.fileURL, fileName, folderId, folderName, clientId);
            },
            error: (response) => {
                if (response.responseText === '{"code":6003,"message":"Unable to upload the file: file already exists"}') {
                    alert('File Already Exists');
                } else {
                  console.log('ya messed up');
                }

            }
        });

      },

    createSubFolder(clientName, clientId, subFolderName) {
          $.ajax({
              type: 'POST',
              contentType: 'multipart/form-data',
              data: JSON.stringify({ subFolderName }),
              url: 'https://api.backendless.com/v1/files/Moxie/subFolders/' + subFolderName + '/moxie',
            }).done((response)=> {
              response = JSON.parse(response);
              let responseURL = response.fileURL;
              let splitURL = responseURL.split('/');
              let subFolderURL = splitURL.slice(0,splitURL.length-1).join('/');
              console.log('subFolder created');
              store.folder.addSubFolder(clientName, clientId, subFolderName, subFolderURL);
            }).fail((xhr)=> {
              console.log('subFoler error: ', xhr);
            });
        },

        // ----------------------------
        //Delete Client Folder and Client Files From File Storage
        // On Success , call detelClientFilesFromFilesCollection on Files Collection
        // If No Client Folder in file storage ...
        // ----------------------------

        deleteFolderFromStorage(subFolderId, subFolderURL, clientId, clientFolderId) {
            $.ajax({
                type: 'DELETE',
                url: subFolderURL,
                success: () => {
                  console.log('deleted subFolder From Storage');
                  store.folder.deleteSubFolder(subFolderId, clientId, clientFolderId);
                },
                error: (xhr) => {
                  console.log('error deleting from storage ', xhr);
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

            deleteClientFolder(client) {
              $.ajax({
                  type: 'DELETE',
                  url: client.folderURL,
                  success: () => {
                    console.log('deleted ClientFolder From Storage');
                    store.file.deleteClientFilesFromFiles(client);
                  },
                  error: (xhr) => {
                    console.log('error deleting from storage ', xhr);
                  }
              });

          }

  });
