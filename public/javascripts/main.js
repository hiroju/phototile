$(document).ready(function () {
    
    var ph = function () {
        
        return {
            init: function () {
                var dirs = $('#main .dir');
                for (var i=0; i < dirs.length; i ++) {
                    var path = dirs.eq(i).attr('path'); 
                    ph.appendimg(path);
                }
                
                for(var i=0; i < $('.dir').length; i ++) {
                    ph.setUpload($('.dir').eq(i));
                }
                
                ph.hoverAction($('.content'));
            },
            
            appendimg: function (path) {
                $.getJSON('/dircheck?path='+path, function (json) {
                    var file =''
                    ,   div = ''
                    ,   target = $('.dir[path="'+path+'"]');
                    json.files.forEach(function (item) {
                        
                        //Create Content
                        if (item.isDirectory == true) {
                            //Create Directory Div
                            var name = $('<p>').text(item.name);
                            div = $('<div>').addClass('content dir').attr('path', json.dir_path + '/' + item.name);
                            console.log(json.dir_path);
                            div.append(name);
                            div = ph.setUpload(div);
                            file = div.one('click', function () {
                                var next_path = $(this).attr('path');
                                ph.appendimg(next_path);
                                $(this).click(function () {
                                    $('.file[group="'+next_path+'"]').toggle('normal');
                                });
                            });
                        }else {
                            //Create Image Div
                            var img = $('<img>').attr('src', '/file?path='+json.dir_path + '/' + item.name);
                            div = $('<div>').addClass('content file').attr('group', path);
                            file = div.append(img);
                        }
                        
                        //Append Created Content
                        ph.hoverAction(file);
                        target.after(file);
                    });
                });
            },
            
            hoverAction: function (target) {
                target.hover(function(){
                    $('.option', this).slideDown('fast');    
                }, function(){
                    $('.option', this).slideUp('fast');    
                });
            },
            
            setUpload: function (target) {
                var opt = $('<div>').addClass('option');
                var div_upload = $('<div>').addClass('upload');
                var icon = $('<i>').addClass('icon-upload');
                var input_file = $('<input>').attr({type: 'file', name: 'upfile', multiple: 'multiple'});
                var path = $(target).attr('path');
                
                console.log(path);
                
                input_file.change(function () {
                    $(this).upload('/upload', {path: path}, function(res) {
                        alert('File uploaded');
                    });
                });
                
                div_upload.append(icon).append(input_file);
                opt.append(div_upload);
                target.append(opt);
                
                return target;
            }
        };  
    }();
    ph.init();
});