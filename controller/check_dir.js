exports.check = function (root_path, req_path) {
    var fs = require('fs');
    var path = root_path + req_path;
    var EventEmitter = require('events').EventEmitter;
    var ev = new EventEmitter;
    var fe_comp = new EventEmitter;
    
    fs.readdir(path, function (err, files) {
        var file_data = [];
        var count = 0;
        files.forEach(function(filename) {
            fs.stat(path+'/'+filename, function (err, stats) {
                var data = {
                    name: filename,
                    isDirectory: stats.isDirectory(),
                    stat: stats
                }
                file_data.push(data);
                count ++;
                if (count == files.length)
                    fe_comp.emit('complete');
            }); 
        });
            fe_comp.on('complete', function () {
                ev.emit('checked', {dir_path: req_path, files: file_data});    
            });
               
    });
    
    return ev;
}