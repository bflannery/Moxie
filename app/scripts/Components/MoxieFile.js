import React from 'react';
import {Link} from 'react-router';
import store from '../store';
import $ from 'jquery';


export default React.createClass({

  render() {
    return (
      <div>
      <span> file </span>
      </div>
    );

  },
});

// if(this.props.clientFile) {
//   return (
//       <li className="client-file">
//           <Link to={this.props.clientFile.files.fileUrl} target="_blank" className="file-link">
//             <i className="fa fa-file-o file-icon" aria-hidden="true"></i>
//             <span> {this.props.clientFile.files.file} </span>
//           </Link>
//           <button onClick={this.removeFile} type="submit" className="delete-file-button">
//             <i className="fa fa-times-circle" aria-hidden="true"></i>
//           </button>
//       </li>
//     );
// } else {
//   return (
//     <div />
//   );
// }
