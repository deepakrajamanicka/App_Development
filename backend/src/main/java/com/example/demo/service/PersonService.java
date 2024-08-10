package com.example.demo.service;

import com.example.demo.model.Person;
import com.example.demo.repo.PersonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonService {

    @Autowired
    private PersonRepo personRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }

    public Optional<Person> getPersonById(int id) {
        return personRepository.findById(id);
    }

    public Person createPerson(Person person) {
        // Encrypt the password before saving
        String encodedPassword = this.passwordEncoder.encode(person.getPassword());
        person.setPassword(encodedPassword);
        return personRepository.save(person);
    }

    public Person updatePerson(int id, Person person) {
        if (personRepository.existsById(id)) {
            // Encrypt the password before updating if it's present
            if (person.getPassword() != null) {
                String encodedPassword = this.passwordEncoder.encode(person.getPassword());
                person.setPassword(encodedPassword);
            }
            person.setUserId(id); // Ensure the ID is set for the update
            return personRepository.save(person);
        } else {
            return null; // Return null or throw an exception if the person does not exist
        }
    }

    public boolean deletePerson(int id) {
        if (personRepository.existsById(id)) {
            personRepository.deleteById(id);
            return true;
        } else {
            return false; // Return false if the person does not exist
        }
    }
}
