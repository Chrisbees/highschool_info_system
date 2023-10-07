package com.chrisbees.spring.security.practice.repository;

import com.chrisbees.spring.security.practice.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<Roles, Integer> {
}
