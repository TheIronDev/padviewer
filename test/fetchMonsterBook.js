'use strict';

/* global describe, it */

var assert = require('assert'),
	fetchMonsters = require('../lib/padx/fetchMonsterBook');

describe('Fetching Monsters from padx', function() {

	this.timeout(5000);

	it('should fetch a json list', function(done) {

		fetchMonsters(function(err, result) {
			assert.equal(err, null);
			assert.equal(result['777'].name, 'Great Tengu');
			done();
		});
	});
});