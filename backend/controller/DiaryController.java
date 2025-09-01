package com.taskmanager.backend.controller;

import com.taskmanager.backend.model.DiaryEntry;
import com.taskmanager.backend.service.DiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/diary")
@CrossOrigin(origins = "http://localhost:3000")
public class DiaryController {
    
    @Autowired
    private DiaryService diaryService;
    
    @GetMapping
    public List<DiaryEntry> getAllEntries() {
        return diaryService.getAllEntries();
    }
    
    @GetMapping("/{date}")
    public ResponseEntity<DiaryEntry> getEntryByDate(@PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        return diaryService.getEntryByDate(localDate)
            .map(entry -> ResponseEntity.ok().body(entry))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public DiaryEntry createEntry(@RequestBody DiaryEntry entry) {
        return diaryService.saveEntry(entry);
    }
    
    @GetMapping("/recent")
    public List<DiaryEntry> getRecentEntries() {
        return diaryService.getRecentEntries();
    }
}