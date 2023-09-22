package org.polytech.covidapi.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Centre {
    @Id
    private Integer id;
    private String nom;
    private String ville;
    @OneToMany(mappedBy = "centre")
    private List<Utilisateur> utilisateurs;
}
