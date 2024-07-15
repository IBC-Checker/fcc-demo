import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcDocumentDetailsClientComponent } from './ec-document-details-client.component';

describe('EcDocumentDetailsClientComponent', () => {
  let component: EcDocumentDetailsClientComponent;
  let fixture: ComponentFixture<EcDocumentDetailsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcDocumentDetailsClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcDocumentDetailsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
