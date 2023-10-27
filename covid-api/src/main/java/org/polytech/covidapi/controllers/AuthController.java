package org.polytech.covidapi.controllers;

import org.polytech.covidapi.config.jwt.JwtUtils;
import org.polytech.covidapi.entities.Utilisateur;
import org.polytech.covidapi.payload.request.LoginRequest;
import org.polytech.covidapi.payload.request.RegisterRequest;
import org.polytech.covidapi.payload.request.UpdateUserInfoRequest;
import org.polytech.covidapi.payload.request.UpdateUserPasswordRequest;
import org.polytech.covidapi.payload.response.JwtResponse;
import org.polytech.covidapi.services.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest){
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
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest, BindingResult bindingResult){
        if(bindingResult.hasFieldErrors("telephone")){
            return ResponseEntity.badRequest().body("{ \"message\": \"Veuillez entrer un format de téléphone supporté\"}");
        }
        if(bindingResult.hasFieldErrors("email")){
            return ResponseEntity.badRequest().body("{ \"message\": \"Veuillez entrer un format d'email supporté\"}");
        }
        if(bindingResult.hasFieldErrors("password")){
            return ResponseEntity.badRequest().body("{ \"message\": \"Les môts de passes doivent faire entre 6 et 40 caractères\"}");
        }
        if(bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body("{ \"message\": \"Veuillez remplir tous les champs\"}");
        }
        if(utilisateurService.findByMail(registerRequest.getEmail()).isPresent()){
            return ResponseEntity.badRequest().body("{ \"message\": \"Email déjà utilisé\"}");
        }
        utilisateurService.addUser(registerRequest.getEmail(), 
                                   passwordEncoder.encode(registerRequest.getPassword()), 
                                   registerRequest.getNom(), registerRequest.getPrenom(), 
                                   registerRequest.getTelephone());

        return ResponseEntity.ok().body("{ \"message\": \"Utilisateur créé avec succès\"}");
    }

    @GetMapping(path = "/getUserInfos")
    public ResponseEntity<?> getUserInfos(){
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(utilisateurService.findByMail(user.getUsername()).isPresent()){
            Utilisateur utilisateur = utilisateurService.findByMail(user.getUsername()).get();
            return ResponseEntity.ok().body("{ \"nom\": \""+ utilisateur.getNom()+"\", \"prenom\": \""+ utilisateur.getPrenom()+"\", \"telephone\": \""+ utilisateur.getTelephone()+"\", \"email\": \""+ utilisateur.getMail()+"\"}");
        }
        return ResponseEntity.badRequest().body("{ \"message\": \"Utilisateur non trouvé\"}");
    }

    @PostMapping(path = "/updateUserInfos")
    public ResponseEntity<?> updateUserInfos(@Valid @RequestBody  UpdateUserInfoRequest updateUserInfoRequest, BindingResult bindingResult){
        if(bindingResult.hasFieldErrors("telephone")){
            return ResponseEntity.badRequest().body("{ \"message\": \"Veuillez entrer un format de téléphone supporté\"}");
        }
        if(bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body("{ \"message\": \"Veuillez remplir tous les champs\"}");
        }
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(utilisateurService.findByMail(user.getUsername()).isPresent()){
            Utilisateur utilisateur = utilisateurService.findByMail(user.getUsername()).get();
            utilisateur.setNom(updateUserInfoRequest.getNom());
            utilisateur.setPrenom(updateUserInfoRequest.getPrenom());
            utilisateur.setTelephone(updateUserInfoRequest.getTelephone());
            utilisateurService.updateUser(utilisateur);
            return ResponseEntity.ok().body("{ \"message\": \"Utilisateur mis à jour avec succès\"}");
        }
        return ResponseEntity.badRequest().body("{ \"message\": \"Utilisateur non trouvé\"}");
    }

    @PostMapping(path = "/updateUserPassword")
    public ResponseEntity<?> updateUserPassword(@Valid @RequestBody  UpdateUserPasswordRequest updateUserPasswordRequest, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body("{ \"message\": \"Les môts de passes doivent faire entre 6 et 40 caractères\"}");
        }
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(utilisateurService.findByMail(user.getUsername()).isPresent()){
            Utilisateur utilisateur = utilisateurService.findByMail(user.getUsername()).get();
            if(passwordEncoder.matches(updateUserPasswordRequest.getOldPassword(), utilisateur.getPassword())){
                utilisateur.setPassword(passwordEncoder.encode(updateUserPasswordRequest.getNewPassword()));
                utilisateurService.updateUser(utilisateur);
                return ResponseEntity.ok().body("{ \"message\": \"Mot de passe mis à jour avec succès\"}");
            }
            return ResponseEntity.badRequest().body("{ \"message\": \"Mot de passe incorrect\"}");
        }
        return ResponseEntity.badRequest().body("{ \"message\": \"Utilisateur non trouvé\"}");
    }

}
