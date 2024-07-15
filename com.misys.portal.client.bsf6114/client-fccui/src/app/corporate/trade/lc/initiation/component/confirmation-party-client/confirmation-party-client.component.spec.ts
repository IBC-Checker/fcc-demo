import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationPartyClientComponent } from './confirmation-party-client.component';

describe('ConfirmationPartyClientComponent', () => {
  let component: ConfirmationPartyClientComponent;
  let fixture: ComponentFixture<ConfirmationPartyClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationPartyClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationPartyClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
