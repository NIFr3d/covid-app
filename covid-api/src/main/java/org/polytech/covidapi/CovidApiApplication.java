package org.polytech.covidapi;


import org.checkerframework.checker.units.qual.A;
import org.polytech.covidapi.entities.Centre;
import org.polytech.covidapi.entities.Role;
import org.polytech.covidapi.repositories.CentreRepository;
import org.polytech.covidapi.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CovidApiApplication {
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private CentreRepository centreRepository;

	public static void main(String[] args) {
		SpringApplication.run(CovidApiApplication.class, args);
	}

	@Bean
	CommandLineRunner seedDB(){
		return args -> {
			Role role1 = new Role("Administrateur");
			Role role2 = new Role("Utilisateur");
			roleRepository.save(role1);
			roleRepository.save(role2);
			Centre centre1 = new Centre("Hopital Central", "Metz", "12 rue de la Paix", "57000");
			Centre centre2 = new Centre("Centre hospitalier", "Nancy", "21 rue de la Republique", "54000");
			centreRepository.save(centre1);
			centreRepository.save(centre2);
		};
	}

}
