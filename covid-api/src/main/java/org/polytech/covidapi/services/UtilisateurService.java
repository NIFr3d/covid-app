package org.polytech.covidapi.services;

import java.util.ArrayList;
import java.util.Optional;

import org.polytech.covidapi.entities.Utilisateur;
import org.polytech.covidapi.repositories.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UtilisateurService implements UserDetailsService{
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder() {
        
    };
    
    public void addUser(String mail, String password, String nom, String prenom, String telephone) {
        Utilisateur utilisateur = new Utilisateur(mail, nom, prenom, telephone, passwordEncoder.encode(password));
        utilisateurRepository.save(utilisateur);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return utilisateurRepository.findByMail(username).map(utilisateur -> new User(utilisateur.getMail(), utilisateur.getPassword(), utilisateur.getRoles().stream().map(SimpleGrantedAuthority::new).toList())).orElseThrow(()-> new UsernameNotFoundException("Utilisateur non trouvé"));
    }

    public Optional<Utilisateur> findByMail(String mail) {
        return utilisateurRepository.findByMail(mail);
    }
}
