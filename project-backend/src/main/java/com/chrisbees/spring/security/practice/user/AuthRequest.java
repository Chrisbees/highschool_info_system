package com.chrisbees.spring.security.practice.user;

import com.chrisbees.spring.security.practice.utils.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthRequest {
    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;

    public final JwtService tokenService;

    public LoginDTO login(LoginRequest user1){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user1.getUsername(),
                        user1.getPassword())
        );

        var user = userRepository.findByUsername(user1.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));
        String token = tokenService.generateToken(user);
        return new LoginDTO(user, token);
    }

}
