// package com.example.demo.controller;

// import com.example.demo.model.Person;
// import com.example.demo.service.PersonService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Optional;

// @RestController
// @CrossOrigin(origins = "http://localhost:3000")
// @RequestMapping("/api/persons")
// public class PersonController {

//     @Autowired
//     private PersonService personService;

//     @GetMapping
//     public List<Person> getAllPersons() {
//         return personService.getAllPersons();
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<Person> getPersonById(@PathVariable int id) {
//         Optional<Person> person = personService.getPersonById(id);
//         return person.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//     }

//     @PostMapping
//     public ResponseEntity<Person> createPerson(@RequestBody Person person) {
//         try {
//             Person createdPerson = personService.createPerson(person);
//             return ResponseEntity.ok(createdPerson);
//         } catch (IllegalArgumentException e) {
//             return ResponseEntity.badRequest().body(null);
//         }
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<Person> updatePerson(@PathVariable int id, @RequestBody Person person) {
//         if (id == person.getUserId()) {
//             Person updatedPerson = personService.updatePerson(id, person);
//             if (updatedPerson != null) {
//                 return ResponseEntity.ok(updatedPerson);
//             } else {
//                 return ResponseEntity.notFound().build();
//             }
//         } else {
//             return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
//         }
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deletePerson(@PathVariable int id) {
//         if (personService.deletePerson(id)) {
//             return ResponseEntity.noContent().build();
//         } else {
//             return ResponseEntity.notFound().build();
//         }
//     }
// }
