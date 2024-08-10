package com.example.demo.service;

import com.example.demo.model.Profile;
import com.example.demo.repo.ProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepo profileRepository;

    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    public Optional<Profile> getProfileById(int id) {
        return profileRepository.findById(id);
    }

    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public Profile updateProfile(int id, Profile profile) {
        if (profileRepository.existsById(id)) {
            profile.setProfileId(id); // Ensure the ID is set for the update
            return profileRepository.save(profile);
        } else {
            return null; // Return null or throw an exception if the profile does not exist
        }
    }

    public boolean deleteProfile(int id) {
        if (profileRepository.existsById(id)) {
            profileRepository.deleteById(id);
            return true;
        } else {
            return false; // Return false if the profile does not exist
        }
    }
}
