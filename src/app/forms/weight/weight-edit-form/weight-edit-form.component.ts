import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { WeightService } from '../../../data/weight.service';
import { Weight } from '../../../data/weight.interface';

@Component({
  selector: 'app-weight-edit-form',
  templateUrl: './weight-edit-form.component.html',
  styleUrl: './weight-edit-form.component.scss',
})
export class WeightEditFormComponent {
  weightForm: FormGroup;
  alpacaId: number;
  weight: Weight;
  constructor(
    private fb: FormBuilder,
    private weightService: WeightService,
    public dialogRef: MatDialogRef<WeightEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { alpacaId: number; weight: Weight },
  ) {
    this.alpacaId = data.alpacaId;
    this.weight = data.weight;
    this.weightForm = this.fb.group({
      current: [this.weight.current, [Validators.required, Validators.min(0)]],

      date: [new Date(this.weight.date), Validators.required],
    });
  }

  onSubmit(): void {
    console.log(this.weightForm);
    if (this.weightForm.valid) {
      const formValue = this.weightForm.value;
      const newWeight: Weight = {
        ...formValue,
        date: this.formatDate(formValue.date),
      };
      if (this.alpacaId) {
        this.weightService
          .updateWeight(this.alpacaId, this.weight.id, newWeight)
          .subscribe(
            () => {
              this.dialogRef.close(newWeight);
            },
            (error) => {
              console.error('Error saving weight:', error);
            },
          );
      }
    }
  }

  private formatDate(date: Date): string {
    console.log(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
