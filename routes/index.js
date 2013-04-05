
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
    
    list.on('checked',function (err, dir_data) {
        if (err) {
            res.render('index', { err: true});  
        }else {
            res.render('index', { err: false, dir_data: dir_data});
        }
    });
};