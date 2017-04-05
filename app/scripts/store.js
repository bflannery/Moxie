import Session from './Models/sessionModel';

import Clients from './Collections/clientsCollection';
import Client from './Models/clientModel';

import ClientFiles from './Collections/clientFilesCollection';
import ClientFile from './Models/clientFilesModel';

import Files from './Collections/filesCollection';
import File from './Models/fileModel';



export default {

  session : new Session(),

  clients : new Clients(),
  client : new Client(),

  clientFiles : new ClientFiles(),
  clientFile : new ClientFile(),

  files : new Files(),
  file : new File()

};
