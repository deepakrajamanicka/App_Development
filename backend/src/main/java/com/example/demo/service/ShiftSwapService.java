package com.example.demo.service;

import com.example.demo.model.ShiftSwap;
import com.example.demo.repo.ShiftSwapRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShiftSwapService {

    @Autowired
    private ShiftSwapRepo shiftSwapRepository;

    public List<ShiftSwap> getAllShiftSwaps() {
        return shiftSwapRepository.findAll();
    }

    public Optional<ShiftSwap> getShiftSwapById(int id) {
        return shiftSwapRepository.findById(id);
    }

    public ShiftSwap createShiftSwap(ShiftSwap shiftSwap) {
        return shiftSwapRepository.save(shiftSwap);
    }

    public ShiftSwap updateShiftSwap(int id, ShiftSwap shiftSwap) {
        if (shiftSwapRepository.existsById(id)) {
            shiftSwap.setShiftSwapId(id); // Ensure the ID is set for the update
            return shiftSwapRepository.save(shiftSwap);
        } else {
            return null; // Return null or throw an exception if the ShiftSwap does not exist
        }
    }

    public boolean deleteShiftSwap(int id) {
        if (shiftSwapRepository.existsById(id)) {
            shiftSwapRepository.deleteById(id);
            return true;
        } else {
            return false; // Return false if the ShiftSwap does not exist
        }
    }
}
