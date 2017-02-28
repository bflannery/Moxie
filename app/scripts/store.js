import Session from './Models/sessionModel';
import Clients from './Collections/clientsCollection';
import Client from './Models/clientModel';


export default {

  session : new Session(),
  clients : new Clients(),

};
