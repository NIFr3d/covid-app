package org.polytech.covidapi;


import org.polytech.covidapi.entities.Centre;
import org.polytech.covidapi.entities.ERole;
import org.polytech.covidapi.entities.Utilisateur;
import org.polytech.covidapi.repositories.CentreRepository;
import org.polytech.covidapi.repositories.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class CovidApiApplication {
	@Autowired
	private CentreRepository centreRepository;

	@Autowired
	PasswordEncoder	passwordEncoder;

	@Autowired
	private UtilisateurRepository utilisateurRepository;
	public static void main(String[] args) {
		SpringApplication.run(CovidApiApplication.class, args);
	}

	@Bean
	CommandLineRunner seedDB(){
		return args -> {
			Centre centre1 = new Centre("Hopital Central", "Metz", "12 rue de la Paix", "57000");
			Centre centre2 = new Centre("Centre hospitalier", "Nancy", "21 rue de la Republique", "54000");
			Utilisateur admin = new Utilisateur("admin@admin.fr", "ADMIN", "Admin", "0606060606", passwordEncoder.encode("admin"));
			admin.setRoles(java.util.List.of(ERole.ADMIN, ERole.USER));
			centreRepository.save(centre1);
			centreRepository.save(centre2);
			utilisateurRepository.save(admin);
		};
	}

}
