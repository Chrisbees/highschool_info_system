package com.chrisbees.spring.security.practice.controller;

import com.chrisbees.spring.security.practice.dto.AdminDTO;
import com.chrisbees.spring.security.practice.model.Admin;
import com.chrisbees.spring.security.practice.services.AdminService;
import com.chrisbees.spring.security.practice.user.AuthRequest;
import com.chrisbees.spring.security.practice.user.LoginDTO;
import com.chrisbees.spring.security.practice.user.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth/v1/admin/")
public class AdminController {

    private final AdminService adminService;
    private final AuthRequest loginRequest;

    @PostMapping("/register")
    @PreAuthorize("hasRole('ADMIN')")
    public AdminDTO createAdmin(@RequestBody Admin admin){
        return adminService.registerAdmin(admin);
    }

    @PostMapping("/login")
    public LoginDTO login(@RequestBody LoginRequest admin){
        return loginRequest.login(admin);
    }
}
