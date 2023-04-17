package com.example.booklibrary.controller;

import com.example.booklibrary.model.MongoUser;
import com.example.booklibrary.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
@RequestMapping("/api/users")

public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public String getMe() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/login")
    public String login() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/signup")
    public ResponseEntity<MongoUser> createUser(@RequestBody MongoUser mongoUser) {
        userService.addMongoUser(mongoUser);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


}
