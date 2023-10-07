package com.chrisbees.spring.security.practice.repository;

import com.chrisbees.spring.security.practice.model.Parents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentsRepository extends JpaRepository<Parents, Integer> {
    Parents findByFirstNameAndLastName(String firstName, String lastName);
}
