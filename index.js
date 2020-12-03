const express = require('express');
const app = express();
const cors = require('cors');


require ('./database');
/*var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }*/

app.use(express.json());
app.use(cors());
/*app.options('*', cors());
app.use(cors({origin:true,credentials: true}));*/
/*app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
});*/
//Esto haria que todas nuestras paginas lleven api antes de la ruta
//app.use('/api', require('./routes/index')); 
app.use(require('./routes/user'));
app.use(require('./routes/drive'));
app.use(require('./routes/useradmin'));
app.use(require('./routes/login'));
app.use(require('./routes/editProfile'));
app.use(require('./routes/change-password'));
app.use(require('./routes/rec-password'));
app.use(require('./routes/change-recover-password'));
app.use(require('./routes/delete-user'));
app.use(require('./routes/deletedlicencia'));
app.use(require('./routes/delete-revision'));
app.use(require('./routes/delete-placa'));
app.use(require('./routes/admin-charts'));
app.use(require('./routes/verification'));
app.use(require('./routes/resend-code'));
app.use(require('./routes/users'));
app.use(require('./routes/users-bloq'));
app.use(require('./routes/users-act'));
app.use(require('./routes/users-inact'));
app.use(require('./routes/upload-profile-pic'));
app.use(require('./routes/upload-licencia'));
app.use(require('./routes/upload-revision'));
app.use(require('./routes/upload-placa'));

app.listen(3000);
console.log('server on port', 3000);