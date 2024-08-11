package com.example.demo.repo;

import com.example.demo.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfileRepo extends JpaRepository<Profile, Integer> {
    List<Profile> findByRole(String role);
    List<Profile> findByDept(String dept);
    List<Profile> findByRoleAndDept(String role, String dept);
}
