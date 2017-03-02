import Session from './Models/sessionModel';

import Clients from './Collections/clientsCollection';
import Client from './Models/clientModel';

import Files from './Collections/filesCollection';
import File from './Models/fileModel';


export default {

  session : new Session(),

  clients : new Clients(),
  client : new Client(),

  files : new Files(),
  file : new File()


};
