import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgApplicantBeneficiaryClientComponent } from './sg-applicant-beneficiary-client.component';

describe('SgApplicantBeneficiaryClientComponent', () => {
  let component: SgApplicantBeneficiaryClientComponent;
  let fixture: ComponentFixture<SgApplicantBeneficiaryClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SgApplicantBeneficiaryClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SgApplicantBeneficiaryClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
