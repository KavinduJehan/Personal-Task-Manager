package com.taskmanager.backend.service;

import com.taskmanager.backend.model.DiaryEntry;
import com.taskmanager.backend.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DiaryService {
    
    @Autowired
    private DiaryRepository diaryRepository;
    
    public List<DiaryEntry> getAllEntries() {
        return diaryRepository.findAll();
    }
    
    public Optional<DiaryEntry> getEntryByDate(LocalDate date) {
        return diaryRepository.findByDate(date);
    }
    
    public DiaryEntry saveEntry(DiaryEntry entry) {
        entry.setUpdatedAt(LocalDateTime.now());
        return diaryRepository.save(entry);
    }
    
    public List<DiaryEntry> getRecentEntries() {
        return diaryRepository.findTop10ByOrderByDateDesc();
    }
}