package org.polytech.covidapi.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Role {
    @Id
    private Integer id;
    private String denomination;
    @OneToMany(mappedBy = "role")
    private List<Utilisateur> utilisateurs;
}
