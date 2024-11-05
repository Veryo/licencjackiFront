import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { WeightService } from '../../../data/weight.service'; 
import { Weight } from '../../../data/weight.interface';

@Component({
  selector: 'app-weight-add-form',
  templateUrl: './weight-add-form.component.html',
  styleUrls: ['./weight-add-form.component.scss'], // Fixed typo here
})
export class WeightAddFormComponent {
  weightForm: FormGroup;
  alpacaId: number;

  constructor(
    private fb: FormBuilder,
    private weightService: WeightService,
    public dialogRef: MatDialogRef<WeightAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { alpacaId: number }
  
  ) {
    this.alpacaId = data.alpacaId;
    this.weightForm = this.fb.group({
      current: [null, [Validators.required, Validators.min(0)]],
    
      date: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.weightForm.valid) {
      const formValue = this.weightForm.value;
      const newWeight: Weight = {
        ...formValue,
        date: this.formatDate(formValue.date),
      };
      console.log(this.alpacaId)
      if(this.alpacaId){
      this.weightService.addWeight(this.alpacaId,newWeight).subscribe(
        (savedWeight) => {
          this.dialogRef.close(savedWeight);
        },
        (error) => {
          console.error('Error saving weight:', error);
        }
      );
    }

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
