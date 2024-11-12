import { Medication } from './medication.interface';

export interface MedicationRecord {
  id: number;
  medicationId?: number;
  medication: Medication;
}
