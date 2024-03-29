package com.chrisbees.spring.security.practice.utils;

import com.chrisbees.spring.security.practice.model.Students;
import com.chrisbees.spring.security.practice.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {


    private static final String SECRET_KEY = "HzPc0cw3pkPOEj4W4k3ooHiVRy+PMyODFyZqhC78lnniek7mejdyCcB+wsYIkbXr";
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String generateToken(UserDetails userDetails){
        User user = (User) userDetails;
        Map<String, Object> claim = new HashMap<>();
        claim.put("id", user.getId());
        if (user.getStudents() != null) {
            claim.put("entityId", user.getStudents().getId());
            claim.put("entityType", "student");
        } else if (user.getAdmin() != null) {
            claim.put("entityId", user.getAdmin().getId());
            claim.put("entityType", "admin");
        } else if (user.getStaff() != null) {
            claim.put("entityId", user.getStaff().getId());
            claim.put("entityType", "staff");
        }
        return generateToken(claim, userDetails);
    }


    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ){
        User user = (User) userDetails;

        return Jwts
                .builder()
                .claim("id", user.getId())
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        final Integer userId = extractUserId(token);
        User user = (User) userDetails;
        return (username.equals(userDetails.getUsername()) && userId.equals(user.getId()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Integer extractUserId(String token) {
        return extractClaim(token, claims -> claims.get("id", Integer.class));
    }
    private Claims extractAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
