var request = require('request');
var config = require('../config/config.json');

exports.PingBitpagg = (req, res) => {
  var options = {
    method: "GET",
    url: config.endpoint.concat("ViagemZurich/Ping"),
    headers: { "Cache-Control": "no-cache" },
    json: true
  };

  return request(options, function(error, response, body) {
    res.status(response.statusCode).json(body);
  });
};

exports.getCEP = (req, res) => {
  if(!req.body.CEP){
    return res.status(400).json({'error': 'CEP não informado.'});
  }else if(req.body.CEP.length < 8){
    return res.status(400).json({'error': 'CEP inválido.'});
  }
    const options = {
      method: "GET",
      url: config.endpoint.concat(req.body.CEP).concat("/json/"),
      json: true
    };
    return request(options, function(error, response, body) {
      if(body.erro == true){
        return res.status(400).json({'error': 'CEP não encontrado!'})
      }
      res.status(response.statusCode).json(body);
    });
};