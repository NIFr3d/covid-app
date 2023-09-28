package org.polytech.covidapi.entities;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Utilisateur {
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
    @ManyToOne
    private Role role;
    @ManyToOne
    private Centre centre;

    public Utilisateur(String mail , String nom , String prenom , String telephone , String password, Role role, Centre centre) {
        this.mail = mail;
        this.nom = nom;
        this.prenom = prenom;
        this.telephone = telephone;
        this.password = password;
        this.dateInscription = new Date(System.currentTimeMillis());
        this.isVaccine = false;
        this.role = role;
        this.centre = centre;
    }
}
