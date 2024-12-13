import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaymentsResponse} from "../interfaces/payment";
const API_URL = environment.API_URL+'/payment/';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {}

  getPayments():Observable<PaymentsResponse>{
    return this.http.get<PaymentsResponse>(API_URL)
  }
}
