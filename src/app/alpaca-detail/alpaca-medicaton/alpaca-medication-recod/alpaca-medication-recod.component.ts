import { Component } from '@angular/core';
import { MedicationRecord } from '../../../data/medicationRecord.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicationRecordService } from '../../../data/medicationRecord.service';
import { MedicationRecordAddFormComponent } from '../../../forms/medication/medication-alpaca-form/medication-record-add-form/medication-record-add-form.component';

@Component({
  selector: 'app-medication-recod',
  templateUrl: './alpaca-medication-recod.component.html',
  styleUrl: './alpaca-medication-recod.component.scss'
})
export class AlpacaMedicationRecodComponent {
  displayedColumns: string[] = [ 'name','dosage','unit','dosageForm','date','menu'];
  medicationRecord: MedicationRecord[] = [];
  constructor(public dialog: MatDialog,private alpacaService : MedicationRecordService,private snackBar: MatSnackBar,) { }

  loadMedicationRecord(): void {
    
    this.alpacaService.getMedicationRecord().subscribe((medicationRecord) => {
      this.medicationRecord = medicationRecord;
    });
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MedicationRecordAddFormComponent, {
      width: '99%',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMedicationRecord();
      }
    });
    
  }

  deleteMedicationRecord(medicationRecordId:number): void {
    if (medicationRecordId  ) {
        this.alpacaService.deleteMedicationRecord(medicationRecordId).subscribe(() => {
          this.snackBar.open('Alpaca deleted successfully!', 'Close', { duration: 2000 });
          this.loadMedicationRecord();
        });
      
    }
  }
  ngOnInit(): void {
    this.loadMedicationRecord();

 
  }
}
