import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationRecordAddFormComponent } from './medication-record-add-form.component';

describe('MedicationRecordAddFormComponent', () => {
  let component: MedicationRecordAddFormComponent;
  let fixture: ComponentFixture<MedicationRecordAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicationRecordAddFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicationRecordAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
