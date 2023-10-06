package org.polytech.covidapi.controllers;

import org.polytech.covidapi.entities.Centre;
import org.polytech.covidapi.services.CentreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public")
public class PrivateController {
    
    @Autowired
    private CentreService centreService;

    @PostMapping(path = "/center")
    public void saveCentre(Centre centre){
        centreService.saveCentre(centre);
    }    
}
