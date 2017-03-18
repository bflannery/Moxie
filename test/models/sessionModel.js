import SessionModel from '../../app/scripts/models/SessionModel';
import Backbone from 'backbone';

import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';


describe('sessionModel', () => {
	// make a variable for an instance
	let sessionModel;

	// make sure each time we run a test the instance is a fresh model
	beforeEach(() => {
    sessionModel.prototype.initialize = () => {
    };
    sessionModel = new SessionModel();
	});

	it('should be a function (because it is a constructor)', () => {
		expect(SessionModel).to.be.a('function');
	});

	it('should create an backbone model', () => {
		expect(sessionModel).to.be.an.instanceof(Backbone.Model);
	});

	it('should have an attribute id of objectId', () => {
		expect(sessionModel).to.have.property('idAttribute');
		expect(sessionModel.idAttribute).to.equal('objectId');
	});

  it('should have default object with attributes of name and description', () => {
    expect(sessionModel).to.have.property('defaults');
    expect(sessionModel.defaults).to.deep.equal({auth: false, passwordReset: null});
  });
});
