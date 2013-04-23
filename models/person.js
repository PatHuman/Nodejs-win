
exports.person = function (db, cb) {

     
	
db.define("person", {
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
	
	 
	
	
	return cb();
};


  