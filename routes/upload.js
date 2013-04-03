
/*
 * GET home page.
 */

exports.save = function(req, res){
    require('node-zip');
    var fs = require('fs');
    var path = require('path');
    var config = require('../config/config.js').json;
    var root = config.root;
    var upfile_data = req.files.upfile;
    var req_path = req.param('path');
    var unzip = require('unzip');
    var zipfile = '';
    //write file
    function write_file(file_data) {
        if (req_path != '/')
            req_path = req_path + '/';
        var target_dir = root + req_path;    
        
        switch ( path.extname(file_data.name) ) {
            case '.zip':
                zipfile = fs.createReadStream(file_data.path).pipe(unzip.Extract({path: target_dir}));
                
                /*
                fs.readFile(file_data.path, 'binary', function (err, data) {
                    var zip = new JSZip(data, {base64: false, checkCRC32: true});
                    for(var filename in zip.files) {
                        console.log('upload:' + filename);
                        var unzip_data = zip.files[filename];
                        var utf8 = iconv.convert(unzip_data.name);
                        if(unzip_data.options.dir) {
                            fs.mkdirSync(target_dir+utf8.toString());
                        }else {
                            fs.writeFile(target_dir+utf8.toString(), unzip_data.data, 'binary', function (err) {
                                if(err)
                                    console.log('upload write file error(zip): '+err);
                            });    
                        }
                    }
                });*/
                
                break;
                
                
                    
            default :
                fs.readFile(file_data.path, function (err, data) {
                    console.log('single');
                    fs.writeFile(target_dir+file_data.name, data, function (err) {
                        if (err)
                            console.log('upload write file error: '+err);
                    });
                });
                break;
        }
    }
    
    //check if upload files are multiple or not
    if (Array.isArray(upfile_data) == false) {
        //single
        write_file(upfile_data);  
    } else {
        //multiple
        upfile_data.forEach(function (file) {
            write_file(file);
        });
    }
    
    zipfile.on('close', function () {
	res.redirect('back');
    }); 
};
