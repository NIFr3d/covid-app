package org.polytech.covidapi.services;

import org.hibernate.mapping.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.polytech.covidapi.entities.Reservation;

public class ReservationServiceTest {

    ReservationService reservationService;

    @BeforeEach
    void setUp() {
        reservationService = Mockito.mock(ReservationService.class);
    }

    @Test
    void GetReservationsByUsertest() {
        Reservation List = new Reservation();
        Mockito.doReturn(List).when(reservationService).getReservationsByUser("email");
        reservationService.getReservationsByUser("email");
        
    }

    @Test
    void GetReservationsFromTotest() {

    }
}
