package com.natixis.todolist.domain.services

import com.natixis.todolist.application.enums.Priority
import com.natixis.todolist.domain.entities.ToDoTask

interface TaskService {
    fun create(newTask: ToDoTask): ToDoTask
    fun updateTask(taskId: Long, label: String?, complete: Boolean?, priority: Priority?): ToDoTask
    fun deleteTask(taskId: Long)
    fun findTaskById(taskId: Long): ToDoTask
    fun getAll(): List<ToDoTask>

}