import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alpaca } from '../../../../data/alpaca.interface'; 
import { AlpacaService } from '../../../../data/alpaca.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-alpaca-add-form',
  templateUrl: './alpaca-add-form.component.html',
  styleUrl: './alpaca-add-form.component.scss'
})
export class AlpacaAddFormComponent {
  alpacaForm: FormGroup;

constructor(
    public dialogRef: MatDialogRef<AlpacaAddFormComponent>,
    private fb: FormBuilder,
    private alpacaService: AlpacaService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.alpacaForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      sex: ['', Validators.required],
      dob: ['', Validators.required],
      microchip: ['', Validators.required],
      colors: ['', Validators.required],
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
      const newAlpaca: Alpaca = {
        ...formValue,
        dob: this.formatDate(formValue.dob) 
      };

      this.alpacaService.postAlpacas(newAlpaca).subscribe(
        (savedAlpaca) => {
          this.dialogRef.close(savedAlpaca);
          this.snackBar.open('Alpaca dodana !', 'Close', { duration: 2000 });
        },
        (error) => {
          console.error('Error saving alpaca:', error);
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