package org.polytech.covidapi.repositories;

import org.springframework.stereotype.Repository;
import org.polytech.covidapi.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    
}
