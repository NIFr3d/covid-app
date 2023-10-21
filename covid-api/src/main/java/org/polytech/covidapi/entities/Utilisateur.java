package org.polytech.covidapi.entities;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

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

    @ElementCollection(fetch = FetchType.EAGER)
    private List<ERole> roles;

    @OneToMany(mappedBy = "utilisateur")
    private List<Reservation> reservations;


    public Utilisateur(String mail , String nom , String prenom , String telephone , String password) {
        this.mail = mail;
        this.nom = nom;
        this.prenom = prenom;
        this.telephone = telephone;
        this.password = password;
        this.dateInscription = new Date(System.currentTimeMillis());
        this.isVaccine = false;
        this.reservations = new ArrayList<Reservation>();
        this.roles = List.of(ERole.USER);
    }
    public String getMail() {
        return this.mail;
    }
    public String getPassword() {
        return this.password;
    }
    public List<ERole> getRoles() {
        return this.roles;
    }
    public void setRoles(List<ERole> roles) {
        this.roles = roles;
    }
    public int getId() {
        return this.id;
    }
}
