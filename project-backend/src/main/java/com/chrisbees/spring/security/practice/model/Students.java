package com.chrisbees.spring.security.practice.model;

import com.chrisbees.spring.security.practice.user.Role;
import com.chrisbees.spring.security.practice.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "students")
public class Students {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String firstname;
    private String lastname;
    private String gender;
    private String username;
    private String password;
    private String email;
    private String dob;
    private String nationality;
    private String state;
    private String ethnicity;
    private String address;
    private String phone;
    private String emergency;
    private String grade;
    private String moralConduct;
    private String language;
    private String interest;
    private String specialNeeds;
    private String transport;
    private String internet;
    private String photoConsent;
    private String academicPerformance;




    @Enumerated
    private Role role;
    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    public Parents parents;
    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    public User user;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Courses> courses = new ArrayList<>();

    @Lob
    @Column(name = "image_data")
    private byte[] imageData;

    public void addCourse(Courses course){
        courses.add(course);
    }

}
