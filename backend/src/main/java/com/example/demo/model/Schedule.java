package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "schedule")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scheduleId;

    private LocalDate stDate;
    private LocalDate endDate;
    private LocalTime stTime;
    private LocalTime endTime;
    private int hoursWorked;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id") // Foreign key column
    private TimeOffRequest timeOffRequest;

    @OneToOne(mappedBy = "schedule", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Profile profile;

    // Constructors, getters, and setters
    public Schedule() {}

    public Schedule(LocalDate stDate, LocalDate endDate, LocalTime stTime, LocalTime endTime, int hoursWorked) {
        this.stDate = stDate;
        this.endDate = endDate;
        this.stTime = stTime;
        this.endTime = endTime;
        this.hoursWorked = hoursWorked;
    }

    // Getters and Setters
    public int getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(int scheduleId) {
        this.scheduleId = scheduleId;
    }

    public LocalDate getStDate() {
        return stDate;
    }

    public void setStDate(LocalDate stDate) {
        this.stDate = stDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public LocalTime getStTime() {
        return stTime;
    }

    public void setStTime(LocalTime stTime) {
        this.stTime = stTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public int getHoursWorked() {
        return hoursWorked;
    }

    public void setHoursWorked(int hoursWorked) {
        this.hoursWorked = hoursWorked;
    }

    public TimeOffRequest getTimeOffRequest() {
        return timeOffRequest;
    }

    public void setTimeOffRequest(TimeOffRequest timeOffRequest) {
        this.timeOffRequest = timeOffRequest;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }
}
