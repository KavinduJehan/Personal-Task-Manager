package com.taskmanager.backend.repository; 
import com.taskmanager.backend.model.Task; 
import com.taskmanager.backend.model.Status; 
import org.springframework.data.mongodb.repository.MongoRepository; 
import org.springframework.stereotype.Repository; 
import java.time.LocalDateTime; 
import java.util.List; 

@Repository
 public interface TaskRepository extends MongoRepository<Task, String> { 
    List<Task> findByStatus(Status status); 
    List<Task> findByModule(String module); 
    List<Task> findByDueDateBetween(LocalDateTime start, LocalDateTime end); 
    List<Task> findByStatusOrderByDueDateAsc(Status status); 
} 