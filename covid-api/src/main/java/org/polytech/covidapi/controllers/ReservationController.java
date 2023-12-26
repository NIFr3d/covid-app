package org.polytech.covidapi.controllers;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.polytech.covidapi.entities.Reservation;
import org.polytech.covidapi.entities.Utilisateur;
import org.polytech.covidapi.services.CentreService;
import org.polytech.covidapi.services.ReservationService;
import org.polytech.covidapi.services.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/api/reservation")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;
    @Autowired
    private UtilisateurService utilisateurService;
    @Autowired
    private CentreService centreService;


    @PostMapping(path="/makeReservation")
    public ResponseEntity<?> makeReservation(@RequestBody Map<String, Object> request){
        String userEmail = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        Integer centreId = (Integer) request.get("centreId");
        Timestamp date = new Timestamp((Long) request.get("date"));
        if(reservationService.makeReservation(centreId,userEmail,date)){
            return ResponseEntity.ok().body("{ \"message\": \"Réservation effectuée avec succès\"}");
        }
        return ResponseEntity.badRequest().body("{ \"message\": \"Une erreur est survenue\"}");
    }

    @GetMapping(path="/getReservationsFromTo")
    public ResponseEntity<?> getReservations(@RequestParam long from, @RequestParam long to, @RequestParam Integer centreId){
        List<Reservation> reservations = reservationService.getReservationsFromToByCentre(new Timestamp(from), new Timestamp(to), centreId);
        return ResponseEntity.ok().body(reservations.stream().map(Reservation::getDate).map(Timestamp::getTime).toArray());
    }

    @GetMapping(path="/medecin/getReservationsByMedecinSearch")
    public ResponseEntity<?> getReservationsByMedecinSearch(@RequestParam String email, @RequestParam String nom, @RequestParam String prenom, @RequestParam Integer centreId){
        List<Utilisateur> utilisateurs = new ArrayList<Utilisateur>();
        if(email.length() > 0) utilisateurs.addAll(utilisateurService.findByEmailStartsWith(email));
        if(nom.length() > 0){
            if(utilisateurs.size() > 0) utilisateurs.retainAll(utilisateurService.findByNomStartsWith(nom));
            else utilisateurs.addAll(utilisateurService.findByNomStartsWith(nom));
        }
        if(prenom.length() > 3) {
            if(utilisateurs.size() > 0) utilisateurs.retainAll(utilisateurService.findByPrenomStartsWith(prenom));
            else utilisateurs.addAll(utilisateurService.findByPrenomStartsWith(prenom));
        }
        if(centreService.findById(centreId).isEmpty()) return ResponseEntity.badRequest().body("{ \"message\": \"Centre non trouvé\"}");
        List<Reservation> reservations = reservationService.getReservationsByMedecinSearch(utilisateurs, centreService.findById(centreId).get());
        return ResponseEntity.ok().body(reservations.stream().map(reservation -> Map.of("id", reservation.getId(), "date", reservation.getDate().getTime(), "centreId", reservation.getCentre().getId(), "userNom", reservation.getUtilisateur().getNom(), "userPrenom", reservation.getUtilisateur().getPrenom(), "userEmail", reservation.getUtilisateur().getEmail(), "done", reservation.getDone() ? 1 : 0)).toArray());
    }


    @GetMapping(path="/getReservationsByUser")
    public ResponseEntity<?> getReservationsByUser(){
        String userEmail = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        List<Reservation> reservations = reservationService.getReservationsByUser(userEmail);
        return ResponseEntity.ok().body(reservations.stream().map(reservation -> Map.of("id", reservation.getId(), "date", reservation.getDate().getTime(), "centre", reservation.getCentre(), "done", reservation.getDone() ? 1 : 0)).toArray());
    }

    @DeleteMapping(path="/cancelReservation/{id}")
    public ResponseEntity<?> cancelReservation(@PathVariable Integer id){
        String userEmail = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        if(reservationService.cancelReservation(id, userEmail)){
            return ResponseEntity.ok().body("{ \"message\": \"Réservation annulée avec succès\"}");
        }
        return ResponseEntity.badRequest().body("{ \"message\": \"Une erreur est survenue\"}");
    }

    @GetMapping(path="/medecin/getReservationsForDayByCentre/{centreId}/{date}")
    public ResponseEntity<?> getReservationsForDayByCentre(@PathVariable Integer centreId, @PathVariable long date){
        List<Reservation> reservations = reservationService.getReservationsForDayByCentre(centreId, new Timestamp(date));
        return ResponseEntity.ok().body(reservations.stream().map(reservation -> Map.of("id", reservation.getId(), "date", reservation.getDate().getTime(), "centreId", reservation.getCentre().getId(), "userNom", reservation.getUtilisateur().getNom(), "userPrenom", reservation.getUtilisateur().getPrenom(), "userEmail", reservation.getUtilisateur().getEmail(), "done", reservation.getDone() ? 1 : 0)).toArray());
    }
    @DeleteMapping(path="/medecin/deleteReservation/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable Integer id){
        if(reservationService.deleteReservation(id)){
            return ResponseEntity.ok().body("{ \"message\": \"Réservation supprimée avec succès\"}");
        }
        return ResponseEntity.badRequest().body("{ \"message\": \"Une erreur est survenue\"}");
    }

    @PostMapping(path="/medecin/confirmVaccination/{id}")
    public ResponseEntity<?> confirmVaccination(@PathVariable Integer id){
        if(reservationService.confirmVaccination(id)){
            return ResponseEntity.ok().body("{ \"message\": \"Vaccination confirmée avec succès\"}");
        }
        return ResponseEntity.badRequest().body("{ \"message\": \"Une erreur est survenue\"}");
    }




}
