
import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//inicializando servicio para autenticar
import { AuthService } from "../../services/auth.service";
//para redireccionar
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as alertify from 'alertifyjs';

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
    asientos:''
   
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
  }

  Ruta(){
    let rutas =this.user.ruta.split(',');
    console.log(rutas.length)
    if(this.validate==false){
      alertify.error('Verifique todos los campos ingresados');
      return false;

    }
    if(this.user.tipoDestino==""){
      alertify.error('No puede dejar el tipo de destino en blanco');
      return false
    }else if(this.user.ruta==""){
      alertify.error('No puede dejar la colonia en blanco');
      return false
    }else if(!this.user.hora.match(/(\d{2})\:(\d{2})/)){
      alertify.error('Favor use el formato de 24 horas HH:mm');
      return false
    }else {
      Swal.fire({​​
        title: "Seguro que desea guardar la colonia?",
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
              Swal.fire("Exitoso", "Se ha almacenado la colonia correctamente", "success");
              this.router.navigate(['/profile-driver']);
            }else if(res.estado=='repetido'){
              Swal.fire("Petición Repetida", "La colonia ya ha sido guardado", "warning");   
            }else {
              Swal.fire("Error", "No se pudo almacenar la colonia, intentelo de nuevo", "warning");          
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


