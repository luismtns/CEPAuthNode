var express = require('express');
var auth = require('../metodos/auth');
var autenticador = require('../controllers/autenticador');
var processo = require('../controllers/processo.js');

var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/Autenticador/Token', autenticador.Token);
router.get('/Ping', autenticador.Ping);
router.get('/PingAuth', auth.TknCheck, autenticador.PingAuth);

router.post('/CEP', auth.TknCheck, processo.getCEP);

module.exports = router;