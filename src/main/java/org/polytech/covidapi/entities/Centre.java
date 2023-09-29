package org.polytech.covidapi.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Centre {
    public Centre(String nom, String ville, String adresse, String codePostal) {
        this.nom = nom;
        this.ville = ville;
        this.adresse = adresse;
        this.codePostal = codePostal;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nom;
    private String adresse;
    private String codePostal;
    private String ville;
    @OneToMany(mappedBy = "centre")
    private List<Utilisateur> utilisateurs;
}
