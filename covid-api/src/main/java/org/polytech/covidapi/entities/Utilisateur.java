package org.polytech.covidapi.entities;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Utilisateur {
    public Utilisateur() {
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String mail;
    private String nom;
    private String prenom;
    private String telephone;
    private Date dateInscription;
    private boolean isVaccine;
    private String password;
    @ElementCollection
    private List<String> roles;
    @ManyToOne
    private Centre centre;

    public Utilisateur(String mail , String nom , String prenom , String telephone , String password, Centre centre) {
        this.mail = mail;
        this.nom = nom;
        this.prenom = prenom;
        this.telephone = telephone;
        this.password = password;
        this.dateInscription = new Date(System.currentTimeMillis());
        this.isVaccine = false;
        this.roles = List.of("USER");
        this.centre = centre;
    }
}
