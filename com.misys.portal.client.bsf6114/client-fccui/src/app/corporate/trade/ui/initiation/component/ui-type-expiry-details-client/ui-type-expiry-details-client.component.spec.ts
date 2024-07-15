import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTypeExpiryDetailsClientComponent } from './ui-type-expiry-details-client.component';

describe('UiTypeExpiryDetailsClientComponent', () => {
  let component: UiTypeExpiryDetailsClientComponent;
  let fixture: ComponentFixture<UiTypeExpiryDetailsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiTypeExpiryDetailsClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiTypeExpiryDetailsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
