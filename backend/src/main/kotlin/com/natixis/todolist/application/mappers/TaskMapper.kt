package com.natixis.todolist.application.mappers

import com.natixis.todolist.application.dtos.CreationTaskDto
import com.natixis.todolist.application.dtos.ResponseTaskDto
import com.natixis.todolist.domain.entities.ToDoTask

class TaskMapper {
    fun toDomain(task: CreationTaskDto): ToDoTask {
        return ToDoTask(0, task.label, task.complete, task.priority)
    }

    fun toDto(task: ToDoTask): ResponseTaskDto {
        return ResponseTaskDto(task.id, task.label, task.complete, task.priority)
    }
}