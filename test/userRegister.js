 
 
var user,mongoose, register;

mongoose =  require('../node_modules/mongoose');
user = require('../models/users');

mongoose.connect('mongodb://localhost/test', function(err) {
  if (err) { throw err; }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log(' yay!');
});
 

register = function(){

	var model, data ;
	data={
	    name: {
        first: 'Toto'
      , last : 'TesterMan'
    }
  , email: 'toto@home.be'
  , alive: 'true'
  ,	data:[ {setting:'none'}, {options:'none'}]
	}
	
	// model = new user.userModel(data);
	model = mongoose.model.Person(data);
	
	return model.save(function(err, item){
	
		if(err){ return console.log(err);}else{return console.log(item);}
		 mongoose.connection.close();
	});
};
 
 

 