'use strict';

/* global describe, it */

var assert = require('assert'),
	fetchMonsters = require('../lib/padx/fetchMonsterBook');

describe('Fetching Monsters from padx', function() {

	this.timeout(5000);

	it('should fetch a json list', function(done) {

		fetchMonsters(function(err, monsters) {
			assert.equal(err, null);
			assert.equal(monsters[776].name, 'Great Tengu');
			done();
		});
	});
});