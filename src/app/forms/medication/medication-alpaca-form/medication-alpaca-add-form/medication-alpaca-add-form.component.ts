import { Component, Inject, OnInit } from '@angular/core';
import { MedicationAlpacaService } from '../../../../data/medicationAlpaca.service';
import { MedicationAlpaca } from '../../../../data/medicationAlpaca.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicationRecordService } from '../../../../data/medicationRecord.service';
import { MedicationRecord } from '../../../../data/medicationRecord.interface';

@Component({
  selector: 'app-medication-alpaca-add-form',
  templateUrl: './medication-alpaca-add-form.component.html',
  styleUrl: './medication-alpaca-add-form.component.scss',
})
export class MedicationAlpacaAddFormComponent implements OnInit {
  medicationForm: FormGroup;
  alpacaId: number;
  units: string[] = ['µg', 'mg', 'g', 'kg', 'ml', 'l'];
  dosageForms: string[] = [
    'tabletka',
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
    private medicationAlpacaService: MedicationAlpacaService,
    public dialogRef: MatDialogRef<MedicationAlpacaAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { alpacaId: number },
  ) {
    this.alpacaId = data.alpacaId;
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
      const newMedicationRecord: MedicationAlpaca = {
        ...formValue,
        date: this.formatDate(formValue.date),
      };

      this.medicationAlpacaService
        .postMedicationAlpaca(this.alpacaId, newMedicationRecord)
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
  savedRecords: MedicationRecord[] = [];
  ngOnInit(): void {
    this.loadSavedRecords();
  }

  loadSavedRecords(): void {
    this.medicationRecordService.getMedicationRecord().subscribe(
      (records) => {
        this.savedRecords = records;
      },
      (error) => {
        console.error('Error loading saved records:', error);
      },
    );
  }

  onRecordSelect(event: any): void {
    const selectedRecord = event.value;
    if (selectedRecord) {
      this.medicationForm.patchValue({
        name: selectedRecord.medication.name,
        dosage: selectedRecord.medication.dosage,
        unit: selectedRecord.medication.unit,
        dosageForm: selectedRecord.medication.dosageForm,
        date: new Date(selectedRecord.medication.date),
      });
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
