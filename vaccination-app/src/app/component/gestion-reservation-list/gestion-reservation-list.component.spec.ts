import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionReservationListComponent } from './gestion-reservation-list.component';

describe('GestionReservationListComponent', () => {
  let component: GestionReservationListComponent;
  let fixture: ComponentFixture<GestionReservationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionReservationListComponent]
    });
    fixture = TestBed.createComponent(GestionReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
