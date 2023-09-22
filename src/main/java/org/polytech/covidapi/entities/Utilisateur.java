package org.polytech.covidapi.entities;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Utilisateur {
    @Id
    private Integer id;
    private String mail;
    private String nom;
    private String prenom;
    private String telephone;
    private Date dateInscription;
    private boolean isVaccine;
    @ManyToOne
    private Role role;
    @ManyToOne
    private Centre centre;
}
