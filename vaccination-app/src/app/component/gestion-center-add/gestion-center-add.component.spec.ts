import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCenterAddComponent } from './gestion-center-add.component';

describe('GestionCenterAddComponent', () => {
  let component: GestionCenterAddComponent;
  let fixture: ComponentFixture<GestionCenterAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionCenterAddComponent]
    });
    fixture = TestBed.createComponent(GestionCenterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
