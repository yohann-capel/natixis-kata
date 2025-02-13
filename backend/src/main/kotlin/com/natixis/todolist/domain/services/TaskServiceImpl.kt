package com.natixis.todolist.domain.services

import com.natixis.todolist.application.enums.Priority
import com.natixis.todolist.domain.entities.ToDoTask
import com.natixis.todolist.domain.repositories.TaskRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class TaskServiceImpl(val taskRepository: TaskRepository) : TaskService {

    @Transactional
    override fun create(newTask: ToDoTask): ToDoTask {
        return taskRepository.save(newTask)
    }

    @Transactional
    override fun updateTask(taskId: Long, label: String?, complete: Boolean?, priority: Priority?): ToDoTask {
        val task: ToDoTask = findTaskById(taskId)
        if(label != null)
            task.label = label
        if(complete != null)
            task.complete = complete
        if(priority != null)
            task.priority = priority

        return taskRepository.save(task)
    }

    @Transactional
    override fun deleteTask(taskId: Long) {
        val task: ToDoTask = findTaskById(taskId)

        taskRepository.delete(task)
    }

    override fun findTaskById(taskId: Long): ToDoTask {
        return taskRepository.findById(taskId) ?: throw IllegalArgumentException("Task not found with id : $taskId")
    }

    override fun getAll(): List<ToDoTask> {
        return taskRepository.findAll()
    }

}