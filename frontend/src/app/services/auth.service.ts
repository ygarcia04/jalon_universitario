import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'https://jalonuniversitario.tk/api'
  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  signUp(user){
    return this.http.post<any>(this.URL + '/signup', user);  
  }

  signupa(user){
    return this.http.post<any>(this.URL + '/signupa', user);  
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
getVerificationCode(user,code){
  return this.http.get<any>(this.URL + '/verification?user='+user+'&code='+code);
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

}
