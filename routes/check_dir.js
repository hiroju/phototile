
exports.list = function(req, res){
    var req_path = req.param('path');
    var config = require('../config/config.js').json;
    var root_dir = config.root;
    var check_dir = require('../controller/check_dir.js');
    
    var ev_check = check_dir.check(root_dir, req_path);
    
    ev_check.on('checked', function (files) {
        res.json(files);
    });
};