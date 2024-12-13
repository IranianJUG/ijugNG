import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  requestOTP(phone:string):Observable<any> {
    return this.http.post(environment.API_URL+'/auth/login',{mobile:phone})
  }

  verifyOTP(phone:string,otp:string):Observable<any> {
    return this.http.post(environment.API_URL+'/auth/login',{mobile:phone,otp:otp})
  }

  getUserData(){
    const token =localStorage.getItem('user')
    if (token){
      return JSON.parse(token)
    }
    return null
  }
  getUserToken(){
    return localStorage.getItem('token')
  }
}
