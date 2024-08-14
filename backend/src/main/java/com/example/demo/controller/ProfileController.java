package com.example.demo.controller;

import com.example.demo.model.Profile;
import com.example.demo.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/profiles")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping
    public ResponseEntity<List<Profile>> getAllProfiles(
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String department) {
        List<Profile> profiles;
        if (role == null && department == null) {
            profiles = profileService.getAllProfiles();
        } else {
            profiles = profileService.getProfilesByRoleAndDepartment(role, department);
        }
        return new ResponseEntity<>(profiles, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profile> getProfileById(@PathVariable int id) {
        Optional<Profile> profile = profileService.getProfileById(id);
        return profile.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Profile> createProfile(@RequestBody Profile profile) {
        Profile createdProfile = profileService.createProfile(profile);
        return new ResponseEntity<>(createdProfile, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profile> updateProfile(@PathVariable int id, @RequestBody Profile profile) {
        Profile updatedProfile = profileService.updateProfile(id, profile);
        if (updatedProfile != null) {
            return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable int id) {
        boolean deleted = profileService.deleteProfile(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
