package com.chrisbees.spring.security.practice.services;

import com.chrisbees.spring.security.practice.dto.StudentDTO;
import com.chrisbees.spring.security.practice.model.Courses;
import com.chrisbees.spring.security.practice.model.Parents;
import com.chrisbees.spring.security.practice.model.Students;
import com.chrisbees.spring.security.practice.repository.CourseRepository;
import com.chrisbees.spring.security.practice.repository.ParentsRepository;
import com.chrisbees.spring.security.practice.repository.StudentsRepository;
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
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class StudentService {

    private final PasswordEncoder passwordEncoder;
    private final StudentsRepository studentsRepository;
    private final UserRepository userRepository;

    private final CourseRepository courseRepository;
    private final ParentsRepository parentsRepository;
    public StudentDTO createStudents(Students students) {
        User user = new User();
        students.setUsername(students.getFirstname() + " " + students.getLastname());
        students.setRole(Role.STUDENT);
        students.setPassword(passwordEncoder.encode(students.getPassword()));
        user.setUsername(students.getFirstname() + " " + students.getLastname());
        user.setPassword(students.getPassword());
        user.setRole(students.getRole());
        user.setEmail(students.getEmail());
        user.setFullname(students.getFirstname() + " " + students.getLastname());
        user.setStudents(students);

        students.setUser(user);
        var student = studentsRepository.save(students);
        userRepository.save(user);
        return new StudentDTO(student);
    }

    public Students getStudentById(Integer id) {
        return studentsRepository.findById(id)
                .orElseThrow(()->new UsernameNotFoundException("this student does not exists"));
    }

    public List<Students> getAllStudents() {
        return studentsRepository.findAll();
    }

    public void deleteStudent(Integer id) {
        var student = getStudentById(id);
        studentsRepository.deleteById(student.getId());
    }

    public Students updateStudent(Integer id, Students students) {

        var student = getStudentById(id);
        User user = student.getUser();
        student.setUsername(students.getUsername());
        student.setPassword(passwordEncoder.encode(students.getPassword()));
        student.setEmail(students.getEmail());
        student.setFirstname(students.getFirstname());
        student.setLastname(students.getLastname());
        student.setGender(students.getGender());
        student.setAddress(students.getAddress());
        student.setDob(students.getDob());
        student.setNationality(students.getNationality());
        student.setState(students.getState());
        student.setEthnicity(students.getEthnicity());
        student.setEmergency(students.getEmergency());
        student.setGrade(students.getGrade());
        student.setPhone(students.getPhone());
        student.setMoralConduct(students.getMoralConduct());
        student.setLanguage(students.getLanguage());
        student.setPhotoConsent(students.getPhotoConsent());
        student.setTransport(students.getTransport());
        student.setInterest(students.getInterest());
        student.setInternet(students.getInternet());
        student.setSpecialNeeds(students.getSpecialNeeds());
        student.setAcademicPerformance(students.getAcademicPerformance());
        student.setRole(Role.STUDENT);
        user.setUsername(students.getFirstname() + " " + students.getLastname());
        user.setPassword(students.getPassword());
        user.setEmail(students.getEmail());
        user.setFullname(students.getFirstname() + " " + students.getLastname());
        user.setRole(student.getRole());
        return studentsRepository.save(student);
    }

    public Students addParentInfo(Integer id, Parents parents) throws Exception {
        var student = getStudentById(id);

        if (student.getParents() == null){
            parents.setFirstName(parents.getFirstName());
            parents.setLastName(parents.getLastName());
            parents.setContact(parents.getContact());
            parents.setGender(parents.getGender());
            parents.setOccupation(parents.getOccupation());
            parents.setRelationship_to_student(parents.getRelationship_to_student());
            parents.setEmployer(parents.getEmployer());
            student.setParents(parents);
        } else {
            throw new Exception("Parent already exists");
        }

        return studentsRepository.save(student);

    }

    public Students addCourse(Integer studentId, Courses courses) throws Exception {
        var student = getStudentById(studentId);
        var course = courseRepository.findByName(courses.getName());
        if(course == null){
            courses.setName(courses.getName());
            courses.setStudents(student);
            student.addCourse(courses);
        }else {
            throw new Exception("Student already offers this course");
        }
        return studentsRepository.save(student);
    }

    public List<Courses> getCourses(Integer id){
        var studentParent = getStudentById(id);
        return studentParent.getCourses();
    }
    public Parents getStudentParents(Integer id){
        var studentParent = getStudentById(id);
        return studentParent.getParents();
    }

    public ByteArrayOutputStream generateStudentInfoPDF(Integer studentId) throws DocumentException {
        Students student = getStudentById(studentId);
        Document document = new Document();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, outputStream);

        document.open();
        document.add(new Paragraph("Student Information"));
        document.add(new Paragraph("First Name: " + student.getFirstname()));
        // ... add more student info

        document.close();

        return outputStream;
    }

    public Students updateStudentImage(Integer id, MultipartFile imageFile) throws IOException {
        var student = getStudentById(id);
        // Convert MultipartFile to byte array
        byte[] imageBytes = imageFile.getBytes();
        student.setImageData(imageBytes);
        return studentsRepository.save(student);
    }

}


