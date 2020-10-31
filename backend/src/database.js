const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Daniel:Paseo.2234@jalon-universitario.2jmqy.mongodb.net/jalon-universitario?retryWrites=true&w=majority', {
//mongoose.connect('mongodb://localhost/jalon-universitario', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('Base de datos conectada'))
.catch(err => console.error(err));