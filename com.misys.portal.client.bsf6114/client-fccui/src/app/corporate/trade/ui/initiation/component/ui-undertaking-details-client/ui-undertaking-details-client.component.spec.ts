import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUndertakingDetailsClientComponent } from './ui-undertaking-details-client.component';

describe('UiUndertakingDetailsClientComponent', () => {
  let component: UiUndertakingDetailsClientComponent;
  let fixture: ComponentFixture<UiUndertakingDetailsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiUndertakingDetailsClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiUndertakingDetailsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
