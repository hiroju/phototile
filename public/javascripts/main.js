$(document).ready(function () {
    
    var ph = function () {
        
        return {
            init: function () {
                
                $('#main .dir').each(function () {
                    var path = $(this).attr('path');
                    ph.appendimg(path);
                });
                
                $('.dir').each(function () {
                    ph.setUpload($(this));
                });

                ph.hoverAction($('.content'));
            },
            
            appendimg: function (path) {
                $.getJSON('/dircheck?path='+path, function (json) {
                    var file =''
                    ,   div = ''
                    ,   target = $('.dir[path="'+path+'"]')
                    ,   parent_dir = json.dir_path;
                    
                    json.files.forEach(function (item) {    
                        //Create Content
                        if (item.isDirectory == true) {
                            //Create Directory Div
                            var name = $('<p>').text(item.name);
                            var next_path = json.dir_path + '/' + item.name;
                            div = $('<div>').addClass('content dir').attr('path', next_path);
                            console.log(json.dir_path);
                            div.append(name);
                            div = ph.setUpload(div);
                            
                            //image load event
                            file = div.one('click', function () {
                                var close_btn = $('<div>').addClass('content close_btn').attr('data-group', next_path);
                                $(close_btn).click(function () {
                                    $('.content[data-group*="'+next_path+'"], [path*="'+next_path+'"]:not(.dir[path="'+next_path+'"])')
                                    .hide('fast');
                                    $(this).hide('fast');
                                });
                                $(this).after(close_btn);
                                ph.appendimg(next_path);
                                //dir close event
                                $(this).click(function () {
                                    $('.content[data-group="'+next_path+'"], [path*="'+next_path+'"]').not(this).show('fast');
                                });
                            });
                            target.after($('<div>').addClass('clear'), file);
                            
                        }else {
                            //Create Image Div
                            var filepath = '/file?path='+json.dir_path + '/' + item.name;
                            var img = $('<img>').addClass('img-polaroid lazy').attr({'src': '/img/grey.gif', 'data-original': filepath, 'data-group': path});
                            div = $('<div>').addClass('content file').attr('data-group', path);
                            file = div.append(img);
                            target.after(file);
                        }
                        
                        //Append Created Content
                        ph.hoverAction(file);
                        
                    });
                    $("img[data-group='"+path+"']").lazyload({ 
                        effect : "fadeIn"
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