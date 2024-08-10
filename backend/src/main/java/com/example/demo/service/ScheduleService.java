package com.example.demo.service;

import com.example.demo.model.Schedule;
import com.example.demo.repo.ScheduleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepo scheduleRepository;

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    public Optional<Schedule> getScheduleById(int id) {
        return scheduleRepository.findById(id);
    }

    public Schedule createSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    public Schedule updateSchedule(int id, Schedule schedule) {
        if (scheduleRepository.existsById(id)) {
            schedule.setScheduleId(id); // Ensure the ID is set for the update
            return scheduleRepository.save(schedule);
        } else {
            return null; // Return null or throw an exception if the schedule does not exist
        }
    }

    public boolean deleteSchedule(int id) {
        if (scheduleRepository.existsById(id)) {
            scheduleRepository.deleteById(id);
            return true;
        } else {
            return false; // Return false if the schedule does not exist
        }
    }
}
