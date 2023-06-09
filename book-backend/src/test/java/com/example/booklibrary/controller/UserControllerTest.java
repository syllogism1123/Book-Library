package com.example.booklibrary.controller;

import com.example.booklibrary.model.MongoUserDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureJsonTesters
class UserControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private JacksonTester<MongoUserDTO> json;
    @MockBean
    PasswordEncoder passwordEncoder;

    @Test
    @DirtiesContext
    @WithMockUser
    void login_Successful() throws Exception {
        mvc.perform(post("/api/users/login").
                        contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())).
                andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void login_failed() throws Exception {
        mvc.perform(post("/api/users/login").
                        contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())).
                andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    void getMe_whenNotLoggedIn() throws Exception {
        mvc.perform(get("/api/users/me").
                        contentType(MediaType.APPLICATION_JSON)).
                andExpect(content().string("anonymousUser")).
                andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getMe_whenLoggedIn() throws Exception {
        mvc.perform(get("/api/users/me").
                        contentType(MediaType.APPLICATION_JSON)).
                andExpect(content().string("user")).
                andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void testCreateUser() throws Exception {
        MongoUserDTO mongoUserDTO = new MongoUserDTO(
                "username", "password", "firstname", "lastname");
        mvc.perform(post("/api/users/signup").
                        contentType(MediaType.APPLICATION_JSON).
                        content(json.write(mongoUserDTO).getJson()).with(csrf())).
                andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testLoadMongoUserByName() throws Exception {
        String username = "username";
        MongoUserDTO mongoUserDTO = new MongoUserDTO(username
                , "password", "firstname", "lastname");
        mvc.perform(post("/api/users/signup").
                        contentType(MediaType.APPLICATION_JSON).
                        content(json.write(mongoUserDTO).getJson()).with(csrf())).
                andExpect(MockMvcResultMatchers.status().isCreated());

        MvcResult result = mvc.perform(get("/api/users/" + username)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        String responseJson = result.getResponse().getContentAsString();
        MongoUserDTO responseUserDTO = json.parseObject(responseJson);

        assertEquals(mongoUserDTO.username(), responseUserDTO.username());
        assertEquals(passwordEncoder.encode(mongoUserDTO.password()), responseUserDTO.password());
        assertEquals(mongoUserDTO.firstname(), responseUserDTO.firstname());
        assertEquals(mongoUserDTO.lastname(), responseUserDTO.lastname());

    }


    @Test
    @DirtiesContext
    @WithMockUser
    void testLogout() throws Exception {
        mvc.perform(post("/api/users/logout").with(csrf()))
                .andExpect(status().isOk());
    }
}