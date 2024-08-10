package com.example.demo.controller;

import com.example.demo.model.TimeOffRequest;
import com.example.demo.service.TimeOffRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/time-off-requests")
public class TimeOffRequestController {

    @Autowired
    private TimeOffRequestService timeOffRequestService;

    @GetMapping
    public ResponseEntity<List<TimeOffRequest>> getAllTimeOffRequests() {
        List<TimeOffRequest> timeOffRequests = timeOffRequestService.getAllTimeOffRequests();
        return new ResponseEntity<>(timeOffRequests, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TimeOffRequest> getTimeOffRequestById(@PathVariable int id) {
        Optional<TimeOffRequest> timeOffRequest = timeOffRequestService.getTimeOffRequestById(id);
        return timeOffRequest.map(
                request -> new ResponseEntity<>(request, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<TimeOffRequest> createTimeOffRequest(@RequestBody TimeOffRequest timeOffRequest) {
        TimeOffRequest createdRequest = timeOffRequestService.createTimeOffRequest(timeOffRequest);
        return new ResponseEntity<>(createdRequest, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TimeOffRequest> updateTimeOffRequest(@PathVariable int id, @RequestBody TimeOffRequest timeOffRequest) {
        TimeOffRequest updatedRequest = timeOffRequestService.updateTimeOffRequest(id, timeOffRequest);
        return updatedRequest != null ?
                new ResponseEntity<>(updatedRequest, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTimeOffRequest(@PathVariable int id) {
        boolean isDeleted = timeOffRequestService.deleteTimeOffRequest(id);
        return isDeleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
