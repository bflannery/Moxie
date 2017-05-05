import Session from './Models/sessionModel';

import Clients from './Collections/clientsCollection';
import Client from './Models/clientModel';

import ClientFolders from './Collections/clientFoldersCollection';
import ClientFolder from './Models/clientFolderModel';

import Files from './Collections/filesCollection';
import File from './Models/fileModel';

import FolderFiles from './Collections/folderFilesCollection';
import FolderFile from './Models/folderFileModel';

import Folders from './Collections/foldersCollection';
import Folder from './Models/folderModel';

import fileStorage from './Collections/fileStorageCollection';
import fileStore from './Models/fileStorageModel';



export default {

  session : new Session(),

  clients : new Clients(),
  client : new Client(),

  clientFolders : new ClientFolders(),
  clientFolder : new ClientFolder(),

  files : new Files(),
  file : new File(),

  folderFiles: new FolderFiles(),
  folderFile: new FolderFile(),

  folders : new Folders(),
  folder : new Folder(),

  fileStorage : new fileStorage(),
  fileStore : new fileStore()

};
