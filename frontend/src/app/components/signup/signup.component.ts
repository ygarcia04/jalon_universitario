import { Component, OnInit } from '@angular/core';
//inicializando servicio para autenticar
import { AuthService } from "../../services/auth.service";
//para redireccionar
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user ={
    email:'',
    password: '',
    vpassword:'', 
    direccion:'',
    nombres:'',
    apellidos:'',
    numeroCuenta:'',
    facultad:'',
    fechaNacimiento:'',
    telefono: '',
    sexo: ''
  }

  public data: string[] = ['Ciencias Sociales', 'Química y Farmacia', 'Odontología',
  'Ciencias Jurídicas', 'Ingeniería', 'Humanidades y Artes', 'Ciencias Espaciales', 'Ciencias',
  'Ciencias Médicas', 'Ciencias Económicas, Administrativas y Contables'];

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void { 
  }
  
  signUp(){
    if(this.user.nombres==""){
      alertify.error('No puede dejar el nombre en blanco');
    }else if(this.user.apellidos==""){
      alertify.error('No puede dejar el apellido en blanco');
    }else if(this.user.email==""){
      alertify.error('No puede dejar el correo en blanco');
    }else if(this.user.password==""){
      alertify.error('No puede dejar el contraseña en blanco');
    }else if(this.user.vpassword==""){
      alertify.error('Se requiere verificar su contraseña');
    }else if(this.user.direccion==""){
      alertify.error('No puede dejar su dirección en blanco');
    }else if(this.user.numeroCuenta==""){
      alertify.error('No puede dejar el numero de cuenta en blanco');
    }else if(this.user.facultad==""){
      alertify.error('Debe selecionar la facultad a la que pertenece');
    }else if(this.user.telefono==""){
      alertify.error('No puede dejar el número de teléfono en blanco');
    }else if(this.user.fechaNacimiento==""){
      alertify.error('Debe seleccionar su fecha de nacimiento');
    }else{
      this.authService.signUp(this.user)
      .subscribe(
        res =>{
          if(res.estado=='correo'){
            Swal.fire("Error", "Debe usar un correo institucional de la UNAH", "warning");
          this.router.navigate(['/signup']);
          }else if(res.estado=='correo_repetido'){
            Swal.fire("Error", "Correo repetido", "warning");
            //this.router.navigate(['/signup']);
          }else if(res.estado=='password'){
            Swal.fire("Error", "Los campos de contraseña no coinciden", "warning");
            //this.router.navigate(['/signup']);
          }else if(res.estado=='email'){
            Swal.fire("Error", "No se pudo enviar el correo", "warning");
            //this.router.navigate(['/signup']);
          }else{
            localStorage.setItem('token', res.token);
            Swal.fire("Registro Exitoso", "Bienvenido a Jalón Universitario, revisa tu correo y a continuacion ingresa el codigo que recibiste", "success");
            this.router.navigate(['/verification']);
          }
          
        },
        err =>{
          //console.log(err);
          //this.router.navigate(['/signin']);
          Swal.fire("Error", "Sus datos ya existen en la base!", "warning");
          this.router.navigate(['/signup']);
        }
      )
    }

    
  }

}
