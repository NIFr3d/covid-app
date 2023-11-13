import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionReservationPannelComponent } from './gestion-reservation-pannel.component';

describe('GestionReservationPannelComponent', () => {
  let component: GestionReservationPannelComponent;
  let fixture: ComponentFixture<GestionReservationPannelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionReservationPannelComponent]
    });
    fixture = TestBed.createComponent(GestionReservationPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
