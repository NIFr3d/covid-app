package org.polytech.covidapi.controllers;

import java.util.List;

import org.polytech.covidapi.entities.Centre;
import org.polytech.covidapi.services.CentreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PublicController {

    @Autowired
    private CentreService centreService;

    @GetMapping(path = "/getCentresByCity")
    public List<Centre> getCentresByCity(@RequestParam("city") String city){
        return centreService.getCentresByCity(city);
    }
    
}
