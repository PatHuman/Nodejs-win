
/*
 * GET home page.
 */

exports.index = function(req, res){
	var template_engine = req.app.settings.template_engine;
	res.locals.session = req.session;
  res.render('index', { title: 'Express with '+template_engine });
};


exports.registerAction = function(req, res){

	 if (!req.form.isValid) {
      // Handle errors
      console.log(req.form.errors);

    } else {
      // Or, use filtered form data from the form object:
      console.log("Username:", req.form.userName);
      console.log("Password:", req.form.password);
      console.log("Email:", req.form.userEmail);
    }
res.locals.session = req.session;
res.end();

};


exports.registerForm = function(req, res){
	
 
	var template_engine = req.app.settings.template_engine;
	res.locals.session = req.session;
  res.render('register', {title: 'Express with '+template_engine });
};


exports.vidList = function(req, res){

 
var fs = require("fs"),
    path = require("path"),
   	folder ="./public/videos",
	 walk = require('walk'),
	 options,
	 walker,
	 list = [],
	 listPath = [],
	 link = 'videos/Finding modules.avi';
	 
	
    

options = {  followLinks: false };


walker = walk.walk(folder, options);

walker.on("file", function (root, fileStats, next) {
     

	list.push( fileStats.name );
	root = root.substr(9);  							// removing public folder from the path
	listPath.push( root+'/' + fileStats.name  );
	  
    next();
});

 

 // console.log(req.body.link);
	
walker.on("end", function () {
  res.locals.session = req.session;
  res.render('video', {linker:link, dirs:listPath, list:list,  videoPath: 'videos/Finding modules.avi',  title: 'videos'  });
});
		
	 
  
};
