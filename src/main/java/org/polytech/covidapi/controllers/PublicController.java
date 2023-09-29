package org.polytech.covidapi.controllers;

import java.util.List;
import java.util.Optional;

import org.polytech.covidapi.entities.Centre;
import org.polytech.covidapi.services.CentreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PublicController {

    @Autowired
    private CentreService centreService;

    @GetMapping(path = "/api/centers/getByCity")
    public List<Centre> getCentresByCity(@RequestParam("city") String city){
        return centreService.getCentresByCity(city);
    }

    @GetMapping(path = "/api/centers")
    public List<Centre> getCentres(){
        var centres = centreService.getCentres();
        var test = 2;
        return centres;
    }
    @GetMapping(path = "/api/center/{id}")
    public Optional<Centre> getCentreById(@PathVariable Integer id){
        return centreService.getCentreById(id);
    }
    
}
