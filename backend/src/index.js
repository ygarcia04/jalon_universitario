const express = require('express');
const app = express();
const cors = require('cors');


require ('./database');

app.use(express.json());
app.use(cors());
//Esto haria que todas nuestras paginas lleven api antes de la ruta
//app.use('/api', require('./routes/index')); 
app.use(require('./routes/user'));
app.use(require('./routes/login'));
app.use(require('./routes/editProfile'));
app.use(require('./routes/change-password'));
app.use(require('./routes/rec-password'));
app.use(require('./routes/change-recover-password'));
app.use(require('./routes/delete-user'));


app.listen(3000);
console.log('server on port', 3000);