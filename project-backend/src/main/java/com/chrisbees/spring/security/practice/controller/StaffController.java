package com.chrisbees.spring.security.practice.controller;

import com.chrisbees.spring.security.practice.dto.StaffDTO;
import com.chrisbees.spring.security.practice.model.Staff;
import com.chrisbees.spring.security.practice.model.Students;
import com.chrisbees.spring.security.practice.services.StaffServices;
import com.chrisbees.spring.security.practice.user.AuthRequest;
import com.chrisbees.spring.security.practice.user.LoginDTO;
import com.chrisbees.spring.security.practice.user.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/staff/")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*",
        methods = {RequestMethod.DELETE, RequestMethod.GET,
                RequestMethod.POST, RequestMethod.PUT})
public class StaffController {

    private final StaffServices staffService;

    private final AuthRequest staffLogin;

    @PostMapping("/addStaff")
    @PreAuthorize("hasAuthority('admin:create')")
    public StaffDTO createStaff(@RequestBody Staff staff){
        return staffService.createStaff(staff);
    }

    @PostMapping("/login")
    public LoginDTO login(@RequestBody LoginRequest staff){
        return staffLogin.login(staff);
    }


    @GetMapping("/{id}")
    public Staff getStaff(@PathVariable Integer id){
        return staffService.getStaffById(id);
    }

    @GetMapping("/allStaffs")
    @PreAuthorize("hasAuthority('admin:read')")
    public List<Staff> getAllStaffs(){
        return staffService.getAllStaff();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('admin:delete')")
    public void deleteStaff(@PathVariable Integer id){
        staffService.deleteStaff(id);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('admin:create')")
    public Staff updateStaffInfo(@PathVariable Integer id, @RequestBody Staff staffs){
        return staffService.updateStaff(id, staffs);
    }

    @PutMapping("/{staffId}/updateImage")
    @PreAuthorize("hasAnyAuthority('admin:update')")
    public Staff updateStudentImage(@PathVariable Integer staffId, @RequestParam ("imageFile") MultipartFile imageFile) throws IOException {
        return staffService.updateStaffImage(staffId, imageFile);
    }
}
