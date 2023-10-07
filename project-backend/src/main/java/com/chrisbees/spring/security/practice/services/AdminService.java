package com.chrisbees.spring.security.practice.services;

import com.chrisbees.spring.security.practice.dto.AdminDTO;
import com.chrisbees.spring.security.practice.model.Admin;
import com.chrisbees.spring.security.practice.repository.AdminRepository;
import com.chrisbees.spring.security.practice.user.*;
import com.chrisbees.spring.security.practice.utils.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public final JwtService tokenService;
    public AdminDTO registerAdmin(Admin admin){
        User user = new User();
//        Authentication auth = new UsernamePasswordAuthenticationToken(admin.getUsername(), admin.getPassword());
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        admin.setRole(admin.getRole());
        user.setFullname(admin.getFirstname() + " " + admin.getLastname());
        user.setEmail(admin.getEmail());
        user.setUsername(admin.getUsername());
        user.setPassword(admin.getPassword());
        user.setRole(admin.getRole());
        user.setAdmin(admin);
        admin.setUser(user);
        String token = tokenService.generateToken(admin.getUser());
        var admin1 = adminRepository.save(admin);
        return new AdminDTO(admin1, token);

    }

}
