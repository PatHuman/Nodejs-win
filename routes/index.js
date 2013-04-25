
/*
 * GET home page.
 */

exports.index = function(req, res){
	var template_engine = req.app.settings.template_engine;
	res.locals.session = req.session;
  res.render('index', { title: 'Express with '+template_engine });
};

/*Admin Tools*/
exports.adminTmps = function(req, res){
	
		var list =[],
		orm = require("orm");
		orm.connect("mysql://nodejs:pass@localhost/nodedb", function (err, db){
				
				if (err) throw err ;
				var tmps = db.define('tmp_user', { 
					
					username  : String,
					email     : String,
					confirmed : Boolean
				
				});
				tmps.find({confirmed: '0'}, function(err, rows){
						if(err) throw err;
						
						 
						// console.log(rows.count()); Result:"OK", Records:
						res.send({Result:"OK", Records:rows});
				
				});
			        
					
				
				 
		
		});
	 
   
};




exports.registerAction = function(req, res){

	 if (!req.form.isValid) {
      // Handle errors
	 	
		res.send( { msg:0, 	errors:req.form.errors 	});
	   
	   
    } else {
      // Or, use filtered form data from the form object:
		var orm = require("orm");
		orm.connect("mysql://nodejs:pass@localhost/nodedb", function (err, db){
				
				if (err) throw err ;
				var user = db.define('tmp_user', { });
				
			        user.create([
						{
							username: req.form.userName,
							email: req.form.userEmail,
							password: req.form.password,
							confirmed: false
						} 
					], function (err, items) {
						
						if (err) throw err ;
						res.send( { msg: 0, 	errors: req.form.userName +' has been temporary saved' 	});
						// err - description of the error or null
						// items - array of inserted items
					});
				 
		
		});
		
  
	  }

 

};


exports.registerForm = function(req, res){
	
 
	var template_engine = req.app.settings.template_engine;
	res.locals.session = req.session;
  res.render('register', {
	title: 'Express with '+template_engine,
	msg:'',
	errors:{},
	form: {}
	});
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
