package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.ShiftSwap;

public interface ShiftSwapRepo extends JpaRepository<ShiftSwap,Integer>{
    
}
