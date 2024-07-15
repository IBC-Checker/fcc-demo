import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitsWidgetComponent } from './limits-widget.component';

describe('LimitsWidgetComponent', () => {
  let component: LimitsWidgetComponent;
  let fixture: ComponentFixture<LimitsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitsWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimitsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
