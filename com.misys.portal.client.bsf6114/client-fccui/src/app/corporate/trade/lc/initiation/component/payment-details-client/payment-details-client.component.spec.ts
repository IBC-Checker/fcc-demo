import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetailsClientComponent } from './payment-details-client.component';

describe('PaymentDetailsClientComponent', () => {
  let component: PaymentDetailsClientComponent;
  let fixture: ComponentFixture<PaymentDetailsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentDetailsClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentDetailsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
