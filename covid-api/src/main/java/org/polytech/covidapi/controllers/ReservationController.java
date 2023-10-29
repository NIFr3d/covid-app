package org.polytech.covidapi.controllers;

import org.polytech.covidapi.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/api/reservation")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    
}
