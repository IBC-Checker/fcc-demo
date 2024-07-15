import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElGeneralDetailsClientComponent } from './el-general-details-client.component';

describe('ElGeneralDetailsClientComponent', () => {
  let component: ElGeneralDetailsClientComponent;
  let fixture: ComponentFixture<ElGeneralDetailsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElGeneralDetailsClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElGeneralDetailsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
