import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCenterEditComponent } from './gestion-center-edit.component';

describe('GestionCenterEditComponent', () => {
  let component: GestionCenterEditComponent;
  let fixture: ComponentFixture<GestionCenterEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionCenterEditComponent]
    });
    fixture = TestBed.createComponent(GestionCenterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
