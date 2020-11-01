const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/jalon-universitario', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('Base de datos conectada'))
.catch(err => console.error(err));
