import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000'
  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  signUp(user){
    return this.http.post<any>(this.URL + '/signup', user);  
  }
  verification(user){
    return this.http.post<any>(this.URL + '/verification', user);  
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
  

}
