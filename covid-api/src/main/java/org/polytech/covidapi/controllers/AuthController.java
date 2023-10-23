package org.polytech.covidapi.controllers;

import org.polytech.covidapi.config.jwt.JwtUtils;
import org.polytech.covidapi.entities.Utilisateur;
import org.polytech.covidapi.payload.request.LoginRequest;
import org.polytech.covidapi.payload.request.RegisterRequest;
import org.polytech.covidapi.payload.response.JwtResponse;
import org.polytech.covidapi.services.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    PasswordEncoder passwordEncoder;


    @PostMapping(path = "/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest ){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        Utilisateur utilisateur = utilisateurService.findByMail(loginRequest.getEmail()).get();
        
        return ResponseEntity.ok(new JwtResponse(jwt, 
                                                 utilisateur.getId(),
                                                 utilisateur.getMail(), 
                                                 utilisateur.getRoles().stream().map(role -> role.toString()).toList()));
    }

    
    @PostMapping(path = "/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest){
        if(utilisateurService.findByMail(registerRequest.getEmail()).isPresent()){
            return ResponseEntity.badRequest().body("{ \"message\": \"Email déjà utilisé\"}");
        }
        utilisateurService.addUser(registerRequest.getEmail(), 
                                   passwordEncoder.encode(registerRequest.getPassword()), 
                                   registerRequest.getNom(), registerRequest.getPrenom(), 
                                   registerRequest.getTelephone());

        return ResponseEntity.ok().body("{ \"message\": \"Utilisateur créé avec succès\"}");
    }

}
