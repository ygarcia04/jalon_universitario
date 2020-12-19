
import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//inicializando servicio para autenticar
import { AuthService } from "../../services/auth.service";
//para redireccionar
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as alertify from 'alertifyjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'abe-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss']
})
export class RutasComponent implements OnInit {
  user ={
    tipoDestino:'',
    hora: '',
    ruta:'', 
    asientos:0
   
  };
  template='';
  validate=true;

  constructor(
    private cdRef: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
    ) {  }
    public destino: string[] = ['Hacia la Universidad', 'Desde la Universidad'];


  ngOnInit(): void {
    if(this.authService.loggedInAdmin()){
      this.router.navigate(['/admin']);
    }else if (this.authService.loggedIn()){
      this.router.navigate(['/profile']);
    }
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
  }

  Ruta(){
    let rutas =this.user.ruta.split(',');
    if(this.validate==false){
      alertify.error('Verifique todos los campos ingresados');
      return false;

    }
    if(this.user.tipoDestino==""){
      alertify.error('No puede dejar el tipo de destino en blanco');
      return false
    }else if(this.user.ruta==""){
      alertify.error('No puede dejar la ruta en blanco');
      return false
    }else if(!this.user.hora.match(/(\d{2})\:(\d{2})/)){
      alertify.error('Favor use el formato de 24 horas HH:mm');
      return false
    }else if(this.user.asientos<0 || this.user.asientos>20){
      alertify.error('Número de asientos demasiado grande');
      return false
    }else {
      Swal.fire({​​
        title: "Seguro que desea guardar la ruta?",
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Continuar',
        denyButtonText: 'Cancelar',
      }​​)
      .then((agregarColonia)=>{
        if(agregarColonia.isConfirmed){
        this.authService.Ruta(this.user)
        .subscribe (
          res=>{
            if(res.estado=='hecho'){
              Swal.fire("Exitoso", "Se ha almacenado la ruta correctamente", "success");
              this.router.navigate(['/profile-driver']);
            }else if(res.estado=='repetido'){
              Swal.fire("Petición Repetida", "La ruta ya ha sido guardada", "warning");   
            }else {
              Swal.fire("Error", "No se pudo almacenar la ruta, intentelo de nuevo", "warning");          
            }
          }​​,
          err=>{​​
            Swal.fire("Error", "Hubo un fallo en el sistema, por favor intente de nuevo", "warning"); 
          }​​     
        )
        }
        ​​})
    } 
  }

}


