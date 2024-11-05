import { Component, Input, OnInit } from '@angular/core';
import { MedicationAlpacaService } from '../../../data/medicationAlpaca.service';
import { MedicationAlpaca } from '../../../data/medicationAlpaca.interface';
import { MedicationAlpacaAddFormComponent } from '../../../forms/medication/medication-alpaca-form/medication-alpaca-add-form/medication-alpaca-add-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MedicationAlpacaEditFormComponent } from '../../../forms/medication/medication-alpaca-form/medication-alpaca-edit-form/medication-alpaca-edit-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alpaca-medication',
  templateUrl: './alpaca-medication.component.html',
  styleUrl: './alpaca-medication.component.scss'
})
export class AlpacaMedicationComponent implements OnInit {


  @Input() alpacaId: number|undefined;
  displayedColumns: string[] = [ 'name','dosage','unit','dosageForm','date','menu'];
  medicationAlpaca: MedicationAlpaca[] = [];
  constructor(public dialog: MatDialog,private alpacaService : MedicationAlpacaService,private snackBar: MatSnackBar,) { }

  loadMedicationAlpaca(): void {
    if(this.alpacaId){
    this.alpacaService.getMedicationAlpaca(this.alpacaId).subscribe((weights) => {
      console.log(weights)
      this.medicationAlpaca = weights;
    });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MedicationAlpacaAddFormComponent, {
      width: '99%',
      data: { alpacaId: this.alpacaId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMedicationAlpaca();
      }
    });
    
  }
  openEditDialog(medicationAlpaca: MedicationAlpaca): void {
    const dialogRef = this.dialog.open(MedicationAlpacaEditFormComponent, {
      width: '99%',
      data: { alpacaId: this.alpacaId, medicationAlpaca: medicationAlpaca  }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMedicationAlpaca();
      }
    });
    
  }
  deleteMedicationAlpaca(medicationAlpacaId:number): void {
    if (medicationAlpacaId  && this.alpacaId) {
        this.alpacaService.deleteMedicationAlpaca(this.alpacaId,medicationAlpacaId).subscribe(() => {
          this.snackBar.open('Alpaca deleted successfully!', 'Close', { duration: 2000 });
          this.loadMedicationAlpaca();
        });
      
    }
  }
  ngOnInit(): void {
    this.loadMedicationAlpaca();

 
  }
}
