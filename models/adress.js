
module.exports = function (db, cb) {
	
adress = db.define("adress", {
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
	
	 
	 
	
	return cb();
};


  