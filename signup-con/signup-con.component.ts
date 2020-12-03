import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//inicializando servicio para autenticar
import { AuthService } from "../../services/auth.service";
//para redireccionar
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as alertify from 'alertifyjs';

@Component({
  selector: 'abe-signup-con',
  templateUrl: './signup-con.component.html',
  styleUrls: ['./signup-con.component.scss']
})
export class SignupConComponent implements OnInit {

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
  driver ={
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
    sexo: '',
    identidad: ''
  };
  template='';
  validate=true;
  hecho = false;

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
  
  signUpCon(){
    if(this.validate==false){
      alertify.error('Verifique todos los campos ingresados');
      return false;
    }
    this.driver.password = this.signup.value.password;
    if(this.driver.password==""){
      this.template='<div class="alert alert-warning" role="alert"><div>No puede dejar la contraseña en blanco.</div></div>';
      return false;
    }
    this.driver.vpassword = this.signup.value.vpassword;
    console.log(this.driver);
    if(this.driver.nombres==""){
      alertify.error('No puede dejar el nombre en blanco');
    }else if(this.driver.apellidos==""){
      alertify.error('No puede dejar el apellido en blanco');
    }else if(this.driver.identidad==""){
      alertify.error('No puede dejar el número de identidad en blanco');  
    }else if(this.driver.email==""){
      alertify.error('No puede dejar el correo en blanco');
    }else if(this.driver.password==""){
      alertify.error('No puede dejar la contraseña en blanco');
    }else if(this.driver.vpassword==""){
      alertify.error('Se requiere verificar su contraseña');
    }else if(this.driver.direccion==""){
      alertify.error('No puede dejar su dirección en blanco');
    }else if(this.driver.numeroCuenta==""){
      alertify.error('No puede dejar el numero de cuenta en blanco');
    }else if(this.driver.facultad==""){
      alertify.error('Debe selecionar la facultad a la que pertenece');
    }else if(this.driver.telefono==""){
      alertify.error('No puede dejar el número de teléfono en blanco');
    }else if(this.driver.fechaNacimiento==""){
      alertify.error('Debe seleccionar su fecha de nacimiento');  
      
    } else if(! this.driver.numeroCuenta.match('/[0-9]+/')){
      alertify.error('El número de cuenta sólo debe incluir números');
    } else if(! this.driver.identidad.match('/[0-9]+/')){
      alertify.error('El número de cuenta sólo debe incluir números');
    }else if(! this.driver.nombres.match('/[a-z A-Z]+/')){
      alertify.error('El nombre de usuario sólo debe incluir letras');
    }else if(! this.driver.apellidos.match('/[a-z A-Z]+/')){
      alertify.error('El apellido de usuario sólo debe incluir letras');
    }  else if(! this.driver.telefono.match('/[0-9]+/')){
      alertify.error('El número de télefono sólo debe incluir números');
    } else {
       console.log(this.driver);
       this.hecho = true;
    }

  }

}
