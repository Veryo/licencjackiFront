import { Component, Inject } from '@angular/core';
import { MedicationAlpaca } from '../../../../data/medicationAlpaca.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicationAlpacaService } from '../../../../data/medicationAlpaca.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-medication-alpaca-edit-form',
  templateUrl: './medication-alpaca-edit-form.component.html',
  styleUrl: './medication-alpaca-edit-form.component.scss'
})
export class MedicationAlpacaEditFormComponent {
  medicationForm: FormGroup;
  alpacaId: number;
  medicationAlpaca : MedicationAlpaca
  units: string[] = ['µg', 'mg', 'g', 'kg', 'ml', 'l']
  dosageForms: string[] = [
    'tabletka',
    'kapsułka',
    'roztwór',
    'maść',
    'krem',
    'aerozol',
    'czopki',
    'wstrzyknięcie'
  ];
  constructor(
    private fb: FormBuilder,
    private medicationAlpacaService: MedicationAlpacaService,
    public dialogRef: MatDialogRef<MedicationAlpacaEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { alpacaId: number, medicationAlpaca:MedicationAlpaca }
  
  ) {
    this.alpacaId = data.alpacaId;
    this.medicationAlpaca = data.medicationAlpaca;
    this.medicationForm = this.fb.group({
      name: [this.medicationAlpaca.medication.name, Validators.required],
      dosage: [this.medicationAlpaca.medication.dosage, Validators.required],
      unit: [this.medicationAlpaca.medication.unit, Validators.required],
      dosageForm: [this.medicationAlpaca.medication.dosageForm, Validators.required],

      date:[new Date(this.medicationAlpaca.medication.date), Validators.required]
    });
  }

  onSubmit(): void {
    if (this.medicationForm.valid) {
      const formValue = this.medicationForm.value;
      const newMedicationRecord: MedicationAlpaca = {
        ...formValue,
        date: this.formatDate(formValue.date),
      };
      
  
      this.medicationAlpacaService.updateMedicationAlpaca(this.alpacaId,this.medicationAlpaca.id,newMedicationRecord).subscribe(
        () => {
          this.dialogRef.close(newMedicationRecord);
        },
        (error) => {
          console.error('Error saving weight:', error);
        }
      );
    

    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; 
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
