package org.polytech.covidapi.controllers;

import java.util.List;
import java.util.Optional;

import org.polytech.covidapi.entities.Centre;
import org.polytech.covidapi.entities.Utilisateur;
import org.polytech.covidapi.services.CentreService;
import org.polytech.covidapi.services.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/api/center")
public class CenterController {
    
    @Autowired
    private CentreService centreService;
    @Autowired
    private UtilisateurService utilisateurService;


    @GetMapping(path = "/getByCity")
    public List<Centre> getCentresByCity(@RequestParam("city") String city){
        return centreService.getCentresByCity(city);
    }

    @GetMapping(path = "/getAll")
    public List<Centre> getAllCentres(){
        return centreService.getAllCentres();
    }

    @GetMapping(path = "/getById/{id}")
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

    @PostMapping(path = "/addCenter")
    public void addCenter(@RequestBody Centre centre){
        Centre centre1 = new Centre(centre.getNom(), centre.getVille(), centre.getAdresse(), centre.getCodePostal());
        centreService.saveCentre(centre1);
    }

    @GetMapping(path="/medecin/getCenterForMedecin")
    public ResponseEntity<?> getCenterForMedecin(){
        String userEmail = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        if(!utilisateurService.findByEmail(userEmail).isPresent()){
            return ResponseEntity.badRequest().body("{ \"message\": \"Utilisateur non trouvé\"}");
        }
        Utilisateur utilisateur = utilisateurService.findByEmail(userEmail).get();
        if(utilisateur.getCentre() == null){
            return ResponseEntity.badRequest().body("{ \"message\": \"Vous n'êtes pas affecté à un centre\"}");
        }
        return ResponseEntity.ok().body(utilisateur.getCentre());
    }
}
