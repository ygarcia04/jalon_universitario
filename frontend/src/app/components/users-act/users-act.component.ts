import { Component, OnInit, HostListener, ViewChild,AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {AuthService} from '../../services/auth.service';
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: 'abe-users-act',
  templateUrl: './users-act.component.html',
  styleUrls: ['./users-act.component.scss']
})
export class UsersActComponent  implements OnInit {
  //Childs necesarios para usar el ngAfterViewInit (para la paginacion)
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, {static: true}) mdbTable:MdbTableDirective;

  //elementos a mostrar en la tabla del html
    elements: any = [];
  //Arreglo de cabeceras de la tabla
    headElements = ['ID', 'Nombre', 'Apellido', 'Correo', 'Cuenta','Genero','Direccion', 'Creado', 'Actualizado', 'Estado'];
  //variable para la busqueda
    searchText: string = '';
  //variable para el Datasource de la tabla
    previous: string;
  /* variable para la cantidad de documentos de la base y asi saber el tamaño 
    que tendra el arreglo elements*/
    docs:number;
  //Arreglo para almacenar los datos recibidos de la consulta a la base
    users:any=[];
  //Modelo usuario a eliminar
    user={
      correo:''
    }

  constructor(
    private cdRef: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router) { }

//Listener para hacer la busqueda dinamica que no requiera un boton
  @HostListener('input') oninput() {
    this.searchItems();
}

ngOnInit() {
  if(!this.authService.loggedInAdmin()){
    this.router.navigate(['/home']);
  }else{
  /*Llamado a la funcion que trae la consulta del backend, lleva un parametro (this.elements) 
    porque en el servicio "auth" deje la funcion como si fuese post, en realidad deberia ser
    get y no deberia llevar ningun parametro asi que no se sorprendan por ver eso ahi*/
  this.authService.viewUsersAct()
  .subscribe(
    res=>{
      //Guardando el numero de elementos de la consulta hecha
      this.docs=res.User;
      console.log(this.docs);
      //Guardando todos los elementos de la consulta hecha en users
      this.users=res.usuario;
      //Llamado a la funcion que llena los elementos a mostrar en la tabla
      this.fillItems(this.docs);
      
    },
    err=>{console.log(err)}
  );
  } 
    
}

fillItems(limit){
  for (let i = 0; i < limit; i++) {
    /*Llenando el arreglo de elementos, para agregar mas datos solo deben incluir una nueva linea
      Con la forma: nombreIndice: this.user[i].campoDeLaConsulta, tambien recuerden agregar un
      valor a headElements para el encabezado de cada columna que agreguen*/
    console.log(this.users[i].nombres);
    this.elements.push({
        ID:i.toString(),
        Nombre: this.users[i].nombres,
        Apellido: this.users[i].apellidos,
        Correo: this.users[i].email,
        Cuenta: this.users[i].numeroCuenta,
        Genero: this.users[i].sexo,
        Direccion: this.users[i].direccion,
        Creado: this.fomatearFecha( this.users[i].createdAt),
        Actualizado: this.fomatearFecha(this.users[i].updatedAt),
        Estado: this.users[i].estado
    });
}
  this.mdbTable.setDataSource(this.elements);
  this.previous = this.mdbTable.getDataSource();
  console.log(this.elements);
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

eliminar(correo){
  console.log(correo);
  Swal.fire({
    title: "Seguro que quieres eliminar la cuenta?",
    icon: 'question',
    showDenyButton: true,
    confirmButtonText: 'Continuar',
    denyButtonText: 'Cancelar',
  })
  .then((Delete)=>{
    if(Delete.isConfirmed){
      this.user.correo=correo;
  this.authService.deleteUserAdmin(this.user)
  .subscribe(
    res =>{
      if(res.estado=='usuario'){
        Swal.fire("Error", "No se pudo eliminar el usuario", "warning");
      }else{ 
        Swal.fire("Usuario Eliminado", "Se ha eliminado el usuario de la base de datos", "success")
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
