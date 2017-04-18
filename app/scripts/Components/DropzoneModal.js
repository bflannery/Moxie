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
      console.log(this.state);
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
      var pdfImage = new PDFImage("/tmp/slide.pdf");
      pdfImage.convertPage(0).then(function (imagePath) {
  // 0-th page (first page) of the slide.pdf is available as slide-0.png
      fs.existsSync("/tmp/slide-0.png") // => true
});
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
        store.fileStore.uploadFile(file, fileName);
        store.session.set({addFileModal: false});
      }
    },

    closeModal() {
      store.session.set({addFileModal: false});
    }
  });
