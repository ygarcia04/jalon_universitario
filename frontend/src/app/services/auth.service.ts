import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

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
    
//verificar si esta logueado como conductor
loggedInDriver() {
  return !!localStorage.getItem('driver');
}

logoutDriver() {
  localStorage.removeItem('driver');
  this.router.navigate(['/signin']);
}
//fin verificar si esta logueado como conductor
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


getProfile() {
  return this.http.get<any>(this.URL + '/profile');
}

signIn(user){
  console.log(this.URL);
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
console.log(this.URL + '/upload-profile-pic?id='+id);
    return this.http.post<any>(this.URL + '/upload-profile-pic?id='+id, profile);  
  }
uploadLicencia(profile, id){
  console.log(this.URL + '/upload-profile-licencia?id='+id);
    return this.http.post<any>(this.URL + '/upload-profile-licencia?id='+id, profile);  
    }
uploadRevision(profile, id){
  console.log(this.URL + '/upload-profile-revision?id='+id);
  return this.http.post<any>(this.URL + '/upload-profile-revision?id='+id, profile);  
}
uploadPlaca(profile, id){
  console.log(this.URL + '/upload-profile-placa?id='+id);
  return this.http.post<any>(this.URL + '/upload-profile-placa?id='+id, profile);  
}
deleteDriveLicencia(id){
  //console.log(this.URL + '/upload-profile-licencia?id='+id);
  return this.http.get<any>(this.URL + '/delete-licencia?id='+id);  
  }
  deleteDriveRevision(id){
    //console.log(this.URL + '/upload-profile-licencia?id='+id);
    return this.http.get<any>(this.URL + '/delete-revision?id='+id);  
  }
  deleteDrivePlaca(id){
    //console.log(this.URL + '/upload-profile-licencia?id='+id);
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

}
