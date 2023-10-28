package org.polytech.covidapi.controllers;

import java.util.List;
import java.util.Optional;

import org.polytech.covidapi.entities.Centre;
import org.polytech.covidapi.services.CentreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/api")
public class CenterController {
    
    @Autowired
    private CentreService centreService;


    @GetMapping(path = "/centers/getByCity")
    public List<Centre> getCentresByCity(@RequestParam("city") String city){
        return centreService.getCentresByCity(city);
    }

    @GetMapping(path = "/centers")
    public List<Centre> getCentres(){
        return centreService.getCentres();
    }

    @GetMapping(path = "/center/{id}")
    public Optional<Centre> getCentreById(@PathVariable Integer id){
        return centreService.getCentreById(id);
    }

    @PostMapping(path = "/editCenter")
    public void editCenter(@RequestBody Centre centre){
        centreService.saveCentre(centre);
    }

    @DeleteMapping(path ="/deleteCenter/{id}")
    public void deleteCenter(@PathVariable Integer id){
        centreService.deleteCenter(id);
    }

}
