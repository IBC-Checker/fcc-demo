import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDetailsClientComponent } from './general-details-client.component';

describe('GeneralDetailsClientComponent', () => {
  let component: GeneralDetailsClientComponent;
  let fixture: ComponentFixture<GeneralDetailsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralDetailsClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralDetailsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
