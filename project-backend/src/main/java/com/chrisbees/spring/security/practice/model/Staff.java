package com.chrisbees.spring.security.practice.model;

import com.chrisbees.spring.security.practice.user.Role;
import com.chrisbees.spring.security.practice.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "staff")
public class Staff {
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
    private String qualifications;
    private String language;
    private String interest;
    private String specialNeeds;
    private String transport;
    private String internet;
    private String photoConsent;
    private Role role;
    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    public User user;
    @Lob
    @Column(name = "image_data")
    private byte[] imageData;
}
