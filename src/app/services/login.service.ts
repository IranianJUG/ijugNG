import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // makeLoginRequest(username: string, password: string): Observable<any> {
  //   const body = new URLSearchParams({
  //     'jakarta.faces.partial.ajax': 'true',
  //     'jakarta.faces.source': 'PFSubmitBtn',
  //     'jakarta.faces.partial.execute': 'formID',
  //     'jakarta.faces.partial.render': 'formID',
  //     PFSubmitBtn: 'PFSubmitBtn',
  //     formID: 'formID',
  //     username: '0081042019',
  //     passwordID: 'testt',
  //     'jakarta.faces.ViewState': '-7271162845117302532:8072132984368771304',
  //   }).toString();
  //   return this.http.post(loginUrl + '.xhtml', body.toString(), {
  //     headers: new HttpHeaders().set(
  //       'Content-Type',
  //       'application/x-www-form-urlencoded'
  //     ),
  //   });
  // }
}
