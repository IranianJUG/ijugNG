import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {TicketResponse, TicketsResponse} from "../interfaces/ticket";
import {Observable} from "rxjs";
const API_URL = environment.API_URL+'/ticket/';
@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) {}
  getTickets():Observable<TicketsResponse>{
    return this.http.get<TicketsResponse>(API_URL)
  }
  getTicket(id:number):Observable<TicketResponse>{
    return this.http.get<TicketResponse>(API_URL+id)
  }
}
