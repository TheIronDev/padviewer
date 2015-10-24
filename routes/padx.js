var express = require('express');
var router = express.Router();

var fetchMonsterBook = require('../lib/padx/fetchMonsterBook');
var fetchMonster = require('../lib/padx/fetchMonster');

// In-Memory Cache so that we are a bit nicer to padx and reduce latency for anything after the first request
var cachedMonsterBook = [];

router.get('/', function(req, res) {

	if (cachedMonsterBook.length) {
		return res.json(cachedMonsterBook);
	}

	fetchMonsterBook(function(err, monsterbook) {
		if (err) {
			res.json({});
		}
		cachedMonsterBook = monsterbook;
		res.json(monsterbook);
	});
});

router.get('/:id', function(req, res) {
	var id = req.params.id || 1;
	fetchMonster(id, function(err, monster) {
		if (err) {
			res.json({});
		}
		res.json(monster);
	});
});

module.exports = router;
