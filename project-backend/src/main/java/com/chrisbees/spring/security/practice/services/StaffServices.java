package com.chrisbees.spring.security.practice.services;

import com.chrisbees.spring.security.practice.dto.StaffDTO;
import com.chrisbees.spring.security.practice.model.Staff;
import com.chrisbees.spring.security.practice.repository.StaffRepository;
import com.chrisbees.spring.security.practice.user.Role;
import com.chrisbees.spring.security.practice.user.User;
import com.chrisbees.spring.security.practice.user.UserRepository;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StaffServices {

    private final PasswordEncoder passwordEncoder;
    private final StaffRepository staffRepository;
    private final UserRepository userRepository;

    public StaffDTO createStaff(Staff staff) {
        User user = new User();
        staff.setUsername(staff.getFirstname() + " " + staff.getLastname());
        staff.setPassword(passwordEncoder.encode(staff.getPassword()));
        user.setUsername(staff.getFirstname() + " " + staff.getLastname());
        user.setPassword(staff.getPassword());
        user.setRole(staff.getRole());
        user.setEmail(staff.getEmail());
        user.setFullname(staff.getFirstname() + " " + staff.getLastname());
        user.setStaff(staff);
        staff.setUser(user);
        var staffs = staffRepository.save(staff);
        return new StaffDTO(staffs);
    }

    public Staff getStaffById(Integer id) {
        return staffRepository.findById(id)
                .orElseThrow(()->new UsernameNotFoundException("this staff does not exists"));
    }

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public void deleteStaff(Integer id) {
        var staff = getStaffById(id);
        staffRepository.deleteById(staff.getId());
    }

    public Staff updateStaff(Integer id, Staff staff) {

        var staffs = getStaffById(id);
        User user = staffs.getUser();
        staffs.setUsername(staff.getUsername());
        staffs.setPassword(passwordEncoder.encode(staff.getPassword()));
        staffs.setEmail(staff.getEmail());
        staffs.setFirstname(staff.getFirstname());
        staffs.setLastname(staff.getLastname());
        staffs.setGender(staff.getGender());
        staffs.setDob(staff.getDob());
        staffs.setNationality(staff.getNationality());
        staffs.setState(staff.getState());
        staffs.setEthnicity(staff.getEthnicity());
        staffs.setAddress(staff.getAddress());
        staffs.setPhone(staff.getPhone());
        staffs.setEmergency(staff.getEmergency());
        staffs.setGrade(staff.getGrade());
        staffs.setQualifications(staff.getQualifications());
        staffs.setLanguage(staff.getLanguage());
        staffs.setInterest(staff.getInterest());
        staffs.setSpecialNeeds(staff.getSpecialNeeds());
        staffs.setTransport(staff.getTransport());
        staffs.setInternet(staff.getInternet());
        staffs.setPhotoConsent(staff.getPhotoConsent());
        staffs.setRole(Role.STAFF);
        user.setUsername(staffs.getFirstname() + " " + staffs.getLastname());
        user.setPassword(staffs.getPassword());
        user.setEmail(staffs.getEmail());
        user.setFullname(staffs.getFirstname() + " " + staffs.getLastname());
        user.setRole(staffs.getRole());
        return staffRepository.save(staffs);
    }


    public ByteArrayOutputStream generateStaffInfoPDF(Integer staffId) throws DocumentException {
        Staff staff = getStaffById(staffId);
        Document document = new Document();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, outputStream);

        document.open();
        document.add(new Paragraph("Staff Information"));
        document.add(new Paragraph("First Name: " + staff.getFirstname()));
        // ... add more staff info

        document.close();

        return outputStream;
    }

    public Staff updateStaffImage(Integer id, MultipartFile imageFile) throws IOException {
        var staff = getStaffById(id);
        // Convert MultipartFile to byte array
        byte[] imageBytes = imageFile.getBytes();
        staff.setImageData(imageBytes);
        return staffRepository.save(staff);
    }
}
