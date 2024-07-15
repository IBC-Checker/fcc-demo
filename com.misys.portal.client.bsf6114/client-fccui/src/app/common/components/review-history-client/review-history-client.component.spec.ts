import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewHistoryClientComponent } from './review-history-client.component';

describe('ReviewHistoryClientComponent', () => {
  let component: ReviewHistoryClientComponent;
  let fixture: ComponentFixture<ReviewHistoryClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewHistoryClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewHistoryClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
