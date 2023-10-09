package org.polytech.covidapi.controllers;

import org.polytech.covidapi.entities.Centre;
import org.polytech.covidapi.services.CentreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/private")
public class PrivateController {
    
    @Autowired
    private CentreService centreService;

    @PostMapping(path = "/center")
    public void saveCentre(@RequestParam Centre centre){
        centreService.saveCentre(centre);
    }    
    
    @GetMapping(path = "/test")
    public String test(){
        return "test";
    }
}
