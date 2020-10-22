import { Component, OnInit } from '@angular/core';
//inicializando servicio para autenticar
import { AuthService } from "../../services/auth.service";
//para redireccionar
import { Router } from "@angular/router";
import swal from 'sweetalert';
import { resetState } from 'sweetalert/typings/modules/state';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user ={
    email:'',
    password:'',
    direccion:'',
    nombres:'',
    apellidos:'',
    numeroCuenta:''

  }

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  
  signUp(){
    this.authService.signUp(this.user)
      .subscribe(
        res =>{
          if(res.estado=='correo'){
            swal("Error", "Debe usar un correo institucional de la UNAH", "warning");
          this.router.navigate(['/signup']);
          }else if(res.estado=='correo_repetido'){
            swal("Error", "Correo repetido", "warning");
            //this.router.navigate(['/signup']);
          }else if(res.estado=='email'){
            swal("Error", "No se pudo enviar el correo", "warning");
            //this.router.navigate(['/signup']);
          }else{
            localStorage.setItem('item', res.token);
            swal("Registro Exitoso", "Bienvenido a Jalón Universitario, revisa tu correo y a continuacion ingresa el codigo que recibiste", "success");
            this.router.navigate(['/verification']);
          }
          
        },
        err =>{
          //console.log(err);
          //this.router.navigate(['/signin']);
          swal("Error", "Sus datos ya existen en la base!", "warning");
          this.router.navigate(['/signup']);
        }
      )
  }

}
