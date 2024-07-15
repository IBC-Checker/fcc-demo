import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantBeneficiaryClientComponent } from './applicant-beneficiary-client.component';

describe('ApplicantBeneficiaryClientComponent', () => {
  let component: ApplicantBeneficiaryClientComponent;
  let fixture: ComponentFixture<ApplicantBeneficiaryClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantBeneficiaryClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantBeneficiaryClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
