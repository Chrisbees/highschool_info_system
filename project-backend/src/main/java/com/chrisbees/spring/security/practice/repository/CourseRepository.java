package com.chrisbees.spring.security.practice.repository;

import com.chrisbees.spring.security.practice.model.Courses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Courses, Integer> {
    Courses findByName(String name);
}
