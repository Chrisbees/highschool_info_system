package com.chrisbees.spring.security.practice.dto;

import com.chrisbees.spring.security.practice.model.Admin;
import com.chrisbees.spring.security.practice.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminDTO {

    public Admin admin;
    public String token;
}

