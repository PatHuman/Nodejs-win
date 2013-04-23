
/**
 * Module dependencies.
 */
 
 require('./models/person');
require('./models/adress');

//change your template engine and hostname here ('ejs' or 'dust')
var template_engine = 'ejs'
	, domain = 'localhost';

var express = require('express')
	, engine = require('ejs-locals')
  , routes = require('./routes')
  , http = require('http')
	, store = new express.session.MemoryStore
  , path = require('path'),
  vidStreamer = require("vid-streamer"),
   mime = require('mime'),
   fs = require('fs'),
   mongoose = require('mongoose'),
   orm = require('orm'),
    form = require('express-form'),
field = form.field;	
  
    

   var opts = {
  database : "nodedb",
  protocol : "mysql",
  host     : "localhost",
  port     : 3306,         // optional, defaults to database default
  username : "nodejs",
  password : "pass",
  query    : {
    pool  :  false,    // optional, false by default
    debug : false   // optional, false by default
  }
};

/*orm.connect(opts, function (err, db) {
	if (err) throw err;
		
	db.load("./models", function (err) {
    // loaded!
    var Person = db.models.person;
    var adress   = db.models.adress;
	
	 
});

	 

});*/
  

var app = express();

if ( template_engine == 'dust' ) {
	var dust = require('dustjs-linkedin')
	, cons = require('consolidate');

	app.engine('dust', cons.dust);

} else if ( template_engine == 'ejs' ) {
	app.engine('ejs', engine);
} else if ( template_engine == 'swig' ) {
	var swig = require('swig')
	, cons = require('consolidate');

	app.engine('swig', cons.swig);
	//app.set('view engine', 'html');
}

app.configure(function(){

	if ( template_engine == 'swig' ) {
		app.set('view engine', 'swig');
		app.set('view options', { layout: false });
	}

  app.set('template_engine', template_engine);
  app.set('domain', domain);
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', template_engine);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('wigglybits'));
	app.use(express.session({ secret: 'whatever', store: store }));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));

	//middleware
	app.use(function(req, res, next){
		if ( req.session.user ) {
			req.session.logged_in = true;
		}
		res.locals.message = req.flash();
		res.locals.session = req.session;
		res.locals.q = req.body;
		res.locals.err = false; 
		next();
	});
	
	app.use(orm.express("mysql://nodejs:pass@localhost/nodedb", {
    define: function (db, models) {
		
	 
			 models.person = db.define("person", {
					name      : String,
					surname   : String,
					userName  : String,
					email	  : String,
					phone	  : Number,
					adress	  : Object,
					data      : Object // JSON encoded
				}, {
					methods: {
						fullName: function () {
						   return this.name + ' ' + this.surname +' \n'+ this.email +' \n'+ this.phone;
						}
					},
					validations: {
						phone: orm.validators.rangeNumber(15, undefined, "phone-under-aged"),
						email: orm.validators.unique()
					}
			});

			 models.adress = db.define("adress", {
					street      : String,
					number   : String,
					zipcode  : String,
					town	  : String,
					country	  : String,
					owner 		: Number
					
				}, {
					methods: {
						fullAdress: function () {
						   return this.number + ' ' + this.street +' \n'+ this.zipcode + ' ' +this.town +' \n'+ this.country;
						}
					} 
			});
	
		
				
		db.sync(function (err) {
		!err && console.log("..... synced !");
		});

		
		
	
	 

    }
	
	
	
}));

});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.locals.inspect = require('util').inspect;
app.get('/', routes.index);
app.get("/test", routes.vidList);
app.get("/register", routes.registerForm);

app.post('/register',

  // Form filter and validation middleware
  form(
    field("userName").trim().required(),
    field("userEmail").trim().required().isEmail(),
	field("password").trim().required(),
	field("password_conf").trim().required().equals( 'field::password' )
  ),
  routes.registerAction );
 


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
