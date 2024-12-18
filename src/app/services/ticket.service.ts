import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { TicketResponse, TicketsResponse } from '../interfaces/ticket';

const API_URL = environment.API_URL + '/ticket/';
@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  getTickets(): Observable<TicketsResponse> {
    return this.http.get<TicketsResponse>(API_URL);
  }

  getTicket(id: number): Observable<TicketResponse> {
    return this.http.get<TicketResponse>(API_URL + id);
  }
}
