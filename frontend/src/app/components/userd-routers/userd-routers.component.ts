import { formatDate } from '@angular/common';
import { Component, OnInit, HostListener, ViewChild,AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import { HttpErrorResponse } from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: 'abe-userd-routers',
  templateUrl: './userd-routers.component.html',
  styleUrls: ['./userd-routers.component.scss']
})
export class UserdRoutersComponent implements OnInit {
//Childs necesarios para usar el ngAfterViewInit (para la paginacion)
@ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
@ViewChild(MdbTableDirective, {static: true}) mdbTable:MdbTableDirective;

//elementos a mostrar en la tabla del html
  elements: any = [];
//Arreglo de cabeceras de la tabla
  headElements = ['ID', 'Nombre', 'Apellido', 'Facultad', 'Tipo de Vehículo', 'Dirección','Asientos', 'Hora de Salida', 'Tipo Destino'];
//variable para la busqueda
  searchText: string = '';
//variable para el Datasource de la tabla
  previous: string;
/* variable para la cantidad de documentos de la base y asi saber el tamaño 
  que tendra el arreglo elements*/
  docs:number;
//Arreglo para almacenar los datos recibidos de la consulta a la base
  users:any=[];
  user={
    email:'',
    Nombre: '',
    Apellido: '',
    Facultad: '',
    TipoVehiculo: '',
    HoraSalida: '',
    Ruta: '',
    TipoDestino: '',
    Asientos:'',
    Descripcion:''
  }

constructor(
  private cdRef: ChangeDetectorRef,
  private authService: AuthService,
  private router: Router) { }

public destino: string[] = ['Hacia la Universidad', 'Desde la Universidad'];

//Listener para hacer la busqueda dinamica que no requiera un boton
@HostListener('input') oninput() {
  this.searchItems();
}

ngOnInit() {
  this.authService.userState()
    .subscribe(
      res => {
        if(res.estado=='inactivo'){
          this.router.navigate(['/verification']);
          Swal.fire("Error", "Debe verificar su usuario para usar Jalón Universitario", "warning");
        }     
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/signin']);
          }
        }
      }
    )
if(this.authService.loggedInDriver()){
  this.router.navigate(['/profile-driver']);
}else if(this.authService.loggedInAdmin()){
  this.router.navigate(['/admin']);
}else{
/*Llamado a la funcion que trae la consulta del backend, lleva un parametro (this.elements) 
  porque en el servicio "auth" deje la funcion como si fuese post, en realidad deberia ser
  get y no deberia llevar ningun parametro asi que no se sorprendan por ver eso ahi*/
this.authService.viewDriversroute()
.subscribe(
  res=>{
    //Guardando el numero de elementos de la consulta hecha
    this.docs=res.count;
    //this.docs = res.Routed;
    //Guardando todos los elementos de la consulta hecha en users
    this.users=res.drivers;
    
    //Llamado a la funcion que llena los elementos a mostrar en la tabla
    this.fillItems(this.docs);
  },
  err=>{console.log('Error')}
);
}  
  
}

fillItems(limit){
  let numero=1;
for (let i = 0; i < limit; i++) {
  /*Llenando el arreglo de elementos, para agregar mas datos solo deben incluir una nueva linea
    Con la forma: nombreIndice: this.user[i].campoDeLaConsulta, tambien recuerden agregar un
    valor a headElements para el encabezado de cada columna que agreguen*/
   let numero=1;
   if(this.users[i].asientos>0){
    this.elements.push({
      ID:numero.toString(),
      email: this.users[i].email,
      Nombre: this.users[i].nombres,
      Apellido: this.users[i].apellidos,
      Facultad: this.users[i].facultad,
      TipoVehiculo: this.users[i].tipoVehiculo,
      Ruta: this.users[i].ruta,
      HoraSalida: this.users[i].horaSalida,
      TipoDestino: this.users[i].tipoDestino,
      Asientos: this.users[i].asientos
    });
    numero++;
   }
      
    
}
this.mdbTable.setDataSource(this.elements);
this.previous = this.mdbTable.getDataSource();
}

searchItems() {
  const prev = this.mdbTable.getDataSource();
  if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
  }
  if (this.searchText) {
    /*Busqueda dentro de los datos de la tabla, si se desea agregar un nuevo campo a la busqueda, 
      Solo hay que agregar al arreglo de la funcion el nombre del indice usado en fillItems()
      para el campo que se desea incluir en la busqueda*/
      this.elements = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, ['Nombre', 'Apellido','Facultad', 'TipoVehiculo', 'Ruta', 'HoraSalida', 'TipoDestino']);
      this.mdbTable.setDataSource(prev);
  }
}

async pedirJalon(email, Nombre, Apellido, Facultad, TipoVehiculo, Ruta, HoraSalida, TipoDestino, Asientos){
  const { value: text } = await Swal.fire({
    input: 'textarea',
    inputLabel: 'Ingrese una descripcion de un lugar accesible donde esperaría',
    inputPlaceholder: 'Descripcion de la ubicacion...',
    inputAttributes: {
      maxlength: '100',
      'aria-label': 'Descripcion de la ubicacion...'
    },
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    showCancelButton: true
  })
  if (text) {
    this.user.Descripcion=text;
    this.user.email = email;
    this.user.Nombre = Nombre;
    this.user.Apellido = Apellido;
    this.user.Facultad = Facultad;
    this.user.TipoVehiculo = TipoVehiculo;
    this.user.HoraSalida = HoraSalida;
    this.user.Ruta = Ruta;
    this.user.TipoDestino = TipoDestino;
    this.user.Asientos= Asientos;
this.authService.pedirJalonDriver(this.user)
  .subscribe(
    res=>{
      if(res.estado=='email'){
        Swal.fire("Correo no enviado", "Ya ha sido enviada anteriormente", "warning");
        this.router.navigate(['/profile']);
      }else if(res.estado=='hecho'){
        Swal.fire("Petición Enviada", "Se le avisará una vez sea aceptada la petición", "success");
        this.router.navigate(['/profile']);
      }else if(res.estado=='repetido'){
        Swal.fire("Petición Repetida", "Ya ha sido enviada anteriormente", "warning");
        this.router.navigate(['/profile']);
      }else{
        Swal.fire("Error", "No se pudo enviar la solicitud", "warning");
          this.router.navigate(['/userd-routes']);
      }
    },
    err=>{
      Swal.fire("Error", "Hubo un fallo en el sistema, por favor intente de nuevo", "warning");
          this.router.navigate(['/userd-routes']);
    }
  )
  }else{
    Swal.fire("Error", "Favor incluya descripción de donde podría esperar", "warning");
  }
}

//Paginacion
ngAfterViewInit() {
//Cantidad de elementos por pagina, en este caso 1
this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);

this.mdbTablePagination.calculateFirstItemIndex();
this.mdbTablePagination.calculateLastItemIndex();
this.cdRef.detectChanges();
}

fomatearFecha(fecha){
var date = new Date(fecha);
var opciones={ year: 'numeric', month:'long', day:'numeric'};
return date.toLocaleString('es-MX', opciones);

}

}

