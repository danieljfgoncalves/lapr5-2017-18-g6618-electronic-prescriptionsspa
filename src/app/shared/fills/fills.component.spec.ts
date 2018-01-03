import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillsComponent } from './fills.component';

describe('FillsComponent', () => {
  let component: FillsComponent;
  let fixture: ComponentFixture<FillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
