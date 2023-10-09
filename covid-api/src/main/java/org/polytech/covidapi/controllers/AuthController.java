package org.polytech.covidapi.controllers;

import org.polytech.covidapi.services.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UtilisateurService utilisateurService;
    
    @PostMapping(path = "/register")
    public ResponseEntity<?> register(@RequestParam String mail, @RequestParam String password, @RequestParam String nom, @RequestParam String prenom, @RequestParam String telephone){
        if(utilisateurService.findByMail(mail).isPresent()){
            return ResponseEntity.badRequest().build();
        }
        utilisateurService.addUser(mail, password, nom, prenom, telephone);
        return ResponseEntity.ok().build();
    }

}
