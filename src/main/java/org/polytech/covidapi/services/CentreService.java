package org.polytech.covidapi.services;

import java.util.List;

import org.polytech.covidapi.entities.Centre;
import org.polytech.covidapi.repositories.CentreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CentreService {
    @Autowired
    private CentreRepository centreRepository;
    
    public List<Centre> getCentresByCity(String ville) {
        return centreRepository.findAllByVille(ville);
    }
}


