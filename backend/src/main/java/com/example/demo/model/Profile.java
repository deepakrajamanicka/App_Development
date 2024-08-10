package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "profile")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int profileId;

    private String name; // New field
    private String age;
    private String dept;
    private String role;
    private String mobile;
    private String address;

    // One-to-One relationship with Schedule
    @OneToOne
    @JoinColumn(name = "schedule_id", referencedColumnName = "scheduleId")
    private Schedule schedule;

    // One-to-One relationship with ShiftSwap
    @OneToOne
    @JoinColumn(name = "shiftswap_id", referencedColumnName = "shiftSwapId")
    private ShiftSwap shiftSwap;

    // One-to-One relationship with TimeOffRequest
    @OneToOne
    @JoinColumn(name = "timeoffrequest_id", referencedColumnName = "timeOffRequestId")
    private TimeOffRequest timeOffRequest;

    // Constructors
    public Profile() {}

    public Profile(String name, String age, String dept, String role, String mobile, String address) {
        this.name = name; // Initialize new field
        this.age = age;
        this.dept = dept;
        this.role = role;
        this.mobile = mobile;
        this.address = address;
    }

    // Getters and Setters
    public int getProfileId() {
        return profileId;
    }

    public void setProfileId(int profileId) {
        this.profileId = profileId;
    }

    public String getName() { // New getter
        return name;
    }

    public void setName(String name) { // New setter
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public ShiftSwap getShiftSwap() {
        return shiftSwap;
    }

    public void setShiftSwap(ShiftSwap shiftSwap) {
        this.shiftSwap = shiftSwap;
    }

    public TimeOffRequest getTimeOffRequest() {
        return timeOffRequest;
    }

    public void setTimeOffRequest(TimeOffRequest timeOffRequest) {
        this.timeOffRequest = timeOffRequest;
    }
}
