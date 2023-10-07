package com.chrisbees.spring.security.practice.model;

import com.chrisbees.spring.security.practice.user.Role;
import com.chrisbees.spring.security.practice.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "admin")
public class Admin{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String firstname;
    private String lastname;
    private String gender;
    private String username;
    private String password;
    private String email;
    @Enumerated
    private Role role;

    @OneToOne(cascade = CascadeType.ALL)
    private User user;
}