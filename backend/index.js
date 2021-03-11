//paquetes
var express=require('express');
var cors=require('cors');

//funcionalidades paquetes
var app=express();

//rutas
var database= require('./modules/mongo-db');

//middleware.

//permite peticiones de otros tipos de origenes.
app.use(express.json());
app.use(cors());

//permite el acceso a los parametros enviados mediante post , es decir al cuerpo de la peticion.
app.use(require ('./routes/rec-password'));





app.listen(4000,function(){
     console.log('El Servidor esta levantado.');

});

