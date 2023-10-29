package org.polytech.covidapi.entities;

import org.hibernate.annotations.ManyToAny;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Reservation {
    public Reservation() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @JsonProperty("date")
    private String date;

    @JsonProperty("heure")
    private String heure;

    @ManyToOne
    @JsonProperty("userId")
    private Utilisateur utilisateur;
    
    @ManyToOne
    @JsonProperty("centerId")
    private Centre centre;

    public Reservation(String date, String heure, Utilisateur utilisateur, Centre centre) {
        this.date = date;
        this.heure = heure;
        this.utilisateur = utilisateur;
        this.centre = centre;
    }

    public String getDate() {
        return date;
    }
    public String getHeure() {
        return heure;
    }
    public Utilisateur getUtilisateur() {
        return utilisateur;
    }
    public Centre getCentre() {
        return centre;
    }

}
