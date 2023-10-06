package org.polytech.covidapi.repositories;

import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.polytech.covidapi.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {
    Optional<Utilisateur> findByMail(String username);
}
