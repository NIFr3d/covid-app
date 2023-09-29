package org.polytech.covidapi.controllers;

import org.polytech.covidapi.entities.Utilisateur;
import org.polytech.covidapi.services.CentreService;
import org.polytech.covidapi.services.RoleService;
import org.polytech.covidapi.services.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @Autowired
    private UtilisateurService utilisateurService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private CentreService centreService;
    
    @PostMapping(path = "/register")
    public void register(@RequestParam String mail, @RequestParam String nom, @RequestParam String prenom, @RequestParam String telephone, @RequestParam String password, @RequestParam Integer roleId, @RequestParam Integer centreId) {
        if(roleService.getRoleById(roleId).isEmpty() || centreService.getCentreById(centreId).isEmpty()) {
            throw new IllegalArgumentException("Role or centre not found");
        }
        Utilisateur utilisateur = new Utilisateur(
            mail,
            nom,
            prenom,
            telephone,
            password,
            roleService.getRoleById(roleId).get(),
            centreService.getCentreById(centreId).get()
        );  
        utilisateurService.addUser(utilisateur);
    }
}
