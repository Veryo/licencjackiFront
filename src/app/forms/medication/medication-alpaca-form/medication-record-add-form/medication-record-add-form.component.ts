import { Component } from '@angular/core';
import { MedicationRecordService } from '../../../../data/medicationRecord.service';
import { MedicationRecord } from '../../../../data/medicationRecord.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-medication-record-add-form',
  templateUrl: './medication-record-add-form.component.html',
  styleUrl: './medication-record-add-form.component.scss',
})
export class MedicationRecordAddFormComponent {
  medicationForm: FormGroup;
  units: string[] = ['µg', 'mg', 'g', 'kg', 'ml', 'l'];
  dosageForms: string[] = [
    'tableta',
    'kapsułka',
    'roztwór',
    'maść',
    'krem',
    'aerozol',
    'czopki',
    'wstrzyknięcie',
  ];
  constructor(
    private fb: FormBuilder,
    private medicationRecordService: MedicationRecordService,
    public dialogRef: MatDialogRef<MedicationRecordAddFormComponent>,
  ) {
    this.medicationForm = this.fb.group({
      name: ['', Validators.required],
      dosage: ['', Validators.required],
      unit: ['', Validators.required],
      dosageForm: ['', Validators.required],
      date: [new Date(), Validators.required],
    });
  }

  onSubmit(): void {
    if (this.medicationForm.valid) {
      const formValue = this.medicationForm.value;
      const newMedicationRecord: MedicationRecord = {
        ...formValue,
        date: this.formatDate(formValue.date),
      };

      this.medicationRecordService
        .postMedicationRecord(newMedicationRecord)
        .subscribe(
          () => {
            this.dialogRef.close(newMedicationRecord);
          },
          (error) => {
            console.error('Error saving weight:', error);
          },
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
