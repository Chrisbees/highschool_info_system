package com.chrisbees.spring.security.practice.controller;

import com.chrisbees.spring.security.practice.services.StaffServices;
import com.chrisbees.spring.security.practice.services.StudentService;
import com.itextpdf.text.DocumentException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;

@RestController
@RequestMapping("/api/pdf")
public class PDFController {

    private final StudentService studentService;
    private final StaffServices staffServices;

    public PDFController(StudentService studentService, StaffServices staffServices) {
        this.studentService = studentService;
        this.staffServices = staffServices;
    }

    @GetMapping("/generate-pdf/{studentId}")
    public ResponseEntity<Resource> generatePDF(@PathVariable Integer studentId) {
        try {
            ByteArrayOutputStream pdfBytes = studentService.generateStudentInfoPDF(studentId);

            Resource resource = new ByteArrayResource(pdfBytes.toByteArray());

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=student_info.pdf");

            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(resource);
        } catch (DocumentException e) {
            return ResponseEntity
                    .badRequest()
                    .body(null);
        }
    }

    @GetMapping("/generate-pdf/staff/{staffId}")
    public ResponseEntity<Resource> generateStaffPDF(@PathVariable Integer staffId) {
        try {
            ByteArrayOutputStream pdfBytes = staffServices.generateStaffInfoPDF(staffId);

            Resource resource = new ByteArrayResource(pdfBytes.toByteArray());

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=student_info.pdf");

            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(resource);
        } catch (DocumentException e) {
            return ResponseEntity
                    .badRequest()
                    .body(null);
        }
    }
}
