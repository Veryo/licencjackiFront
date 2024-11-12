import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { AlpacaAddFormComponent } from './alpaca/alpaca-add-form/alpaca-add-form/alpaca-add-form.component';
import { AlpacaEditFormComponent } from './alpaca/alpaca-edit-form/alpaca-edit-form/alpaca-edit-form.component';
import { WeightAddFormComponent } from './weight/weight-add-form/weight-add-form.component';
import { WeightEditFormComponent } from './weight/weight-edit-form/weight-edit-form.component';
import { MedicationAlpacaAddFormComponent } from './medication/medication-alpaca-form/medication-alpaca-add-form/medication-alpaca-add-form.component';
import { MedicationAlpacaEditFormComponent } from './medication/medication-alpaca-form/medication-alpaca-edit-form/medication-alpaca-edit-form.component';
import { MedicationRecordAddFormComponent } from './medication/medication-alpaca-form/medication-record-add-form/medication-record-add-form.component';

@NgModule({
  declarations: [
    AlpacaAddFormComponent,
    AlpacaEditFormComponent,
    WeightAddFormComponent,
    WeightEditFormComponent,
    MedicationAlpacaAddFormComponent,
    MedicationAlpacaEditFormComponent,
    MedicationRecordAddFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    AlpacaAddFormComponent,
    AlpacaEditFormComponent,
    WeightAddFormComponent,
  ],
})
export class FormModule {}
