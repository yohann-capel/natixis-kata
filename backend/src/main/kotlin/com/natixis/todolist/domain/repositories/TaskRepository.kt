package com.natixis.todolist.domain.repositories

import com.natixis.todolist.domain.entities.ToDoTask

interface TaskRepository {
    fun save(task: ToDoTask): ToDoTask
    fun findById(taskId: Long): ToDoTask?
    fun delete(task: ToDoTask)
    fun findAll(): List<ToDoTask>
}