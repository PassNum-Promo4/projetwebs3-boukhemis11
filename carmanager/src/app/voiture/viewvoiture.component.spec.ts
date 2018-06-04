import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewvoitureComponent } from './viewvoiture.component';

describe('ViewvoitureComponent', () => {
  let component: ViewvoitureComponent;
  let fixture: ComponentFixture<ViewvoitureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewvoitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewvoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
