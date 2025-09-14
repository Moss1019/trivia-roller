package com.mossonthetree.trivia.service;

import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.time.Duration;
import java.util.Collections;
import java.util.HashSet;

@ApplicationScoped()
public class AuthService {
    private static final String WEB_APP_PW = "secret123!";

    private final String issuer;

    public AuthService(@ConfigProperty(name = "mp.jwt.verify.issuer") String issuer) {
        this.issuer = issuer;
    }

    public boolean authenticate(Login login) {
        return WEB_APP_PW.equals(login.password());
    }

    public String generateToken(String username, String role) {
        return Jwt.issuer(issuer)
                .upn(username)
                .groups(new HashSet<>(Collections.singletonList(role)))
                .claim("username", username)
                .claim("email", username + "@quarkus.io")
                .expiresAt(System.currentTimeMillis() / 1000 + Duration.ofDays(1).getSeconds())
                .sign();
    }

    public record Login(String username, String password) {

    }
}
