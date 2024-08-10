package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "shiftswapping")
public class ShiftSwap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int shiftSwapId;

    private String newStTime;
    private String newEndTime;
    private String requestDate;

    @OneToOne(mappedBy = "shiftSwap")
    private Profile profile;

    // Constructors, getters, and setters
    public ShiftSwap() {}

    public ShiftSwap(String newStTime, String newEndTime, String requestDate) {
        this.newStTime = newStTime;
        this.newEndTime = newEndTime;
        this.requestDate = requestDate;
    }

    public int getShiftSwapId() {
        return shiftSwapId;
    }

    public void setShiftSwapId(int shiftSwapId) {
        this.shiftSwapId = shiftSwapId;
    }

    public String getNewStTime() {
        return newStTime;
    }

    public void setNewStTime(String newStTime) {
        this.newStTime = newStTime;
    }

    public String getNewEndTime() {
        return newEndTime;
    }

    public void setNewEndTime(String newEndTime) {
        this.newEndTime = newEndTime;
    }

    public String getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(String requestDate) {
        this.requestDate = requestDate;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }
}
