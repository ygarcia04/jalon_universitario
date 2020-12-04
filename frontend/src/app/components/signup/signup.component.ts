import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  signup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ]),
    vpassword: new FormControl('', [Validators.required, Validators.min(3) ])
  });s
  hide = true;
  hide2= true;
  get emailInput() { return this.signup.get('email'); }
  get passwordInput() { return this.signup.get('password'); }
  get vpasswordInput() { return this.signup.get('vpassword'); }

  anio:Number;
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
  };
  template='';
  validate=true;

  public data: string[] = ['Ciencias Sociales', 'Química y Farmacia', 'Odontología',
  'Ciencias Jurídicas', 'Ingeniería', 'Humanidades y Artes', 'Ciencias Espaciales', 'Ciencias',
  'Ciencias Médicas', 'Ciencias Económicas, Administrativas y Contables'];

  constructor(
    private authService: AuthService,
    private router: Router
    ) { 
      let date = new Date();
      this.anio=date.getFullYear(); 
    }

  ngOnInit(): void { 
  }
  verify(){
    var pass= this.signup.value.password;
    console.log(pass);
    if(pass.length<8){
      this.template='<div class="alert alert-warning" role="alert"><div>La contraseña debe tener al menos 8 caracteres.</div></div>';
      this.validate=false;
    }else if(!pass.match(/[0-9]/)){
      this.template='<div class="alert alert-warning" role="alert"><div>Debe incluir al menos un número en su contraseña.</div></div>';
      this.validate=false;
    }else if(!pass.match(/[A-Z]/)){
      this.template='<div class="alert alert-warning" role="alert"><div>Debe incluir al menos una mayúscula en su contraseña.</div></div>';
      this.validate=false;
    }else if(!pass.match(/[a-z]/)){
      this.template='<div class="alert alert-warning" role="alert"><div>Debe incluir al menos una minúscula en su contraseña.</div></div>';
      this.validate=false;
    }else if(!pass.match(/[_\/\*\$.\\\[\]\(\):;,\?!@#¬'+\{\}`^¨]/)){
      this.template='<div class="alert alert-warning" role="alert"><div>Debe incluir al menos un caracter NO alfa-numérico en su contraseña.</div></div>';
      this.validate=false;
    }else{
      this.template='';
      this.validate=true;
    }
  }
  
  signUp(){
    if(this.validate==false){
      alertify.error('Verifique todos los campos ingresados');
      return false;
    }
    this.user.password = this.signup.value.password;
    if(this.user.password==""){
      this.template='<div class="alert alert-warning" role="alert"><div>No puede dejar la contraseña en blanco.</div></div>';
      return false;
    }
    this.user.vpassword = this.signup.value.vpassword;
    console.log(this.user);
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
      alertify.error('No puede dejar el nùmero de cuenta en blanco');
    }else if(this.user.facultad==""){
      alertify.error('Debe seleccionar la facultad a la que pertenece');
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
          Swal.fire("Error", "Hubo un error en el sistema, favor intente de nuevo!", "error");
          this.router.navigate(['/signup']);
        }
      )
    }

    
  }

}
