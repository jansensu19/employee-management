import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEmployeeDialogComponent } from './detail-employee-dialog.component';

describe('DetailEmployeeDialogComponent', () => {
  let component: DetailEmployeeDialogComponent;
  let fixture: ComponentFixture<DetailEmployeeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailEmployeeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailEmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
