import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'http://localhost:3333/api';

  constructor(private http: HttpClient) {}

  get1001albums() {
    return this.http.get<any>(this.apiUrl);
  }
}
