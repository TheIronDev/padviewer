'use strict';

/**
 * This file pulls down the list of monsters from puzzledragonx's monsterbook.
 * @type {request|exports}
 */

var request = require('request'),
	jsdom = require("jsdom"),
	query,
	result,
	thumbnail,
	id,
	name;

module.exports = function fetchMonsterBook(callback) {

	// Pull down the DOM from padx
	request('http://puzzledragonx.com/en/monsterbook.asp', function(err, resp, body) {

		// Error handling
		if (err || !body) {
			return callback(new Error('There was an error fetching the monsterbook from padx: ', err));
		}

		// Rebuild the DOM tree (I *can* do a regex here, but that is substantially more brittle)
		jsdom.env(body, function(jsDomErr, window) {

			// More error handling
			if (jsDomErr || !window) {
				return callback(new Error('There was an error parsing the dom: ', jsDomErr));
			}

			// Making the assumption document exists on window. :\
			query = window.document.querySelectorAll('.indexframe a img');


			result = Array.prototype.reduce.call(query, function(memo, current) {
				thumbnail = current.getAttribute('data-original');

				if (!thumbnail) {
					return memo;
				}

				id = (thumbnail).match(/thumbnail\/(.*)\.png/)[1];
				name = current.title;
				memo[id] = {
					name: name
				};
				return memo;
			}, {});

			window.close();

			callback(null, result);
		});
	});
};