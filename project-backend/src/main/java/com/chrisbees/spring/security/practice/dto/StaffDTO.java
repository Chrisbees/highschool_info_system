package com.chrisbees.spring.security.practice.dto;

import com.chrisbees.spring.security.practice.model.Staff;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StaffDTO {
    public Staff staff;
}
