import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000'
  constructor(private http: HttpClient, private router: Router) {}

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

  changePassword(user){

    return this.http.post<any>(this.URL + '/change-password', user);

  }
  loggedIn() {
    return !!localStorage.getItem('item');
  }

  logout() {
    localStorage.removeItem('item');
    this.router.navigate(['/signin']);
  }

  getToken() {
    return localStorage.getItem('item');
  }

}
  


