package com.chrisbees.spring.security.practice.dto;

import com.chrisbees.spring.security.practice.model.Students;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentDTO {

    public Students students;

}
