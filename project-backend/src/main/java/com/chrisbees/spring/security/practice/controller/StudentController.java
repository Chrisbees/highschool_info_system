package com.chrisbees.spring.security.practice.controller;

import com.chrisbees.spring.security.practice.dto.AdminDTO;
import com.chrisbees.spring.security.practice.dto.StudentDTO;
import com.chrisbees.spring.security.practice.model.Courses;
import com.chrisbees.spring.security.practice.model.Parents;
import com.chrisbees.spring.security.practice.model.Students;
import com.chrisbees.spring.security.practice.services.StudentService;
import com.chrisbees.spring.security.practice.user.AuthRequest;
import com.chrisbees.spring.security.practice.user.LoginDTO;
import com.chrisbees.spring.security.practice.user.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*",
        methods = {RequestMethod.DELETE, RequestMethod.GET,
                RequestMethod.POST, RequestMethod.PUT})
@RequestMapping("/api/v1/students/")
public class StudentController {


    private final StudentService studentService;
    private final AuthRequest studentLogin;

    @PostMapping("/addStudent")
    @PreAuthorize("hasAuthority('admin:create')")
    public StudentDTO createStudents(@RequestBody Students students){
        return studentService.createStudents(students);
    }

    @PostMapping("/login")
    public LoginDTO login(@RequestBody LoginRequest student){
        return studentLogin.login(student);
    }


    @GetMapping("/{studentId}")
    @PreAuthorize("hasAnyAuthority('admin:read', 'staff:read', 'student:read')")
    public Students getStudent(@PathVariable Integer studentId){
        return studentService.getStudentById(studentId);
    }


    @GetMapping("/allStudents")
    @PreAuthorize("hasAnyAuthority('admin:read', 'staff:read')")
    public List<Students> getAllStudents(){
        return studentService.getAllStudents();
    }

    @DeleteMapping("/delete/{studentId}")
    @PreAuthorize("hasAuthority('admin:delete')")
    public void deleteStudent(@PathVariable Integer studentId){
        studentService.deleteStudent(studentId);
    }

    @PutMapping("/update/{studentId}")
    @PreAuthorize("hasAuthority('admin:update')")
    public Students updateStudentInfo(@PathVariable Integer studentId, @RequestBody Students students){
        return studentService.updateStudent(studentId, students);
    }

    @PutMapping("/{studentId}/addParents")
    @PreAuthorize("hasAuthority('admin:create')")
    public Students updateStudentParentsInfo(@PathVariable Integer studentId, @RequestBody Parents parents) throws Exception {
        return studentService.addParentInfo(studentId, parents);
    }

    @GetMapping("/{studentId}/getParents")
    @PreAuthorize("hasAnyAuthority('admin:read', 'staff:read', 'student:read')")
    public Parents getStudentParentsInfo(@PathVariable Integer studentId) throws Exception {
        return studentService.getStudentParents(studentId);
    }

    @PutMapping("/{studentId}/addCourses")
    @PreAuthorize("hasAuthority('admin:create')")
    public Students updateStudentCourses(@PathVariable Integer studentId, @RequestBody Courses courses) throws Exception {
        return studentService.addCourse(studentId, courses);
    }

    @GetMapping("/{studentId}/getCourses")
    @PreAuthorize("hasAnyAuthority('admin:read', 'staff:read', 'student:read')")
    public List<Courses> getStudentCourseInfo(@PathVariable Integer studentId) throws Exception {
        return studentService.getCourses(studentId);
    }


    @PutMapping("/{studentId}/updateImage")
    @PreAuthorize("hasAnyAuthority('admin:update', 'staff:update')")
    public Students updateStudentImage(@PathVariable Integer studentId, @RequestParam ("imageFile") MultipartFile imageFile) throws IOException {
        return studentService.updateStudentImage(studentId, imageFile);
    }
}

