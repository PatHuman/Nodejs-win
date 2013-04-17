
/*
 * GET home page.
 */

exports.index = function(req, res){
	var template_engine = req.app.settings.template_engine;
	res.locals.session = req.session;
  res.render('index', { title: 'Express with '+template_engine });
};

exports.vid = function(req, res){
	var template_engine = req.app.settings.template_engine;
	res.locals.session = req.session;
  res.render('video', { videoPath: 'videos/Finding modules.avi',  title: 'videos'  });
};

exports.vidList = function(req, res){

 
var fs = require("fs"),
    path = require("path"),
   	folder ="./public/videos/",
	 walk = require('walk'),
	 options,
	 walker,
	 list = [];
	 
	
    

options = {
    followLinks: false,
};


walker = walk.walk(folder, options);

walker.on("file", function (root, fileStats, next) {
     

	 list.push( fileStats.name );
	  
    next();
});
	
walker.on("end", function () {
  res.locals.session = req.session;
  res.render('video', { list:list,  videoPath: 'videos/Finding modules.avi',  title: 'videos'  });
});
		
	 
  
};
