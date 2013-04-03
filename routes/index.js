
/*
 * GET home page.
 */

exports.index = function(req, res){
    var check_dir = require('../controller/check_dir.js');
    var config = require('../config/config.js').json;
    var root_dir = config.root;
    var list = check_dir.check(root_dir, '/');
    var EventEmitter = require('events').EventEmitter;
    var ev = new EventEmitter;
    
    list.on('checked',function (dir_data) {
        res.render('index', { dir_data: dir_data});
    });
};