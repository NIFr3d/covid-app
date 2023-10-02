package org.polytech.covidapi.controllers;

import org.polytech.covidapi.entities.Utilisateur;
import org.polytech.covidapi.services.CentreService;
import org.polytech.covidapi.services.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/api/public")
public class LoginController {
    @Autowired
    private UtilisateurService utilisateurService;
    @Autowired
    private CentreService centreService;
    
    @PostMapping(path = "/register")
    public void register(@RequestParam String mail, @RequestParam String nom, @RequestParam String prenom, @RequestParam String telephone, @RequestParam String password) {
        Utilisateur utilisateur = new Utilisateur(
            mail,
            nom,
            prenom,
            telephone,
            password
        );  
        utilisateurService.addUser(utilisateur);
    }
}
