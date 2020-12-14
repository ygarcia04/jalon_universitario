import { formatDate } from '@angular/common';
import { Component, OnInit, HostListener, ViewChild,AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {AuthService} from '../../services/auth.service';
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'abe-jalones-pendientes-driver',
  templateUrl: './jalones-pendientes-driver.component.html',
  styleUrls: ['./jalones-pendientes-driver.component.scss']
})
export class JalonesPendientesDriverComponent implements OnInit {
//Childs necesarios para usar el ngAfterViewInit (para la paginacion)
@ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
@ViewChild(MdbTableDirective, {static: true}) mdbTable:MdbTableDirective;

//elementos a mostrar en la tabla del html
  elements: any = [];
//Arreglo de cabeceras de la tabla
  headElements = ['ID', 'Nombre', 'Apellido', 'Facultad','Direccion de Salida','Hora de Salida','Ruta','Descripcion' ,'Estado', 'Acciones'];
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
    correo:''
  }
  id={
    id:''
  }

constructor(
  private cdRef: ChangeDetectorRef,
  private authService: AuthService,
  private router: Router) { }
  //Listener para hacer la busqueda dinamica que no requiera un boton
  @HostListener('input') oninput() {
    this.searchItems();
}

  ngOnInit(): void {
    if(!this.authService.loggedInDriver()){
      this.router.navigate(['/home']);
    }else {
      this.authService.userState()
    .subscribe(
      res => {
        if(res.estado=='verificarCorreo'){
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
  
    /*Llamado a la funcion que trae la consulta del backend, lleva un parametro (this.elements) 
      porque en el servicio "auth" deje la funcion como si fuese post, en realidad deberia ser
      get y no deberia llevar ningun parametro asi que no se sorprendan por ver eso ahi*/
    this.authService.jalonesPendientesDriver()
    .subscribe(
      res=>{
        //Guardando el numero de elementos de la consulta hecha
        this.docs=res.User;
        //Guardando todos los elementos de la consulta hecha en users
        this.users=res.usuario;
        //Llamado a la funcion que llena los elementos a mostrar en la tabla
        this.fillItems(this.docs);
        
      },
      err=>{console.log('Error')}
    );
    }  
  }
  fillItems(limit){
    for (let i = 0; i < limit; i++) {
      /*Llenando el arreglo de elementos, para agregar mas datos solo deben incluir una nueva linea
        Con la forma: nombreIndice: this.user[i].campoDeLaConsulta, tambien recuerden agregar un
        valor a headElements para el encabezado de cada columna que agreguen*/
        let numero=i+1;
      this.elements.push({
        ID:i.toString(),
        Nombre: this.users[i].nombrespasajero,
        Apellido: this.users[i].apellidospasajero,
        Facultad: this.users[i].facultadpasajero,
        Email:this.users[i].emailpasajero,
        DireccionSalida:this.users[i].tipoDestino,
        HoraSalida: this.users[i].horaSalida,
        Ruta: this.users[i].ruta,
        Descripcion:this.users[i].descripcion,
        Estado: this.users[i].estadoSolicitud,
        _id:this.users[i]._id
      });
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
          this.elements = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, ['Nombre', 'Apellido','Correo', 'Numero de cuenta', 'Estado']);
          this.mdbTable.setDataSource(prev);
      }
  }
  
  //Paginacion
  ngAfterViewInit() {
    //Cantidad de elementos por pagina, en este caso 1
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(4);
  
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  
  fomatearFecha(fecha){
    var date = new Date(fecha);
    var opciones={ year: 'numeric', month:'long', day:'numeric'};
    return date.toLocaleString('es-MX', opciones);
  
  }
  rechazar(id){
    this.id.id=id
    Swal.fire({
      title: "Seguro que quieres rechazar?",
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Continuar',
      denyButtonText: 'Cancelar',
    })
    .then((Delete)=>{
      if(Delete.isConfirmed){
    this.authService.rechazarJalon(this.id)
    .subscribe(
      res =>{
        if(res.estado=='usuario'){
          Swal.fire("Error", "No se pudo eliminar el usuario", "warning");
        }else{ 
          Swal.fire("Rechazado", "Se ha rechazado la solicitud", "success")
          .then((avanzar)=>{
            location.reload();
          })
        }
        
      },
      err =>{
        Swal.fire("Error", "Hubo un error en el sistema, favor intente de nuevo!", "warning");
        
      }
    )
      }
    })
    
  
  }
  aceptar(id){
    this.id.id=id
    Swal.fire({
      title: "Seguro que quieres aceptar?",
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Continuar',
      denyButtonText: 'Cancelar',
    })
    .then((Delete)=>{
      if(Delete.isConfirmed){
    this.authService.aceptarJalon(this.id)
    .subscribe(
      res =>{
        if(res.estado=='usuario'){
          Swal.fire("Error", "Hubo un error al intentar aceptar, intente de nuevo", "warning");
        }else{ 
          Swal.fire("Aceptado", "Usted ha aceptado el jalón solicitado, se le ha enviado una notificación a su correo y al del pasajero", "success")
          .then((avanzar)=>{
            location.reload();
          })
        }
        
      },
      err =>{
        Swal.fire("Error", "Hubo un error en el sistema, favor intente de nuevo!", "warning");
        
      }
    )
      }
    })
    
  
  }

}
