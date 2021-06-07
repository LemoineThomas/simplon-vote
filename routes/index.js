var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/', indexController.index);
router.get('/dashboard', indexController.dashboard);
router.get('/inscription', indexController.inscription);
router.get('/dashboard/showmine', indexController.showmine);
router.get('/dashboard/part', indexController.part);
router.get('/dashboard/showend', indexController.showend);
router.get('/dashboard/progress', indexController.progress);
router.post('/login', indexController.login)
router.get('/logout', indexController.logout)


module.exports = router;
