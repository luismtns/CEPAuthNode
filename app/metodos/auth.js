var jwt = require('jsonwebtoken');
var config = require("../config/config.json");

exports.TknCheck = function verifyTKN(req, res, next) {

    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(
        token,
        new Buffer.alloc(15, config.password, 'base64'),
        {
            audience: config.audience,
            maxAge: config.maxAge
        },
        function (err, decoded) {
            if (err) return res.status(500).send(
                {
                    auth: false,
                    message: 'tentativa de acesso não autorizado!'
                }
            );
            next();
        });
};