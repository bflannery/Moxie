import Backbone from 'backbone';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import store from '../store';

export default Backbone.Model.extend({
  url: 'https://api.backendless.com/v1/data/ClientFolders',
  idAttribute: 'objectId',


  deleteClientFolder(client) {
  console.log(client);
  if(client.clientFolders > 0) {
    let emptyClientFolder = client.clientFolders.forEach((clientFolder, i, arr)=> {
    $.ajax({
      type: 'DELETE',
      url: `https://api.backendless.com/v1/data/ClientFolders/${clientFolders.objectId}`,
      success: (response) => {
        console.log('file deleted, response: ' , response);
      },
      error: (xhr)=>{
        console.log('file delete error: ', xhr);
      }
    });
  });
} else {
  console.log('no clientFolders, calling deleteClient');
  store.clients.get(client.objectId).deleteClient(client);
}
}
  });
