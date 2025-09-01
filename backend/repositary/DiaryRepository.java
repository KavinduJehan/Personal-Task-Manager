package com.taskmanager.backend.repository;

import com.taskmanager.backend.model.DiaryEntry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DiaryRepository extends MongoRepository<DiaryEntry, String> {
    Optional<DiaryEntry> findByDate(LocalDate date);
    List<DiaryEntry> findTop10ByOrderByDateDesc();
}