'use strict';

/**
 * This file pulls down data on an individual monster from padx
 * @type {request|exports}
 */

var request = require('request');

var findName = new RegExp(/Name\<\/span\>\:\<\/td\>\<td class\=\"data\"\>(.*)\<\/td\>\<\/tr\>/),
	findType = new RegExp(/Type:\<\/td\>\<td colspan\=\"2\" class\=\"data\">\<a href\=\"monsterbook\.asp\?.*" rel\=\"nofollow\"\>([\w|\s]*)\<\/a\>.*Element/),
	findElement = new RegExp(/monsterbook\.asp\?e1=.*?\" rel\=\"nofollow\"\>(.*?)\<\/a\>(.*monsterbook\.asp\?e1=.*?\" rel\=\"nofollow\"\>(.*?)\<\/a\>)?/g),
	findCost = new RegExp(/Cost\:\<\/td\>\<td class\=\"data\"\>\<a href\=\"monsterbook.asp.* rel\=\"nofollow\"\>(.*)\<\/a\>\<\/td\>/),
	findExp = new RegExp(/\t*(.*) Exp to max this monster/),
	findLevel = new RegExp(/statlevel\"\>Level\<\/td\>\<td\>(\d*)\<\/td\>\<td\>(\d*)\<\/td\>/),
	findHp = new RegExp(/stathp\"\>HP\<\/td\>\<td\>(\d*)\<\/td\>\<td\>(\d*)\<\/td\>/),
	findAtk = new RegExp(/\<tr\>\<td class\=\"statatk\"\>ATK\<\/td\>\<td\>(\d*)\<\/td\>\<td\>(\d*)\<\/td\>/),
	findRcv = new RegExp(/\<tr\>\<td class\=\"statrcv\"\>RCV\<\/td\>\<td\>(\d*)\<\/td\>\<td\>(\d*)\<\/td\>/),
	findSell = new RegExp(/\<tr\>\<td class\=\"statsell\"\>Sell Price\<\/td\>\<td\>(\d*)\<\/td\>\<td\>(\d*)\<\/td\>/),
	findFeed = new RegExp(/statexp\"\>Feed Exp\<\/td\>\<td\>(\d*)\<br\>\<span class\=\"small\"\>\(\d*\)\<\/span\>\<\/td\>\<td\>(\d*)\<br\>/);


module.exports = function fetchMonster(id, callback) {

	// Pull down the DOM from padx
	request('http://puzzledragonx.com/en/monster.asp?n=' + id, function(err, resp, body) {

		// Error handling
		if (err || !body || (body.indexOf('<title>Puzzle &amp; Dragons Database</title>') !== -1)) {
			return callback(new Error('There was an error fetching the monsterbook from padx: ', err));
		}

		// regexing cause its easier than building out a dom tree... definitely not the right approach though
		var regexes = [
			{name: 'name',regex: findName},
			{name: 'type',regex: findType},
			{name: 'element',regex: findElement},
			{name: 'cost', regex: findCost},
			{name: 'exp',regex: findExp},
			{name: 'level',regex: findLevel},
			{name: 'hp', regex: findHp},
			{name: 'atk', regex: findAtk},
			{name: 'rcv', regex: findRcv},
			{name: 'sell', regex: findSell},
			{name: 'feed', regex: findFeed}
		];

		var result = regexes.reduce(function(memo, regexObj) {
			var result = regexObj.regex.exec(body);
			memo[regexObj.name] = result && result[1] ? result.slice(1) : [''];
			return memo;
		}, {});


		// Special massaging for dual element monsters
		if (result.element[2]) {
			result.element[0] += ' / ' + result.element[2];
		}


		var monster = {
			id: id,
			name: result.name[0],
			type: result.type[0].toLowerCase(),
			element: result.element[0].toLowerCase(),
			cost: parseInt(result.cost[0], 10),
			expToMax: parseInt((result.exp[0]).replace(/\D/g, ''), 10) || 0,
			level: {
				min: parseInt(result.level[0], 10),
				max: parseInt(result.level[1], 10)
			},
			hp: {
				min: parseInt(result.hp[0], 10),
				max: parseInt(result.hp[1], 10)
			},
			atk: {
				min: parseInt(result.atk[0], 10),
				max: parseInt(result.atk[1], 10)
			},
			rcv: {
				min: parseInt(result.rcv[0], 10),
				max: parseInt(result.rcv[1], 10)
			},
			sellPrice: {
				min: parseInt(result.sell[0], 10),
				max: parseInt(result.sell[1], 10)
			},
			feedExp: {
				min: parseInt(result.feed[0], 10),
				max: parseInt(result.feed[1], 10)
			}
		};

		callback(null, monster);
	});
};