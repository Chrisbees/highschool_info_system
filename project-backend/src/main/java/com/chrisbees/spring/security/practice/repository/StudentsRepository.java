package com.chrisbees.spring.security.practice.repository;

import com.chrisbees.spring.security.practice.model.Students;
import com.chrisbees.spring.security.practice.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentsRepository extends JpaRepository<Students, Integer> {
    Optional<Students> findByUsername(String username);
}
