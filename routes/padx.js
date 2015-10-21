var express = require('express');
var router = express.Router();

var fetchMonsterBook = require('../lib/padx/fetchMonsterBook');
var fetchMonster = require('../lib/padx/fetchMonster');

router.get('/', function(req, res) {
	fetchMonsterBook(function(err, monsterbook) {
		if (err) {
			res.json({});
		}
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
