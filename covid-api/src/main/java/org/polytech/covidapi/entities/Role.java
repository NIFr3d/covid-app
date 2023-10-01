package org.polytech.covidapi.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Role {
    public Role() {
    }
    public Role(String denomination) {
        this.denomination = denomination;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String denomination;
    @OneToMany(mappedBy = "role")
    private List<Utilisateur> utilisateurs;
}
