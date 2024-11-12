import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicationRecord } from './medicationRecord.interface';

@Injectable({
  providedIn: 'root',
})
export class MedicationRecordService {
  private baseUrl = 'http://localhost:5087/api/medications/record';

  constructor(private http: HttpClient) {}
  getMedicationRecord(): Observable<MedicationRecord[]> {
    return this.http.get<MedicationRecord[]>(`${this.baseUrl}`);
  }
  postMedicationRecord(
    medicationRecord: MedicationRecord,
  ): Observable<MedicationRecord> {
    return this.http.post<MedicationRecord>(
      `${this.baseUrl}`,
      medicationRecord,
    );
  }

  deleteMedicationRecord(medicationRecordId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${medicationRecordId}`);
  }
}
