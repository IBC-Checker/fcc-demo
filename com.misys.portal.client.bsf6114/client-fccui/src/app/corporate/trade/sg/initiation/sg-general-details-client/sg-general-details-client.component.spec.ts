import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgGeneralDetailsClientComponent } from './sg-general-details-client.component';

describe('SgGeneralDetailsClientComponent', () => {
  let component: SgGeneralDetailsClientComponent;
  let fixture: ComponentFixture<SgGeneralDetailsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SgGeneralDetailsClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SgGeneralDetailsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
