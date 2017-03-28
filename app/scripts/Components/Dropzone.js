
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
      client: store.clients.get(this.props.params.id).toJSON(),
      files: []
    };
  },
  componentDidMount(){
   let client = store.clients.get(this.props.params.id);
   if(!client) {
     client = new Client({clientId: this.props.params.id});
     store.clients.add(client);
   }
   client.fetch();
   client.on('update change', this.updateState);

 },
 componentWillUnmount(){
   store.client.off('update change', this.updateState);
 },

    render() {
      console.log(this.state);
      return (
        <div className="dropzone-page">
        <Header />
        <div className="image-upload-container">
          <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop} id="dropzone" name="files" multiple>
            <span>Try dropping some files here, or click to select files to upload. View Preview below.</span>
          </Dropzone>
          <input type="button" onClick={this.onOpenClick} value="Open Dropzone" className="add-button"/>
          <div key={this.state.file} className="upload-file-container">{this.state.files.map((file, i) => <div>   <i className="fa fa-file-o dropzone-file-icon" aria-hidden="true"></i><span className="file-name"> {file.name} </span></div> )}</div>
          <input type="button" onClick={this.uploadFiles} value="Upload File" className="add-button"/>
        </div>
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
    this.setState({
      client: store.clients.get(this.props.params.id).toJSON(),
    });
    },

    uploadFiles() {
    let file = this.state.files[0].name;
    let clientId = this.props.params.id;
    let clientName = this.state.client.name;

    let fd = new FormData();
      fd.append('upload', this.state.files[0]);
      $.ajax({
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        url: 'https://api.backendless.com/v1/files/Moxie/' + this.state.client.name + '/' + file,
        headers: {
          'application-id': config.appId,
          'secret-key': config.secret,
          'application-type': 'REST'
        },
        success: (response)=>{
          response = JSON.parse(response);
          store.file.addFile(response.fileURL, file, clientId, clientName);
        },
        error: (response) => {
          if(response.responseText === '{"code":6003,"message":"Unable to upload the file: file already exists"}') {
            alert('File Already Exists');
          }

        }
      });
    }
  });
