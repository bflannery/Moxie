import ClientModel from '../../app/scripts/models/clientModel';
import Backbone from 'backbone';

import { expect } from 'chai';

describe('clientModel', () => {
	// make a variable for an instance
	let clientModel;

	// make sure each time we run a test the instance is a fresh model
	beforeEach(() => {
		clientModel = new ClientModel();
	});

	it('should be a function (because it is a constructor)', () => {
		expect(ClientModel).to.be.a('function');
	});

	it('should create an backbone model', () => {
		expect(clientModel).to.be.an.instanceof(Backbone.Model);
	});

	it('should have an attribute id of objectId', () => {
		expect(clientModel).to.have.property('idAttribute');
		expect(clientModel.idAttribute).to.equal('objectId');
	});

  it('should have default object with attributes of name and description', () => {
    expect(clientModel).to.have.property('defaults');
    expect(clientModel.defaults).to.deep.equal({name: '' , description: ''});
  });

  it('should have a deleteClient method', () => {
    expect(clientModel).to.have.property('deleteClient');
    expect(clientModel.deleteClient).to.be.a('function');
  });

});
