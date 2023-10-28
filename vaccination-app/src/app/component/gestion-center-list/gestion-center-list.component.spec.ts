import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCenterListComponent } from './gestion-center-list.component';

describe('GestionCenterListComponent', () => {
  let component: GestionCenterListComponent;
  let fixture: ComponentFixture<GestionCenterListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionCenterListComponent]
    });
    fixture = TestBed.createComponent(GestionCenterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
