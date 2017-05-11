import FileModel from '../../app/scripts/models/fileModel';
import Backbone from 'backbone';

import { expect } from 'chai';

describe('fileModel', () => {
	// make a variable for an instance
	let fileModel;

	// make sure each time we run a test the instance is a fresh model
	beforeEach(() => {
		fileModel = new FileModel();
	});

	it('should be a function (because it is a constructor)', () => {
		expect(FileModel).to.be.a('function');
	});

	it('should create an backbone model', () => {
		expect(fileModel).to.be.an.instanceof(Backbone.Model);
	});

	it('should have an attribute id of objectId', () => {
		expect(fileModel).to.have.property('idAttribute');
		expect(fileModel.idAttribute).to.equal('objectId');
	});

  it('should have default object with attributes of name and description', () => {
    expect(fileModel).to.have.property('defaults');
    expect(fileModel.defaults).to.deep.equal({name: '' , description: ''});
  });

  it('should have an addFile method', () => {
    expect(fileModel).to.have.property('addFile');
    expect(fileModel.addFile).to.be.a('function');
  });

  it('should have a deleteFile method', () => {
    expect(fileModel).to.have.property('deleteFile');
    expect(fileModel.deleteFile).to.be.a('function');
  });

});
