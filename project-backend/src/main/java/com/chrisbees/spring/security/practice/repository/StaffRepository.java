package com.chrisbees.spring.security.practice.repository;

import com.chrisbees.spring.security.practice.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Integer> {
}
