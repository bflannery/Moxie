import React from 'react';
import PDF from 'react-pdf-js';

import store from '../store';
export default React.createClass ({

  getInitialState() {
    return {
      file: store.files.get(this.props.params.id).toJSON()
    };
  },

  componentDidMount() {
    let file = store.files.get(this.props.params.id);
    if(!file) {
      file = new File({object: this.props.params.id});
      store.files.add(file);
    }

    file.fetch();
    file.on('update change', this.updateState);
  },

  onDocumentComplete(pages) {
    this.setState({ page: 1, pages });
  },

  onPageComplete(page) {
    this.setState({ page });
  },

  handlePrevious() {
    this.setState({ page: this.state.page - 1 });
  },

  handleNext() {
    this.setState({ page: this.state.page + 1 });
  },

  renderPagination(page, pages) {

    let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    }
    let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
      );
  },

  render() {
    console.log(this.state);
    console.log(this.props);

    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    return (
      <div>
        <PDF file={this.state.file.fileUrl} onDocumentComplete={this.onDocumentComplete} onPageComplete={this.onPageComplete} page={this.state.page} />
        {pagination}
      </div>
    );
}
});
