package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "timeoffrequest")
public class TimeOffRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int timeOffRequestId;

    private String stDate;
    private String endDate;
    private String leaveType;
    private String reason;
    private String approvalStatus;

    @OneToOne(mappedBy = "timeOffRequest")
    private Schedule schedule;

    @OneToOne(mappedBy = "timeOffRequest")
    private Profile profile;

    // Constructors, getters, and setters
    public TimeOffRequest() {}

    public TimeOffRequest(String stDate, String endDate, String leaveType, String reason, String approvalStatus) {
        this.stDate = stDate;
        this.endDate = endDate;
        this.leaveType = leaveType;
        this.reason = reason;
        this.approvalStatus = approvalStatus;
    }

    public int getTimeOffRequestId() {
        return timeOffRequestId;
    }

    public void setTimeOffRequestId(int timeOffRequestId) {
        this.timeOffRequestId = timeOffRequestId;
    }

    public String getStDate() {
        return stDate;
    }

    public void setStDate(String stDate) {
        this.stDate = stDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }
}
