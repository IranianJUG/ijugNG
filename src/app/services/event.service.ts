import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {
  EventInterface,
  EventResponseInterface, EventsResponseInterface
} from "../interfaces/event";
import {Observable} from "rxjs";
const API_URL = environment.API_URL+'/event/';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {
  }

  getAll():Observable<EventsResponseInterface>{
    return this.http.get<EventsResponseInterface>(API_URL)
  }

  getOne(slug: string):Observable<EventResponseInterface> {
    return this.http.get<EventResponseInterface>(API_URL+slug)
  }

  storeEvent(event:EventInterface){
    return this.http.post(API_URL,event)
  }

  updateEvent(id:number,event:EventInterface){
    return this.http.put<Event>(API_URL+id,event)
  }

}
