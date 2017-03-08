
import React from 'react';
import Dropzone from 'react-dropzone';
import store from '../store';
import config from '../config';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import Client from '../Models/clientModel';

export default React.createClass({
  getInitialState() {
    return {
      files: store.files.toJSON(),
      client: {
        clientFiles: []
      }
    };
  },
  componentDidMount(){
   let client = store.clients.get(this.props.params.id);
   if(!client) {
     client = new Client({objectId: this.props.params.id});
     store.clients.add(client);
   }
   client.fetch();
   client.on('update change', this.updateState);

   store.files.fetch();
   store.files.on('update change', this.updateState);


 },
 componentWillUnmount(){
   store.clients.off('update change', this.updateState);
   store.files.off('update change', this.updateState);
 },

    render() {
      console.log(this.state);
      return (
        <div className="image-upload-container">
          <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop} id="dropzone" name="files" multiple>
            <span>Try dropping some files here, or click to select files to upload. View Preview below.</span>
          </Dropzone>
          <input type="button" onClick={this.onOpenClick} value="Open Dropzone"/>
          <div key={this.state.file}>{this.state.files.map((file, i) => <span> {file.name} </span> )}</div>
          <input type="button" onClick={this.uploadFiles} value="Upload File"/>
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
      files: store.files.toJSON()
    });
    },

    uploadFiles() {
    let file = this.state.files[0].name;
    let clientId = this.props.params.id;
    let clientName = this.props.name;
    let fd = new FormData();
      fd.append('upload', this.state.files[0]);
      $.ajax({
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        url: 'https://api.backendless.com/v1/files/Moxie/' + file,
        headers: {
          'application-id': config.appId,
          'secret-key': config.secret,
          'application-type': 'REST'
        },
        success: (response)=>{
          response = JSON.parse(response);
          store.file.addFile(response.fileURL, file, clientId, clientName);
          browserHistory.push('/clients/'+this.props.params.id);
        }
      });

    }

  });
