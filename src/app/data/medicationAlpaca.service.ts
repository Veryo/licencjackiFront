import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicationAlpaca } from './medicationAlpaca.interface';

@Injectable({
  providedIn: 'root',
})
export class MedicationAlpacaService {
  private baseUrl = 'http://localhost:5087/api';

  constructor(private http: HttpClient) {}
  getMedicationAlpaca(alpacaId: number): Observable<MedicationAlpaca[]> {
    return this.http.get<MedicationAlpaca[]>(
      `${this.baseUrl}/alpacas/${alpacaId}/medications`,
    );
  }
  postMedicationAlpaca(
    alpacaId: number,
    medicationAlpaca: MedicationAlpaca,
  ): Observable<MedicationAlpaca> {
    return this.http.post<MedicationAlpaca>(
      `${this.baseUrl}/alpacas/${alpacaId}/medications`,
      medicationAlpaca,
    );
  }
  updateMedicationAlpaca(
    alpacaId: number,
    medicationAlpacaId: number,
    medicationAlpaca: MedicationAlpaca,
  ): Observable<MedicationAlpaca> {
    return this.http.put<MedicationAlpaca>(
      `${this.baseUrl}/alpacas/${alpacaId}/medications/${medicationAlpacaId}`,
      medicationAlpaca,
    );
  }

  deleteMedicationAlpaca(
    alpacaId: number,
    medicationAlpacaId: number,
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/alpacas/${alpacaId}/medications/${medicationAlpacaId}`,
    );
  }
}
