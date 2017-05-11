import React from 'react';
import NavBarClientFolder from './NavBarClientFolder';

import store from '../store';

export default React.createClass({
  render() {

    let navBarClientFolders;

    if(this.props.clientFolders === undefined || this.props.clientFolders.length === 0) {
      navBarClientFolders = <div />;
    } else {
      navBarClientFolders = this.props.clientFolders.map((clientFolder, i, arr) => {
        return <NavBarClientFolder key={i} clientFolder={clientFolder}/>
      });
    }

    return (
      <ul className ="secondary-container">
        {navBarClientFolders}
      </ul>
    );
  }
});

//
// import React from 'react';
// import {Link} from 'react-router';
// import store from '../store';
// import $ from 'jquery';
//
//
// export default React.createClass({
//   render() {
//     console.log(this.props);
//   if(this.props.clientFolder) {
//     return (
//         <li className = "nav-client-folder">
//           <Link to={`/folders/${this.props.clientFolder.folders.objectId}`}  className="nav-client-folder-link">
//             <span> {this.props.clientFolder.folders.folderName} </span>
//           </Link>
//       </li>
//       );
//   } else {
//     return (
//       <div />
//     );
//   }
// }
//   });
