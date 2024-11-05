import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightEditFormComponent } from './weight-edit-form.component';

describe('WeightEditFormComponent', () => {
  let component: WeightEditFormComponent;
  let fixture: ComponentFixture<WeightEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeightEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
