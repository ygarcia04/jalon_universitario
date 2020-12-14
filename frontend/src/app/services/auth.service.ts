import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { identifierName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'https://jalonuniversitario.tk/api'
  constructor(
    private http: HttpClient,
    private router: Router,
    private sanitizer: DomSanitizer
    ) {}
    
//Conductor
getCountJalones(){
  return this.http.get<any>(this.URL + '/get-count-jalones');
}
loggedInDriver() {
  return !!localStorage.getItem('driver');
}

logoutDriver() {
  localStorage.removeItem('driver');
  this.router.navigate(['/signin']);
}
getTokenDriver(){
  return localStorage.getItem('driver');
}
getRutasDriver(){
  return this.http.get<any>(this.URL + '/get-routes-driver');  
}
getProfilePicDriver(){
  return this.http.get(this.URL+'/profile-pic-driver', { responseType: 'blob' })
    .pipe(
      map(x => {
        const urlToBlob = window.URL.createObjectURL(x) // get a URL for the blob
        return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
      }),
    );
}

editProfileDriver(user){
  return this.http.post<any>(this.URL + '/edit-profile-driver', user);

}
uploadProfileDriver(profile, id){

  return this.http.post<any>(this.URL + '/upload-profile-pic-driver?id='+id, profile);  
}
deleteDriver(user){
  return this.http.post<any>(this.URL + '/delete-account', user);
  
}
viewDrivers(){
  return this.http.get<any>(this.URL +'/drivers-admin');
}

viewDriversAct(){
  return this.http.get<any>(this.URL +'/drivers-act');
}

viewDriversBloq(){
  return this.http.get<any>(this.URL +'/drivers-bloq');
}

viewDriversInact(){
  return this.http.get<any>(this.URL +'/drivers-inact');
} 
deleteDriverAdmin(correo){
  return this.http.post<any>(this.URL +'/delete-driver-admin', correo);
} 
//fin conductor

//rutas
eliminarRuta(id){​​
  return this.http.get<any>(this.URL + '/delete-route-driver?id='+id);  
}​​
reiniciarRuta(ruta){​​
  return this.http.post<any>(this.URL + '/restart-route-driver',ruta);  
}​​
//fin rutas

//Jalones
jalonesPendientesUser(){
  return this.http.get<any>(this.URL +'/get-jalones-user-pendientes');
}
jalonesAceptadosRechazadosUser(){
  return this.http.get<any>(this.URL +'/get-jalones-user-aceptados');
}
jalonesPendientesDriver(){
  return this.http.get<any>(this.URL +'/get-jalones-driver-pendientes');
}
jalonesAceptadosRechazadosDriver(){
  return this.http.get<any>(this.URL +'/get-jalones-driver-aceptados');
}
aceptarJalon(id){
  return this.http.post<any>(this.URL + '/aceptar-jalon', id);
}
rechazarJalon(id){
  return this.http.post<any>(this.URL + '/rechazar-jalon', id);
}
//Jalones

  signUp(user){
    return this.http.post<any>(this.URL + '/signup', user);  
  }

  signupa(user){
    return this.http.post<any>(this.URL + '/signupa', user);  
  }

  signupdrive(user){
    return this.http.post<any>(this.URL + '/signupd', user);  
  }
  
  verification(user){
    return this.http.post<any>(this.URL + '/verification', user);  
  }

  pedirJalonDriver(user){
    return this.http.post<any>(this.URL + '/pedir-jalon', user);
  }
  Ruta(user){​​
    return this.http.post<any>(this.URL + '/routes', user);  
  }​​
  viewDriversroute(){
    return this.http.get<any>(this.URL +'/drivers');
  }
getProfile() {
  return this.http.get<any>(this.URL + '/profile');
}

signIn(user){
  return this.http.post<any>(this.URL + '/signin', user);

}

editProfile(user){
  return this.http.post<any>(this.URL + '/edit-profile', user);

}
loggedIn() {
  return !!localStorage.getItem('token');
}

logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/signin']);
}

getToken() {
  return localStorage.getItem('token');
}

loggedInAdmin() {
  return !!localStorage.getItem('admin');
}

logoutAdmin() {
  localStorage.removeItem('admin');
  this.router.navigate(['/signin']);
}

getAdminToken() {
  return localStorage.getItem('admin');
}
getUsersByMonth(month){
  return this.http.post<any>(this.URL + '/admin', month);
}
getVerificationCode(user,code,user1){
  return this.http.get<any>(this.URL + '/verification?user='+user+'&user1='+user1+'&code='+code);
}
resendCode(){
  return this.http.get<any>(this.URL + '/resend-code');
}
changePassword(user){

  return this.http.post<any>(this.URL + '/change-password', user);

}
recPass(user){
  return this.http.post<any>(this.URL + '/rec-password', user);
}
changeRecPass(user){
  return this.http.post<any>(this.URL + '/recover-password', user);
}

deleteUser(user){
  return this.http.post<any>(this.URL + '/delete-account', user);
  
}
userState(){
  return this.http.get<any>(this.URL + '/user-state');
}

viewUsers(){
  return this.http.get<any>(this.URL +'/users');
}

viewUsersAct(){
  return this.http.get<any>(this.URL +'/users-act');
}

viewUsersBloq(){
  return this.http.get<any>(this.URL +'/users-bloq');
}

viewUsersInact(){
  return this.http.get<any>(this.URL +'/users-inact');
}  

deleteUserAdmin(correo){
  return this.http.post<any>(this.URL +'/delete-user-admin', correo);
}
uploadProfile(profile, id){

    return this.http.post<any>(this.URL + '/upload-profile-pic?id='+id, profile);  
  }
uploadLicencia(profile, id){

    return this.http.post<any>(this.URL + '/upload-profile-licencia?id='+id, profile);  
    }
uploadRevision(profile, id){
 
  return this.http.post<any>(this.URL + '/upload-profile-revision?id='+id, profile);  
}
uploadPlaca(profile, id){

  return this.http.post<any>(this.URL + '/upload-profile-placa?id='+id, profile);  
}
deleteDriveLicencia(id){
  
  return this.http.get<any>(this.URL + '/delete-licencia?id='+id);  
  }
  deleteDriveRevision(id){
  
    return this.http.get<any>(this.URL + '/delete-revision?id='+id);  
  }
  deleteDrivePlaca(id){
    
    return this.http.get<any>(this.URL + '/delete-placa?id='+id);  
  }

  getProfilePic(){
    return this.http.get(this.URL+'/profile-pic', { responseType: 'blob' })
      .pipe(
        map(x => {
          const urlToBlob = window.URL.createObjectURL(x) // get a URL for the blob
          return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
        }),
      );
  }
  getProfileLicencia(){
    return this.http.get(this.URL+'/profile-licencia', { responseType: 'blob' })
      .pipe(
        map(x => {
          const urlToBlob = window.URL.createObjectURL(x) // get a URL for the blob
          return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
        }),
      );
  }
  getProfileRevision(){
    return this.http.get(this.URL+'/profile-revision', { responseType: 'blob' })
      .pipe(
        map(x => {
          const urlToBlob = window.URL.createObjectURL(x) // get a URL for the blob
          return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
        }),
      );
  }
  getProfilePlaca(){
    return this.http.get(this.URL+'/profile-placa', { responseType: 'blob' })
      .pipe(
        map(x => {
          const urlToBlob = window.URL.createObjectURL(x) // get a URL for the blob
          return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
        }),
      );
  }
  /*verificar driver admin*/
//Veridicar usuario
getDriver(email) {
  return this.http.post<any>(this.URL + '/verific-driver', email);
}

notification(email){
  return this.http.post<any>(this.URL + '/notification-driver-admin', email);
}

  getProfileLicenciad(email){
    return this.http.get(this.URL+'/profile-licencia?email='+email, { responseType: 'blob' })
      .pipe(
        map(x => {
          const urlToBlob = window.URL.createObjectURL(x) // get a URL for the blob
          return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
        }),
      );
  }

  getProfileRevisiond(email){
    return this.http.get(this.URL+'/profile-revision?email='+email, { responseType: 'blob' })
      .pipe(
        map(x => {
          const urlToBlob = window.URL.createObjectURL(x) // get a URL for the blob
          return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
        }),
      );
  }
  getProfilePlacad(email){
    return this.http.get(this.URL+'/profile-placa?email='+email, { responseType: 'blob' })
      .pipe(
        map(x => {
          const urlToBlob = window.URL.createObjectURL(x) // get a URL for the blob
          return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
        }),
      );
  }

  getProfilePicDriverAdmin(email){
    return this.http.get(this.URL+'/get-pic-driver?email='+email,{ responseType: 'blob' })
      .pipe(
        map(x => {
          const urlToBlob = window.URL.createObjectURL(x) // get a URL for the blob
          return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
        }),
      );
  }

  //


}
