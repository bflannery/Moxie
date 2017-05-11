import React from 'react';
import Dropzone from 'react-dropzone';
import store from '../store';
import config from '../config';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import Client from '../Models/clientModel';
import Header from './Header';

export default React.createClass({

  getInitialState() {
    return {
      dropzoneFiles: []
    };
  },

    render() {
      console.log(this.props);
      let dropzoneFiles = (
              <div className="files-container">
                <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop} id="dropzone" name="files" multiple/>
                <div className="modal-button-container">
                  <input type="button" onClick={this.onOpenClick} value="Add Files" className="button add-button"/>
                  <input type="button" onClick={this.closeModal} value="Cancel" className="button close-button"/>
                </div>
              </div>
            );

      if (this.state.dropzoneFiles.length > 0) {
          dropzoneFiles = (
              <div>
                <div key={this.state.dropzoneFile} className="upload-file-container">
                     {this.state.dropzoneFiles.map((dropzoneFile, i) =>
                         <div>
                           <i className="fa fa-file-o dropzone-file-icon" aria-hidden="true"></i>
                           <span className="file-name"> {dropzoneFile.name} </span>
                         </div>
                       )}
                </div>
                 <div>
                    <div className="modal-button-container">
                      <input type="button" onClick={this.uploadFiles} value="Upload File" className="button add-button"/>
                      <input type="button" onClick={this.closeModal} value="Cancel" className="button close-button"/>
                    </div>
                </div>
                </div>

          );
        }

        return (
            <div className="dropzone-content">
              <h3> Upload Files </h3>
              {dropzoneFiles}
            </div>
        );
    },

    onDrop(acceptedFiles, rejectedFiles){
      this.setState({dropzoneFiles: acceptedFiles});
    },

    onOpenClick(){
      this.dropzone.open();
    },

    uploadFiles() {
      if(this.props.client) {

        let file = this.state.dropzoneFiles[0];
        let fileName = this.state.dropzoneFiles[0].name;
        let clientId = this.props.client.objectId;
        let clientName = this.props.client.clientName;
        store.fileStore.uploadFile(file, fileName, clientId, clientName);
        store.session.set({addFileModal: false});

      } else {

        let file = this.state.dropzoneFiles[0];
        let fileName = this.state.dropzoneFiles[0].name;
        let folderId = this.props.folder.objectId;
        let folderName = this.props.folder.folderName
        let clientId = this.props.folder.clientId
        store.fileStore.uploadSubFile(file, fileName, folderId, folderName, clientId);
        store.session.set({addFileModal: false});
      }
    },

    closeModal() {
      store.session.set({addFileModal: false});
    }
  });
