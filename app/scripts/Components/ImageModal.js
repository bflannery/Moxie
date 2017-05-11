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
                  <input type="button" onClick={this.onOpenClick} value="Add Photo" className="button add-button"/>
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
                      <input type="button" onClick={this.uploadFiles} value="Upload Photo" className="button add-button"/>
                      <input type="button" onClick={this.closeModal} value="Cancel" className="button close-button"/>
                    </div>
                </div>
                </div>

          );
        }

        return (
            <div className="dropzone-content">
              <h3> Upload A Logo </h3>
              {dropzoneFiles}
            </div>
        );
    },

    onDrop(acceptedFiles, rejectedFiles){
    this.setState({files: acceptedFiles});
  },
  onOpenClick(){
    this.dropzone.open();
  },
  updateState(){
    this.setState({user: store.user.toJSON()});
  },
  upload(){
    let fd = new FormData();
    fd.append('upload', this.state.files[0])
    $.ajax({
      type: 'POST',
      data: fd,
      processData: false,
      contentType: false,
      url: 'https://api.backendless.com/v1/files/'+this.state.files[0].name,
      headers: {
        'application-id': config.appId,
        'secret-key': config.secret,
        'application-type': 'REST'
      },
      success: (response)=>{
        response = JSON.parse(response);
        console.log(response.fileURL);
        store.user.addPhoto(response.fileURL);
        browserHistory.push('/user/'+this.props.params.id);
      }
    })
  },

    closeModal() {
      store.session.set({addFileModal: false});
    }
  });
