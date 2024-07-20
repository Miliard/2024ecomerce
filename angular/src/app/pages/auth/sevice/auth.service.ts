import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, timeout } from 'rxjs';
import { URL_SERVICIOS } from '../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = '';
  user: any;

  constructor(
    public http: HttpClient,
    public router: Router,
  ) {
    this.initAuth();
  }

  initAuth() {
    if (localStorage.getItem("token")) {
      this.user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") ?? '') : null;
      this.token = localStorage.getItem("token")+"";
    }
  }

  login(email: string, password: string) {
    let URL = URL_SERVICIOS+"/auth/login";
    return this.http.post(URL, { email, password }).pipe(
      map((resp: any) => {
        console.log(resp);
        const result = this.saveLocalStorage(resp);
        return result;
      }),
      catchError((err: any) => {
        console.log(err);
        return of(err);
      })
    );
  }

  saveLocalStorage(resp: any) {
    if (resp && resp.access_token) {
      localStorage.setItem("token", resp.access_token);
      localStorage.setItem("user", JSON.stringify(resp.user));
      return true;
    }
    return false;
  }

  register(data: any) {
    let URL = URL_SERVICIOS+"/auth/register";
    return this.http.post(URL, data);
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    this.user = null;
    this.token = '';

    this.router.navigateByUrl("/login");
    setTimeout(() => {

    }, 500);

    this.router.navigateByUrl("login");
  }

}
