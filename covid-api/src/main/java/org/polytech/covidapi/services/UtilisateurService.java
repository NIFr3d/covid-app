package org.polytech.covidapi.services;

import java.util.ArrayList;

import org.polytech.covidapi.entities.Utilisateur;
import org.polytech.covidapi.repositories.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UtilisateurService implements UserDetailsService{
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    private PasswordEncoder passwordEncoder;
    
    public void addUser(Utilisateur utilisateur) {
        utilisateurRepository.save(utilisateur);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return utilisateurRepository.findByMail(username).map(utilisateur -> new User(utilisateur.getMail(), utilisateur.getPassword(), utilisateur.getRoles().stream().map(SimpleGrantedAuthority::new).toList())).orElseThrow(()-> new UsernameNotFoundException("Utilisateur non trouvé"));
    }
}
