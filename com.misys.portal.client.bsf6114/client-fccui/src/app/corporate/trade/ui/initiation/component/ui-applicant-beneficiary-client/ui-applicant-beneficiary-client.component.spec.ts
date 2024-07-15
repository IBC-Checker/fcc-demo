import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiApplicantBeneficiaryClientComponent } from './ui-applicant-beneficiary-client.component';

describe('UiApplicantBeneficiaryClientComponent', () => {
  let component: UiApplicantBeneficiaryClientComponent;
  let fixture: ComponentFixture<UiApplicantBeneficiaryClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiApplicantBeneficiaryClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiApplicantBeneficiaryClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
