import React from 'react';
import store from '../../store';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';

export default React.createClass({

  getInitialState() {
    return {
      files: [],
      client: {}
    };
  },

  componentDidMount() {
    store.client.fetch({url: 'https://api.backendless.com/v1/data/Clients/'+this.props.params.id});
    store.client.on('update change', this.updateState);


  },

  componentWillUnmount() {
    store.client.off('update chnage', this.updateState);
  },

  updateState() {
    this.setState({
      client: store.client.toJSON()
    });
  },
  render() {
    console.log(this.state);
       return (
         <div className="main-container">
            <input onClick={this.handlePhoto} type="button" value="Add a File"/>
        </div>
       );
     },
   handlePhoto() {
     browserHistory.push('/clients/files/' + this.props.params.id)
   }
});
