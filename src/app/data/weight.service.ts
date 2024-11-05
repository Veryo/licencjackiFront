import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weight } from './weight.interface';

@Injectable({
  providedIn: 'root'
})
export class WeightService {

  private baseUrl = 'http://localhost:5087/api';

  constructor(private http: HttpClient) {}
  getWeight(alpacaId: number): Observable<Weight[]> {
    return this.http.get<Weight[]>(`${this.baseUrl}/alpacas/${alpacaId}/weights`);
  }

  addWeight(alpacaId: number, weight: Weight): Observable<Weight> {
    // Send POST request to the server with the alpaca ID in the URL
    return this.http.post<Weight>(`${this.baseUrl}/alpacas/${alpacaId}/weights`, weight);
  }

  updateWeight(alpacaId: number,weightId:number,weight: Weight): Observable<Weight> {
    console.log("testtset",weight)
    return this.http.put<Weight>(`${this.baseUrl}/alpacas/${alpacaId}/weights/${weightId}`,weight);
  }

  deleteWeight(alpacaId: number,id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/alpacas/${alpacaId}/weights/${id}`);
  }
}
