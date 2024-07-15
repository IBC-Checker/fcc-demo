import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcGeneralDetailsClientComponent } from './lc-general-details-client.component';

describe('LcGeneralDetailsClientComponent', () => {
  let component: LcGeneralDetailsClientComponent;
  let fixture: ComponentFixture<LcGeneralDetailsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LcGeneralDetailsClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LcGeneralDetailsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
