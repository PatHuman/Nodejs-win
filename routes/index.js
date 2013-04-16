
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
	
	var list = [];
	req.app.fs.readdir('/public/videos/', function (err, files) { 
	  if (err) throw err;

	   files.forEach( function (file) {
		 req.app.fs.lstat('/public/videos/'+file, function(err, stats) {
		   if (!err && stats.isDirectory()) { //conditing for identifying folders
			list.push( '<li class="folder">'+file+'</li>');
		   }
		   else{
			list.push('<li class="file">'+file+'</li>');
		  }
		 });
	   });

});
	
	res.locals.session = req.session;
  res.render('video', { list:list,  videoPath: 'videos/Finding modules.avi',  title: 'videos'  });
};
