import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcMessageToBankGeneralDetailsClientComponent } from './ec-message-to-bank-general-details-client.component';

describe('EcMessageToBankGeneralDetailsClientComponent', () => {
  let component: EcMessageToBankGeneralDetailsClientComponent;
  let fixture: ComponentFixture<EcMessageToBankGeneralDetailsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcMessageToBankGeneralDetailsClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcMessageToBankGeneralDetailsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
