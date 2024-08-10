package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Schedule;

public interface ScheduleRepo extends JpaRepository<Schedule,Integer>{
    
}
