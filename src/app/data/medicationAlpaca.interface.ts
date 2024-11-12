import { Medication } from './medication.interface';

export interface MedicationAlpaca {
  id: number;
  alpacaId: number;
  medicationId?: number;
  medication: Medication;
}
