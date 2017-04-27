import Session from './Models/sessionModel';

import Clients from './Collections/clientsCollection';
import Client from './Models/clientModel';

import ClientFiles from './Collections/clientFilesCollection';
import ClientFile from './Models/clientFilesModel';

import ClientFolders from './Collections/clientFoldersCollection';
import ClientFolder from './Models/clientFolderModel';

import Files from './Collections/filesCollection';
import File from './Models/fileModel';

import Folders from './Collections/foldersCollection';
import Folder from './Models/folderModel';

import fileStorage from './Collections/fileStorageCollection';
import fileStore from './Models/fileStorageModel';



export default {

  session : new Session(),

  clients : new Clients(),
  client : new Client(),

  clientFiles : new ClientFiles(),
  clientFile : new ClientFile(),

  clientFolders : new ClientFolders(),
  clientFolder : new ClientFolder(),

  files : new Files(),
  file : new File(),

  folders : new Folders(),
  folder : new Folder(),

  fileStorage : new fileStorage(),
  fileStore : new fileStore()

};
