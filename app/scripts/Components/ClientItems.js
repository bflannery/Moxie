import React from 'react';
import ClientItem from './ClientItem';

export default React.createClass({
  render() {
  let allItems = [];
    let folders = this.props.client.clientFolders;
    let files = this.props.client.clientFiles;
    allItems = allItems.concat(files, folders);

    let allClientItems =  allItems.map((item , i, arr)=> {
      return <ClientItem key={i} item={item} client={this.props.client} session={this.props.session}/>
    });

    return (
      <div className="all-client-items">
      {allClientItems}
      </div>
    );
  }

});
