import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alpaca } from '../../../../data/alpaca.interface'; 
import { AlpacaService } from '../../../../data/alpaca.service'; 
@Component({
  selector: 'app-alpaca-edit-form',
  templateUrl: './alpaca-edit-form.component.html',
  styleUrl: './alpaca-edit-form.component.scss'
})
export class AlpacaEditFormComponent {


  alpacaForm: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<AlpacaEditFormComponent>,
    private fb: FormBuilder,
    private alpacaService: AlpacaService,
    @Inject(MAT_DIALOG_DATA) public data: Alpaca // Expecting Alpaca data to be passed
  ) {
    this.alpacaForm = this.fb.group({
      name: [data.name, Validators.required],
      status: [data.status, Validators.required],
      sex: [data.sex, Validators.required],
      dob: [new Date(data.dob), Validators.required], // Convert to Date object
      microchip: [data.microchip, Validators.required],
      colors: [data.colors, Validators.required],
    });
  }

  colorChoices: string[] = [
    'Biały',
    'Beżowy',
    'Jasny Fawn',
    'Średni Fawn',
    'Ciemny Fawn',
    'Jasny Brąz',
    'Średni Brąz',
    'Ciemny Brąz',
    'Bay Black',
    'Prawdziwy Czarny',
    'Jasny Srebrny Szary',
    'Średni Srebrny Szary',
    'Ciemny Srebrny Szary',
    'Jasny Różowy Szary',
    'Średni Różowy Szary',
    'Ciemny Różowy Szary'
  ];
  sexChoices: string[] = [
    'Samiec',
    'Samica'
  ];

  statusChoices: string[] = [
    'Otwarte samice',             // Open Females
    'Udowodniony hodowca',        // Breeder Proven
    'Obecne samice hodowlane',    // Current Breeding Females
    'Młodzież',                   // Juvenile
    'Pierwszy raz',               // Maiden
    'Karmiąca',                   // Nursing
    'Ciężarna',                   // Pregnant
    'Nieudowodniony',             // Unproven
    'Roczny'                      // Yearling
  ];

  onSubmit(): void {
    if (this.alpacaForm.valid) {
      const formValue = this.alpacaForm.value;
      const updatedAlpaca: Alpaca = {
        ...formValue,
        dob: this.formatDate(formValue.dob),
      };

      this.alpacaService.putAlpaca(this.data.id, updatedAlpaca).subscribe(
        (savedAlpaca) => {
          this.dialogRef.close(updatedAlpaca);
        },
        (error) => {
          console.error('Error updating alpaca:', error);
        }
      );
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Return in "YYYY-MM-DD" format
  } 
  onClose(): void {
    this.dialogRef.close();
  }

}
