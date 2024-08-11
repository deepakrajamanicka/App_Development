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

    public List<Profile> getProfilesByRoleAndDepartment(String role, String department) {
        if (role != null && department != null) {
            return profileRepository.findByRoleAndDept(role, department);
        } else if (role != null) {
            return profileRepository.findByRole(role);
        } else if (department != null) {
            return profileRepository.findByDept(department);
        } else {
            return getAllProfiles();
        }
    }

    public Optional<Profile> getProfileById(int id) {
        return profileRepository.findById(id);
    }

    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public Profile updateProfile(int id, Profile profile) {
        if (profileRepository.existsById(id)) {
            Profile existingProfile = profileRepository.findById(id).orElseThrow();

            existingProfile.setName(profile.getName());
            existingProfile.setAge(profile.getAge());
            existingProfile.setDept(profile.getDept());
            existingProfile.setRole(profile.getRole());
            existingProfile.setExperience(profile.getExperience());
            existingProfile.setMobile(profile.getMobile());
            existingProfile.setAddress(profile.getAddress());

            return profileRepository.save(existingProfile);
        } else {
            return null;
        }
    }

    public boolean deleteProfile(int id) {
        if (profileRepository.existsById(id)) {
            profileRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
