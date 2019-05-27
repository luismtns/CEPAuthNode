var uuidv1 = require('uuid/v1');
var uuidv4 = require('uuid/v4');
var config = require("../config/config.json");
var jwt = require('jsonwebtoken');

exports.Ping = (req, res) => {
    res.status(200).json({ "resposta": "Ping" });
};

exports.Token = (req, res) => {

    var data = uuidv1().toString() + '|' +
        Date.now().toString() + '|' +
        uuidv4().toString();
    var base64data = new Buffer.alloc(data.length, data, 'base64')

    var token = jwt.sign(
        { 'data': base64data },
        new Buffer.alloc(15, config.password, 'base64'),
        { audience: config.audience },
        { expiresIn: config.maxAge }
    );

    res.status(200).send({ token: token });
};

exports.PingAuth = (req, res) => {
    res.status(200).json({ "resposta": "Ping" });
};