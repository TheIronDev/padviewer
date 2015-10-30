'use strict';

/* global describe, it */

var assert = require('assert'),
	fetchMonster = require('../lib/padx/fetchMonster');

describe('Fetching individual Monster from padx', function() {

	this.timeout(0);

	it('should fetch appropriate data', function(done) {

		var expectedOutput = {
			id: 777,
			name: 'Great Tengu',
			type: 'physical',
			element: 'wood',
			cost: 20,
			skill: 'Switch places with leader card. Use again to switch back.',
			leaderSkill: 'While your HP is 50% or above, a single hit that normally kills you will instead leave you with 1 HP. For the consecutive hits, this skill will only affect the first hit.',
			expToMax: 707107,
			level: {
				min: 1,
				max: 50
			},
			hp: {
				min: 488,
				max: 1220
			},
			atk: {
				min: 251,
				max: 628
			},
			rcv: {
				min: 0,
				max: 0
			},
			sellPrice: {
				min: 405,
				max: 20250
			},
			feedExp: {
				min: 938,
				max: 46875
			}
		};

		fetchMonster(777, function(err, monster) {
			assert.equal(err, null);
			assert.deepEqual(monster, expectedOutput);
			done();
		});
	});

	it('should fetch elements from dual-element monsters', function(done) {
		fetchMonster(310, function(err, monster) {
			assert.equal(err, null);
			assert.equal(monster.element, 'fire / water');
			assert.equal(monster.type, 'physical / devil');
			done();
		});
	});
});