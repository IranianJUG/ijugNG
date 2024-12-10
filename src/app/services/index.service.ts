import { Injectable } from '@angular/core';

import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IndexResponse} from "../interfaces";
import { Observable } from 'rxjs';

const API_URL = environment.API_URL+'/index/';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(private http: HttpClient) {}
  getIndexData():Observable<IndexResponse> {
    return this.http.get<IndexResponse>(API_URL);
  }

}
