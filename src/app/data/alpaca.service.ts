import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alpaca } from './alpaca.interface';

@Injectable({
  providedIn: 'root'
})
export class AlpacaService {

  private baseUrl = 'http://localhost:5087/api';
  constructor(private http: HttpClient) {}

  getAlpacas(): Observable<Alpaca[]> {
    return this.http.get<Alpaca[]>(`${this.baseUrl}/alpacas`);
    }
  getAlpacaById(id: number): Observable<Alpaca> {
    return this.http.get<Alpaca>(`${this.baseUrl}/alpacas/${id}`);
  }

  postAlpacas(alpaca: Alpaca): Observable<Alpaca> {
    return this.http.post<Alpaca>(`${this.baseUrl}/alpacas`, alpaca);
  }

  putAlpaca(id: number, alpaca: Alpaca): Observable<Alpaca> {
    return this.http.put<Alpaca>(`${this.baseUrl}/alpacas/${id}`, alpaca);
  }
  deleteAlpaca(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/alpacas/${id}`);
  }
   }

