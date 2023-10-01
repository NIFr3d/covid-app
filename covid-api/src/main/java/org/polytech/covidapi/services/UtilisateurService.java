package org.polytech.covidapi.services;

import org.polytech.covidapi.entities.Utilisateur;
import org.polytech.covidapi.repositories.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UtilisateurService {
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    
    public void addUser(Utilisateur utilisateur) {
        utilisateurRepository.save(utilisateur);
    }
}
