import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Record } from '../models/record';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'http://localhost:3333/api';

  constructor(private http: HttpClient) {}

  get1001albums() {
    return this.http.get<Record[]>(this.apiUrl);
  }
}
