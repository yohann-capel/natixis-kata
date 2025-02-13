package com.natixis.todolist.infrastructure.repositories

import com.natixis.todolist.domain.entities.ToDoTask
import com.natixis.todolist.domain.repositories.TaskRepository
import org.springframework.stereotype.Repository

@Repository
class TaskRepositoryImpl(private val jpaRepository: TaskJpaRepository) : TaskRepository {

    override fun save(task: ToDoTask): ToDoTask {
        return jpaRepository.save(task)
    }

    override fun findById(taskId: Long): ToDoTask? {
        return jpaRepository.findById(taskId).orElse(null)
    }

    override fun delete(task: ToDoTask) {
        jpaRepository.delete(task)
    }

    override fun findAll(): List<ToDoTask> {
        return jpaRepository.findAll()
    }
}