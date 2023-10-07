package com.chrisbees.spring.security.practice.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.chrisbees.spring.security.practice.user.Permission.*;

@RequiredArgsConstructor
public enum Role {

    ADMIN(
            Set.of(
                    ADMIN_READ,
                    ADMIN_UPDATE,
                    ADMIN_DELETE,
                    ADMIN_CREATE,
                    STAFF_READ,
                    STAFF_CREATE,
                    STAFF_DELETE,
                    STAFF_UPDATE,
                    STUDENT_READ

            )
    ),
    STAFF(
            Set.of(
                    STAFF_READ

            )
    ),
    STUDENT(
            Set.of(
                    STUDENT_READ
            )
    );

    @Getter
    private final Set<Permission> permissions;


    public List<SimpleGrantedAuthority> grantedAuthorities() {
        var authorities = getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_"+this.name()));
        return authorities;
    }
}
