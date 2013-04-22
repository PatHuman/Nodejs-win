(function(){

var schema,mongoose;

mongoose =  require('../node_modules/mongoose');
Schema = mongoose.Schema;

var Comment = new Schema();

Comment.add({
    title     : { type: String, index: true }
  , date      : Date
  , body      : String
  , comments  : [Comment]
});


var BlogPost = new Schema({
    title     : { type: String, index: true }
  , slug      : { type: String, lowercase: true, trim: true }
  , date      : Date
  , buf       : Buffer
  , comments  : [Comment]
  , creator   : Schema.ObjectId
});

var Person = new Schema({
    name: {
        first: String
      , last : String
    }
  , email: { type: String, required: true, index: { unique: true, sparse: true } }
  , alive: Boolean
  , data: Object
});

userModel = mongoose.model('Person', Person);
blogPostModel = mongoose.model('BlogPost', BlogPost);

}).call(this);


