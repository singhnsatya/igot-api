var express = require('express');
var fetchAllLists = require('../controllers/fetchLists')
var battleCounts = require('../controllers/battleCounts')
var analyzeBattle = require('../controllers/analyzeBattle')
var searchKey = require('../controllers/searchKey')
var home = require('../controllers/home')
var routes = express.Router();

routes.get('/', home)
routes.get('/list', fetchAllLists)
routes.get('/count', battleCounts)
routes.get('/stats', analyzeBattle)
routes.get('/search', searchKey)

module.exports = routes;
