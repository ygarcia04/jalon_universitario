var mongoose = require('mongoose');

let bd ='paratus';
let port = 27017;
let host = 'localhost'

class Database{
  constructor(){
  	this.conectarBD();
  }

  conectarBD(){
  	mongoose.connect(`mongodb://${host}:${port}/${bd}`, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  	.then(res=>console.log('Se conecto a la DB en Mongo.'))
  	.catch(error=>console.log(error));
  }
}

module.exports = new Database();