import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryDetailsClientComponent } from './summary-details-client.component';

describe('SummaryDetailsClientComponent', () => {
  let component: SummaryDetailsClientComponent;
  let fixture: ComponentFixture<SummaryDetailsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryDetailsClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryDetailsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
