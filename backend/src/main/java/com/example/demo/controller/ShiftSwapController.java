package com.example.demo.controller;

import com.example.demo.model.ShiftSwap;
import com.example.demo.service.ShiftSwapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/shift-swaps")
public class ShiftSwapController {

    @Autowired
    private ShiftSwapService shiftSwapService;

    @GetMapping
    public ResponseEntity<List<ShiftSwap>> getAllShiftSwaps() {
        List<ShiftSwap> shiftSwaps = shiftSwapService.getAllShiftSwaps();
        return new ResponseEntity<>(shiftSwaps, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShiftSwap> getShiftSwapById(@PathVariable int id) {
        Optional<ShiftSwap> shiftSwap = shiftSwapService.getShiftSwapById(id);
        return shiftSwap.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<ShiftSwap> createShiftSwap(@RequestBody ShiftSwap shiftSwap) {
        ShiftSwap createdShiftSwap = shiftSwapService.createShiftSwap(shiftSwap);
        return new ResponseEntity<>(createdShiftSwap, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShiftSwap> updateShiftSwap(@PathVariable int id, @RequestBody ShiftSwap shiftSwap) {
        ShiftSwap updatedShiftSwap = shiftSwapService.updateShiftSwap(id, shiftSwap);
        if (updatedShiftSwap != null) {
            return new ResponseEntity<>(updatedShiftSwap, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShiftSwap(@PathVariable int id) {
        boolean deleted = shiftSwapService.deleteShiftSwap(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
