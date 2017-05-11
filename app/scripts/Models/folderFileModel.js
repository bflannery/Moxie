import {browserHistory} from 'react-router';
import Backbone from 'backbone';
import $ from 'jquery';
import config from '../config';
import store from '../store';

export default Backbone.Model.extend({
    url: 'https://api.backendless.com/v1/data/FolderFiles',
    idAttribute: 'objectId',
    defaults: {
      name: ''
    },


  deleteClientFolderFiles(client) {
    console.log(client);
  }
  });

//   if(client.foldersFiles.length > 0) {
//     let emptyClientFolder = client.folderFiles.forEach((clientFolder, i, arr)=> {
//     $.ajax({
//       type: 'DELETE',
//       url: `https://api.backendless.com/v1/data/folderFiles/${clientFolder.objectId}`,
//       success: (response) => {
//         console.log('file deleted, response: ' , response);
//         store.client.deleteClient(client);
//       },
//       error: (xhr)=>{
//         console.log('file delete error: ', xhr);
//       }
//     });
//   });
// } else {
//   console.log('no folderFiles, calling deleteClient');
//   store.clients.get(client.objectId).deleteClient(client);
// }
// }
