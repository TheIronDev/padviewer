'use strict';

/**
 * This file pulls down data on an individual monster from padx
 * @type {request|exports}
 */

var request = require('request');

module.exports = function fetchMonster(id, callback) {

	/**
	 * Every time we want to fetch a monster, we want to use a newly instantiated set of regexes. Before this, I was
	 * re-using older regular expressions and re-executing them, causing inconsistent results... :(
	 * @type {RegExp}
	 */
	var findName = new RegExp(/Name\<\/span\>\:\<\/td\>\<td class\=\"data\"\>(.*)\<\/td\>\<\/tr\>/),
		findType = new RegExp(/monsterbook\.asp\?t1=.*?\" rel\=\"nofollow\"\>(.*?)\<\/a\>(.*monsterbook\.asp\?t1=.*?\" rel\=\"nofollow\"\>(.*?)\<\/a\>)?/gm),
		findElement = new RegExp(/monsterbook\.asp\?e1=.*?\" rel\=\"nofollow\"\>(.*?)\<\/a\>(.*monsterbook\.asp\?e1=.*?\" rel\=\"nofollow\"\>(.*?)\<\/a\>)?/g),
		findCost = new RegExp(/Cost\:\<\/td\>\<td class\=\"data\"\>\<a href\=\"monsterbook.asp.* rel\=\"nofollow\"\>(.*)\<\/a\>\<\/td\>/),
		findExp = new RegExp(/\t*(.*) Exp to max this monster/),
		findLevel = new RegExp(/statlevel\"\>Level\<\/td\>\<td\>(\d*)\<\/td\>\<td\>(\d*)\<\/td\>/),
		findHp = new RegExp(/stathp\"\>HP\<\/td\>\<td\>(\d*)\<\/td\>\<td\>(\d*)\<\/td\>/),
		findAtk = new RegExp(/\<tr\>\<td class\=\"statatk\"\>ATK\<\/td\>\<td\>(\d*)\<\/td\>\<td\>(\d*)\<\/td\>/),
		findRcv = new RegExp(/\<tr\>\<td class\=\"statrcv\"\>RCV\<\/td\>\<td\>(\d*)\<\/td\>\<td\>(\d*)\<\/td\>/),
		findSell = new RegExp(/\<tr\>\<td class\=\"statsell\"\>Sell Price\<\/td\>\<td\>(\d*)\<\/td\>\<td\>(\d*)\<\/td\>/),
		findSkill = new RegExp(/\<a href\=\"skill\.asp\?s\=.*?value-end\"\>(.*?)\<\/td\>/),
		findLeaderSkill = new RegExp(/leaderskill\.asp\?s\=.*?value-end\"\>(.*?)\<\/td\>/),
		findFeed = new RegExp(/statexp\"\>Feed Exp\<\/td\>\<td\>(\d*)\<br\>\<span class\=\"small\"\>\(\d*\)\<\/span\>\<\/td\>\<td\>(\d*)\<br\>/),

		regexes = [
			{name: 'name',regex: findName},
			{name: 'type',regex: findType},
			{name: 'element',regex: findElement},
			{name: 'cost', regex: findCost},
			{name: 'exp',regex: findExp},
			{name: 'level',regex: findLevel},
			{name: 'skill',regex: findSkill},
			{name: 'leaderSkill',regex: findLeaderSkill},
			{name: 'hp', regex: findHp},
			{name: 'atk', regex: findAtk},
			{name: 'rcv', regex: findRcv},
			{name: 'sell', regex: findSell},
			{name: 'feed', regex: findFeed}
		];
	//\<a href\=\"skill.asp?s=.*?value-end\"\>(.*?)\<\/td\>
	// Pull down the DOM from padx
	request('http://puzzledragonx.com/en/monster.asp?n=' + id, function(err, resp, body) {

		// Error handling
		if (err || !body || (body.indexOf('<title>Puzzle &amp; Dragons Database</title>') !== -1)) {
			return callback(new Error('There was an error fetching the monsterbook from padx: ', err));
		}

		var result = regexes.reduce(function(memo, regexObj) {
			var result = regexObj.regex.exec(body);

			memo[regexObj.name] = result && result[1] ? result.slice(1) : [''];
			return memo;
		}, {});


		// Special massaging for dual element monsters
		result.name = result.name[0];
		result.type = result.type[2] ? result.type[0] + ' / ' + result.type[2]: result.type[0];
		result.element = result.element[2] ? result.element[0] + ' / ' + result.element[2]: result.element[0];
		result.cost = parseInt(result.cost[0], 10);
		result.expToMax = parseInt((result.exp[0]).replace(/\D/g, ''), 10) || 0;


		var monster = {
			id: id,
			name: result.name,
			type: result.type.toLowerCase(),
			element: result.element.toLowerCase(),
			cost: result.cost,
			skill: result.skill && result.skill[0] || '',
			leaderSkill: result.leaderSkill && result.leaderSkill[0] || '',
			expToMax: result.expToMax,
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