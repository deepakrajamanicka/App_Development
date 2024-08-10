package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.TimeOffRequest;

public interface TimeOffRequestRepo extends JpaRepository<TimeOffRequest,Integer>{
    
}
