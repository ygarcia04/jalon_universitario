import { Component, OnInit } from '@angular/core';
//inicializando servicio para autenticar
import { AuthService } from "../../services/auth.service";
//para redireccionar
import { Router } from "@angular/router";
import swal from 'sweetalert';
import {FormsModule} from '@angular/forms'
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

/*export interface facultad{

}*/
/*export interface facultad {
    nombre: String
}*/

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
 // registro = FormGroup;
 /*private facultad: facultad[] = [
   { nombre: "ciencias" },
   { nombre: "sistemas" }
 ]*/
 public data: string[] = ['Ciencias Sociales', 'Química y Farmacia', 'Odontología',
'Ciencias Jurídicas', 'Ingeniería', 'Humanidades y Artes', 'Ciencias Espaciales', 'Ciencias',
'Ciencias Médicas', 'Ciencias Económicas, Administrativas y Contables'];
 //getFacultad(): facultad[]{return this.facultad;}
/*
  registroForm = this.fb.group({
    email:'',
    password: ['', [Validators.required, Validators.minLength(5)]], 
    direccion:'',
    nombres: '',
    apellidos:'',
    numeroCuenta:'',
    carrera:'',
    fechaNacimiento:'',
    telefono: '',
    sexo: ''
  })*/

  user ={
    email:'',
    password: "", 
    direccion:'',
    nombres:'',
    apellidos:'',
    numeroCuenta:'',
    facultad:''
  }

  constructor(
    private authService: AuthService,
    //private fb: FormBuilder,
    private router: Router
    ) { };


  ngOnInit(): void {  }
//this.facultad = this.getFacultad();
  
/*
  checarSiSonIguales():  boolean  {
    return  this.app.hasError('noSonIguales')  &&
      this.app.get('password').dirty &&
      this.app.get('vpassword').dirty;
  }*/
	 

  signUp(){
    console.log (this.user)
    this.authService.signUp(this.user)
      .subscribe(
        res =>{
          if(res.estado=='correo'){
            swal("Error", "Debe usar un correo institucional de la UNAH", "warning");
          this.router.navigate(['/signup']);
          }else{
            console.log(res);
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

 /* getErrorMessage(field, String): String{
    let message = "";
    if (this.registroForm.get(field).errors.required){
      message = "You must enter a value";
    }else if (this.registroForm.get(field).hasError('minlength')){
      message: "this field"
    }
      return message;
  }
  isValidField(field, String): boolean{
    return (this.registroForm.get(field).touched || this.registroForm.get(field).dirty &&
    !this.registroForm.get(field).valid)
  }*/



}

