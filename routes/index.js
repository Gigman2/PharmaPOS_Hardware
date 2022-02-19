'use strict'
const HardwareController = require('../controllers/setupController')
const DataController = require('../controllers/dataController')

const path = require('path')

function init(server) {
	server.get('*', function (req, res, next) {
		console.log('Request was made to: ' + req.originalUrl);
		return next();
	});

	server.get('/', function (req, res) {
		res.send('Sluxi POS');
	});


	server.use('/api/setup', HardwareController)
	server.use('/api/data', DataController)
	
}

module.exports = {
	init: init
};