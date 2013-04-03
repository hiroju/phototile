exports.send = function (req, res) {
    
    var config = require('../config/config.js').json
    ,   send = require('send')
    ,   root_path = config.root
    ,   req_path = req.query.path
    console.log(root_path+req_path);
    
    send(req, req_path)
    .root(root_path)
    .pipe(res);
}