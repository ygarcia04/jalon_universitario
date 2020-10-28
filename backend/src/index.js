const express = require('express');
const app = express();
const cors = require('cors');


require ('./database');

app.use(express.json());
app.use(cors());
//Esto haria que todas nuestras paginas lleven api antes de la ruta
//app.use('/api', require('./routes/index')); 
app.use(require('./routes/index'));
app.use(require('./routes/login'));
app.use(require('./routes/edit-profile'));
app.use(require('./routes/change-password'));
//app.all(require('./routes/profile'));



app.listen(3000);
console.log('server on port', 3000);