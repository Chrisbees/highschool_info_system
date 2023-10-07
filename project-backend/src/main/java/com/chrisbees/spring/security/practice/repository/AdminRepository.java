package com.chrisbees.spring.security.practice.repository;

import com.chrisbees.spring.security.practice.model.Admin;
import com.chrisbees.spring.security.practice.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

    Optional<Admin> findByUsername(String username);
}
