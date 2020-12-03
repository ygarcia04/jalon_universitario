import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
//inicializando servicio para autenticar
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs";
//para redireccionar
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as alertify from 'alertifyjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { $ } from 'protractor';

@Component({
  selector: 'abe-signupdrive',
  templateUrl: './signupdrive.component.html',
  styleUrls: ['./signupdrive.component.scss']
})
export class SignupdriveComponent implements OnInit {
  selectedFile: File = null;
  fd = new FormData(); //fd para la imagen de la licencia
  fdr = new FormData(); //fdr para la imagen de la revision
  fdp = new FormData(); //fdp para la imagen de la placa
 
  signup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ]),
    vpassword: new FormControl('', [Validators.required, Validators.min(3) ])
  });
  hide = true;
  hide2= true;
  get emailInput() { return this.signup.get('email'); }
  get passwordInput() { return this.signup.get('password'); }
  get vpasswordInput() { return this.signup.get('vpassword'); }

  anio:Number;
  user ={
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    vpassword: '',
    numeroCuenta: '',
    identidad: '',
    direccion: '',
    facultad: '',
    fechaNacimiento: '',
    telefono: '',
    sexo: '',
    marca: '',
    modelo: '',
    tipo: '',
    color: '',
    motor: '',
    anio: '',
    placa: '',
    picLicencia: '',
    picRevision: '',
    picPlaca: ''
  };
  template='';
  validate=true;

  public data: string[] = ['Ciencias Sociales', 'Química y Farmacia', 'Odontología',
  'Ciencias Jurídicas', 'Ingeniería', 'Humanidades y Artes', 'Ciencias Espaciales', 'Ciencias',
  'Ciencias Médicas', 'Ciencias Económicas, Administrativas y Contables'];

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
    ) { 
      let date = new Date();
      this.anio=date.getFullYear(); 
    }

  ngOnInit(): void { 
  }

  //Para la licencia
  createFormData(event) {
    this.fd=new FormData();
    this.selectedFile = <File>event.target.files[0];
    let fileName=this.selectedFile.name.split(".").pop();
    console.log (fileName)
    if(fileName == null){
        alert('No es jpeg');
        this.fd=null;
        return false;
    }
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
  }

  //Para la revision
  createFormDatar(event) {
    this.fdr=new FormData();
    this.selectedFile = <File>event.target.files[0];
    let fileName=this.selectedFile.name.split(".").pop();
    console.log (fileName)
    if(fileName == null){
        alert('No es jpeg');
        this.fdr=null;
        return false;
    }
    this.fdr.append('file', this.selectedFile, this.selectedFile.name);
  }

//Para la placa
createFormDatap(event) {
  this.fdp=new FormData();
  this.selectedFile = <File>event.target.files[0];
  let fileName=this.selectedFile.name.split(".").pop();
  console.log (fileName)
  if(fileName == null){
      alert('No es jpeg');
      this.fdp=null;
      return false;
  }
  this.fdp.append('file', this.selectedFile, this.selectedFile.name);
}

  //Licencia
  upload() {
    if(this.fd==null){
      alert('Debe ingresar una imagen de la licencia');
    }else{
    this.authService.uploadLicencia(this.fd,this.user.email)
    .subscribe( result => {
      if (result.estado == "error"){
        this.authService.deleteDriveLicencia(this.user.email).subscribe(res => {}, err => {});
        Swal.fire("Error", "Debe incluir una imagen de la licencia", "error");
      }else{
        //Swal.fire("Registro Exitoso", "Bienvenido a Jalón Universitario, revisa tu correo y a continuacion ingresa el codigo que recibiste", "success");
        this.uploadr();
      }
      
    },
    error=>{
      alert('Error');
    });

    }     
  }

  //Revision
  uploadr() {
    if(this.fdr==null){
      alert('Debe ingresar una imagen de la revisión');
    }else{
    this.authService.uploadRevision(this.fdr,this.user.email)
    .subscribe( result => {
      if (result.estado == "error"){
        this.authService.deleteDriveRevision(this.user.email).subscribe(res => {}, err => {});
        Swal.fire("Error", "Debe incluir una imagen de la revisión", "error");
      }else{
        //Swal.fire("Registro Exitoso", "Bienvenido a Jalón Universitario, revisa tu correo y a continuacion ingresa el codigo que recibiste", "success");
        this.uploadp();
      }
      
    },
    error=>{
      alert('Error');
    });

    }     
  }

  //Placa
  uploadp() {
    if(this.fdp==null){
      alert('Debe ingresar una imagen de su vehículo');
    }else{
    this.authService.uploadPlaca(this.fdp,this.user.email)
    .subscribe( result => {
      if (result.estado == "error"){
        this.authService.deleteDrivePlaca(this.user.email).subscribe(res => {}, err => {});
        Swal.fire("Error", "Debe incluir una imagen de su vehículo", "error");
      }else{
        Swal.fire("Registro Exitoso", "Bienvenido a Jalón Universitario, revisa tu correo y a continuacion ingresa el codigo que recibiste", "success");
      }
      
    },
    error=>{
      alert('Error');
    });

    }     
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

  signupdrive(){
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
      alertify.error('No puede dejar la contraseña en blanco');
    }else if(this.user.vpassword==""){
      alertify.error('Se requiere verificar su contraseña');
    }else if(this.user.direccion==""){
      alertify.error('No puede dejar su dirección en blanco');
    }else if(this.user.numeroCuenta==""){
      alertify.error('No puede dejar el número de cuenta en blanco');
    }else if(this.user.identidad==""){
      alertify.error('No puede dejar el número de identidad en blanco'); 
    }else if(this.user.facultad==""){
      alertify.error('Debe seleccionar la facultad a la que pertenece');
    }else if(this.user.telefono==""){
      alertify.error('No puede dejar el número de teléfono en blanco');
    }else if(this.user.fechaNacimiento==""){
      alertify.error('Debe seleccionar su fecha de nacimiento');
    }else if(this.user.marca==""){
      alertify.error('No puede dejar la marca en blanco');
    }else if(this.user.modelo==""){
      alertify.error('No puede dejar el modelo en blanco');
    }else if(this.user.tipo==""){
      alertify.error('No puede dejar el tipo de vehículo en blanco');
    }else if(this.user.color==""){
      alertify.error('No puede dejar el color en blanco');
    }else if(this.user.motor==""){
      alertify.error('No puede dejar el tipo de motor en blanco');
    }else if(this.user.anio==""){
      alertify.error('No puede dejar el año del vehículo en blanco');
    }else if(this.user.placa==""){
      alertify.error('No puede dejar el número de placa en blanco');
    } else if(!this.user.numeroCuenta.match(/^[0-9]+$/)){
      alertify.error('El número de cuenta sólo debe incluir números');
    } else if(!this.user.identidad.match(/^[0-9]+$/)){
      alertify.error('El identidad sólo debe incluir números');
    }else if(!this.user.nombres.match(/^[a-z A-Z]+$/)){
      alertify.error('El nombre de usuario sólo debe incluir letras');
    }else if(!this.user.apellidos.match(/^[a-z A-Z]+$/)){
      alertify.error('El apellido de usuario sólo debe incluir letras');
    } else if(!this.user.telefono.match(/^[0-9]+$/)){
      alertify.error('El número de télefono sólo debe incluir números');
    }else{
      this.authService.signupdrive(this.user)
      .subscribe(
        res =>{
          if(res.estado=='correo'){
            Swal.fire("Error", "Debe usar un correo institucional de la UNAH", "warning");
          this.router.navigate(['/signupdrive']);
          }else if(res.estado=='correo_repetido'){
            Swal.fire("Error", "Correo repetido", "warning");
            //this.router.navigate(['/signup']);
          /*}else if(res.estado=='password'){
            Swal.fire("Error", "Los campos de contraseña no coinciden", "warning");
            //this.router.navigate(['/signup']);*/
          }else if(res.estado=='email'){
            Swal.fire("Error", "No se pudo enviar el correo", "warning");
            //this.router.navigate(['/signup']);
          }else{
            localStorage.setItem('token', res.token);
            //Swal.fire("Registro Exitoso", "Bienvenido a Jalón Universitario, revisa tu correo y a continuacion ingresa el codigo que recibiste", "success");
            this.upload()
          }
          
        },
        err =>{
          //console.log(err);
          //this.router.navigate(['/signin']);
          Swal.fire("Error", "Hubo un error en el sistema, favor intente de nuevo!", "error");
          this.router.navigate(['/signupdrive']);
        }
      )
    } 
  }
  //Licencia
  getImage(): Observable<SafeResourceUrl> {
    return  this.authService.getProfileLicencia();
  }
  //Revision
  getImager(): Observable<SafeResourceUrl> {
    return  this.authService.getProfileRevision();
  }
  //Placa
  getImagep(): Observable<SafeResourceUrl> {
    return  this.authService.getProfilePlaca();
  }
}
