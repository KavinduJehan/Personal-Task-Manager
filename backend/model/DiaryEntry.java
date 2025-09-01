package com.taskmanager.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "diary_entries")
public class DiaryEntry {
    @Id
    private String id;
    
    private LocalDate date;
    private String whatWentWell;
    private String whatCouldBeBetter;
    private int moodLevel; // 1-10 scale
    private int pomodoroSessions;
    private int focusRating; // 1-5 stars
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public DiaryEntry() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters (generate with IDE)
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    
    public String getWhatWentWell() { return whatWentWell; }
    public void setWhatWentWell(String whatWentWell) { this.whatWentWell = whatWentWell; }
    
    public String getWhatCouldBeBetter() { return whatCouldBeBetter; }
    public void setWhatCouldBeBetter(String whatCouldBeBetter) { this.whatCouldBeBetter = whatCouldBeBetter; }
    
    public int getMoodLevel() { return moodLevel; }
    public void setMoodLevel(int moodLevel) { this.moodLevel = moodLevel; }
    
    public int getPomodoroSessions() { return pomodoroSessions; }
    public void setPomodoroSessions(int pomodoroSessions) { this.pomodoroSessions = pomodoroSessions; }
    
    public int getFocusRating() { return focusRating; }
    public void setFocusRating(int focusRating) { this.focusRating = focusRating; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
