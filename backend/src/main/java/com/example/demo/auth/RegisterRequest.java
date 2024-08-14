package com.example.demo.auth;


import com.example.demo.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String name;
    private String email;
    private String password;
    private Role role;
    private String profession;
    private String age;
    private String dept;
    private String experience;
    private String mobile;
    private String address;

}
