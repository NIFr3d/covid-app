package org.polytech.covidapi.services;

import java.util.Optional;

import org.polytech.covidapi.entities.Role;
import org.polytech.covidapi.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;
    
    public Optional<Role> getRoleById(Integer id) {
        return roleRepository.findById(id);
    }
}
