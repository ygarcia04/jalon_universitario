import { Component, OnInit } from '@angular/core';
import {  AuthService} from "../../services/auth.service";
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from "rxjs";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
//para redireccionar
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: 'abe-edit-profile-driver',
  templateUrl: './edit-profile-driver.component.html',
  styleUrls: ['./edit-profile-driver.component.scss']
})
export class EditProfileDriverComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer) { 
      this.uploadForm = this.formBuilder.group({
        avatar: [null]
      });
    }

  selectedFile: File = null;
  fd = new FormData();
  public imagePath;
  imgURL: any;
  url:any;
  newURL;
  public message: string;
  uploadForm: FormGroup;
  profile={
    nombres:'',
    direccion:'',
    apellidos:'',
    registro:'',
    telefono:'',
    carrera:'',
    numeroCuenta:'',
    email:'',
    picPerfil:'',
    facultad:''
  }
  public data: string[] = ['Ciencias Sociales', 'Química y Farmacia', 'Odontología',
  'Ciencias Jurídicas', 'Ingeniería', 'Humanidades y Artes', 'Ciencias Espaciales', 'Ciencias',
  'Ciencias Médicas', 'Ciencias Económicas, Administrativas y Contables'];

  ngOnInit(){
    this.authService.userState()
    .subscribe(
      res => {
        if(res.estado=='verificarCorreo'){
          this.router.navigate(['/verification']);
          Swal.fire("Error", "Debe verificar su usuario para usar Jalón Universitario", "warning");
        }else{
          this.authService.getProfile()
          .subscribe(
            res => {//console.log(res.User.nombres);
              this.profile=res.Driver;
              console.log();
                this.getImage().subscribe(x => this.imgURL = x)             
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
   createFormData(event) {
      //this.selectedFile=null;
      this.fd=new FormData();
      this.selectedFile = <File>event.target.files[0];
      let fileName=this.selectedFile.name.split(".").pop();
      /*if(fileName!="jpeg"){
          alert('No es jpeg');
          this.fd=null;
          return false;
      }*/
      this.fd.append('file', this.selectedFile, this.selectedFile.name);
      this.showPreview(event);


    }
      // Imagen Preview
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.patchValue({
      avatar: file
    });
    this.uploadForm.get('avatar').updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imgURL = reader.result as string;
      this.newURL=this.imgURL;
    }
    reader.readAsDataURL(file)
  }

  //subiendo imagen
    upload() {
      if(this.fd==null){
        alert('Debe ingresar un archivo');
      }else{
      this.authService.uploadProfileDriver(this.fd,this.profile.email)
      .subscribe( result => {
        console.log(result);
        location.reload();
      },
      error=>{
        alert('Error');
        location.reload();
      });

      }     
    }

  /*PARA REVISAR SI EL USUARIO ESTA ACTIVADO
  this.authService.userState()
    .subscribe(
      res => {
        if(res.estado=='inactivo'){
          this.router.navigate(['/verification']);
          Swal.fire("Error", "Debe verificar su usuario para usar Jalón Universitario", "warning");
        }else{
          this.authService.getProfile()
          .subscribe(
            res => {//console.log(res.User.nombres);
              this.profile=res.User;
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
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/signin']);
          }
        }
      }
    )


  */
  
editarPerfil(){
  Swal.fire({
    title: "Seguro que quieres actualizar tus cuenta?",
    icon: 'question',
    showDenyButton: true,
    confirmButtonText: 'Continuar',
    denyButtonText: 'Cancelar',
  })
  .then((Delete)=>{
    if(Delete.isConfirmed){
  this.authService.editProfileDriver(this.profile)
  .subscribe(
    res =>{
      if(res.estado=='correo'){
        Swal.fire("Error", "Debe usar un correo institucional de la UNAH", "warning");
      this.router.navigate(['/signup']);
      }else if(res.estado=='Fallo'){
        Swal.fire("Error", "No se pudieron actualizar sus datos", "warning");
      }else{ 
        Swal.fire("Datos Actualizados", "Gracias por mantener actualizados su información", "success");
        this.router.navigate(['/profile-driver']);
      }
      
    },
    err =>{
      Swal.fire("Error", "Hubo un error en el sistema, favor intente de nuevo!", "warning");
      
    }
  )
    }
  })
  
  
}


deleteAccount(){
  Swal.fire({
    title: "Seguro que quieres eliminar tu cuenta?",
    text: "Una vez eliminada su cuenta no podrá recuperarla",
    icon: 'warning',
    showDenyButton: true,
    confirmButtonText: 'Continuar',
    denyButtonText: 'Cancelar',
  })
  .then((Delete)=>{
    if(Delete.isConfirmed){
      this.router.navigate(['/delete-user']);
    }
  })
  
}
 getImage(): Observable<SafeResourceUrl> {
    return  this.authService.getProfilePicDriver();
  }


}
