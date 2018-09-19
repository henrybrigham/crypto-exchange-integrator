let express    = require('express');
let router     = express.Router();
let gar        = global.appRoot;

router.get('/', function(req, res) {
	console.log('poloniex');
});

module.exports = router;
