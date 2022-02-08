import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import jwt_decode from "jwt-decode"

interface MyToken {
  role: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string
  // whatever else is in the JWT.
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  server_address: string = 'http://localhost:5000';
  // server_address :string ='http://65.1.1.32:5000/api';
  role!: string;


  constructor(private http: HttpClient) { }

  //api To Login
  loginUser(user: any) {
    return this.http.post<any>(`${this.server_address}/auth/login`, user)
  }

  //check Presence of Token  
  isLoggedIn() {
    return !!localStorage.getItem('accessToken');
  }

  //retrive Token for token interception
  getToken() {
    return localStorage.getItem('accessToken')
  }
  //finduser
  getUser() {
    var token = localStorage.getItem('accessToken') || '';
    var user = jwt_decode<MyToken>(token);
    return user.aud;
  }

  changePassword(pass: any) {
    return this.http.post(`${this.server_address}/auth/change-pass`, pass);

  }

  //SuperAdmin Role Check
  isSuper() {
    var token = localStorage.getItem('accessToken') || '';
    var user = jwt_decode<MyToken>(token);

    return user.role === 'SUPER' ? true : false;
  }




  //Admin Role Check
  isAdmin() {
    var token = localStorage.getItem('accessToken') || '';
    var user = jwt_decode<MyToken>(token);
    return user.role === 'ADMIN' ? true : false;
  }
}
