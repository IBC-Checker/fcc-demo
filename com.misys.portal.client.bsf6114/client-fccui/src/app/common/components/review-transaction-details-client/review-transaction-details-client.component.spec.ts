import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTransactionDetailsClientComponent } from './review-transaction-details-client.component';

describe('ReviewTransactionDetailsClientComponent', () => {
  let component: ReviewTransactionDetailsClientComponent;
  let fixture: ComponentFixture<ReviewTransactionDetailsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewTransactionDetailsClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewTransactionDetailsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
