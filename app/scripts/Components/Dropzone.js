
import React from 'react';
import Dropzone from 'react-dropzone';
import store from '../store';
import config from '../config';
import $ from 'jquery';
import {browserHistory} from 'react-router';

export default React.createClass({
  getInitialState() {
    return {
      files: [],
      clients: {}
    };
  },
  componentDidMount(){
   store.clients.fetch({url: 'https://api.backendless.com/v1/data/Clients/'+this.props.params.id});
   store.clients.on('update change', this.updateState);


 },
 componentWillUnmount(){
   store.clients.off('update change', this.updateState);
 },

    render() {
      console.log(this.state.files);
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
    this.setState({user: store.clients.toJSON()});
    },


    uploadFiles() {
      let files = this.state.files;
      store.file.upload(files);
      browserHistory.push('/clients/'+this.props.params.id);
  }
  });

  // let fd = new FormData();
  // console.log(fd);
  // let filesArr = this.state.files;
  // let files = filesArr.map((file, i) => {
  //
  //
  //   fd.append('upload', this.state.files[i]);
  //   $.ajax({
  //     type: 'POST',
  //     data: fd,
  //     processData: false,
  //     contentType: false,
  //     url: 'https://api.backendless.com/v1/files/Moxie/'+this.state.files[i].name,
  //     headers: {
  //       'application-id': config.appId,
  //       'secret-key': config.secret,
  //       'application-type': 'REST'
  //     },
  //     success: (response)=>{
  //       response = JSON.parse(response);
  //       store.file.addFile(response.fileURL);
  //       browserHistory.push('/clients/'+this.props.params.id);
  //     }
  // //   });
  // });
