// package com.example.demo.service;

// import com.example.demo.model.Person;
// import com.example.demo.model.Profile;
// import com.example.demo.repo.PersonRepo;
// import com.example.demo.repo.ProfileRepo;
// import jakarta.persistence.EntityNotFoundException;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class PersonService {

//     @Autowired
//     private PersonRepo personRepository;

//     @Autowired
//     private ProfileRepo profileRepository;

//     private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

//     public List<Person> getAllPersons() {
//         return personRepository.findAll();
//     }

//     public Optional<Person> getPersonById(int id) {
//         return personRepository.findById(id);
//     }

//     public Person createPerson(Person person) {
//         if (person == null || person.getEmail() == null || person.getPassword() == null) {
//             throw new IllegalArgumentException("Person details are missing or invalid");
//         }

//         String encodedPassword = this.passwordEncoder.encode(person.getPassword());
//         person.setPassword(encodedPassword);

//         Profile profile = person.getProfile();
//         if (profile != null) {
//             Profile savedProfile = profileRepository.save(profile);
//             person.setProfile(savedProfile);
//         }

//         return personRepository.save(person);
//     }

//     public Person updatePerson(int id, Person person) {
//         if (person == null) {
//             throw new IllegalArgumentException("Person details are missing");
//         }

//         Optional<Person> existingPersonOpt = personRepository.findById(id);
//         if (existingPersonOpt.isPresent()) {
//             Person existingPerson = existingPersonOpt.get();

//             if (person.getPassword() != null) {
//                 String encodedPassword = this.passwordEncoder.encode(person.getPassword());
//                 existingPerson.setPassword(encodedPassword);
//             }

//             if (person.getEmail() != null) {
//                 existingPerson.setEmail(person.getEmail());
//             }

//             if (person.getProfile() != null) {
//                 Profile profile = person.getProfile();
//                 Profile existingProfile = existingPerson.getProfile();
//                 if (existingProfile != null) {
//                     profile.setProfileId(existingProfile.getProfileId());
//                     profileRepository.save(profile);
//                 } else {
//                     Profile savedProfile = profileRepository.save(profile);
//                     existingPerson.setProfile(savedProfile);
//                 }
//             }

//             return personRepository.save(existingPerson);
//         } else {
//             throw new EntityNotFoundException("Person with id " + id + " not found");
//         }
//     }

//     public boolean deletePerson(int id) {
//         if (personRepository.existsById(id)) {
//             personRepository.deleteById(id);
//             return true;
//         } else {
//             throw new EntityNotFoundException("Person with id " + id + " not found");
//         }
//     }
// }
    