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
    }
  },

    render() {
      let dropzoneFiles = (
              <div className="image-upload-container">
                <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop} id="dropzone" name="files" multiple>
                  <span>Try dropping some files here, or click to select files to upload. View Preview below.</span>
                </Dropzone>
                <input type="button" onClick={this.onOpenClick} value="Add Files" className="add-button"/>
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
                  <input type="button" onClick={this.uploadFiles} value="Upload File" className="add-button"/>
                </div>
             </div>
          );
        }

        return (
          <div className="dropzone-modal">
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
      let file = this.state.dropzoneFiles[0];
      let fileName = this.state.dropzoneFiles[0].name;
      let clientId = this.props.client.objectId;
      let clientName = this.props.client.name;

      store.file.uploadFile(file, fileName, clientId, clientName);
      }
  });
