package com.example.booklibrary.controller;

import com.example.booklibrary.model.MongoUser;
import com.example.booklibrary.model.MongoUserDTO;
import com.example.booklibrary.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/users")

public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public String login() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @GetMapping("/me")
    public String getMe() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @GetMapping("/user")
    public Optional<MongoUser> findUserByUsername() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userService.findUserByUsername(username);
    }

    @PostMapping("/signup")
    public ResponseEntity<MongoUser> createUser(@RequestBody MongoUserDTO mongoUserDTO) {
        userService.createMongoUser(mongoUserDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/logout")
    public void logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
    }

}
