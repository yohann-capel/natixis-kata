package com.natixis.todolist.application.controllers

import com.natixis.todolist.application.dtos.CreationTaskDto
import com.natixis.todolist.application.dtos.InputTaskDto
import com.natixis.todolist.application.dtos.ResponseTaskDto
import com.natixis.todolist.application.mappers.TaskMapper
import com.natixis.todolist.domain.entities.ToDoTask
import com.natixis.todolist.domain.services.TaskService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/tasks")
@CrossOrigin(originPatterns = ["http://localhost:4200"])
class TaskController(private val taskService: TaskService, private val mapper: TaskMapper) {

    @GetMapping
    fun getAll(): ResponseEntity<List<ResponseTaskDto>> {
        return ResponseEntity.ok(
            taskService.getAll().map { task -> mapper.toDto(task) }
        )
    }

    @GetMapping("/{taskId}")
    fun getById(@PathVariable taskId: Long): ResponseEntity<ResponseTaskDto> {
        val task: ToDoTask = taskService.findTaskById(taskId)

        return ResponseEntity.ok(mapper.toDto(task))
    }

    @GetMapping("/todo")
    fun getAllTaskToDo(): ResponseEntity<List<ResponseTaskDto>> {
        return ResponseEntity.ok(
            taskService.getAll().filter { task -> !task.complete }.map{ task -> mapper.toDto(task) }
        )
    }

    @PostMapping
    fun create(@RequestBody newTask: CreationTaskDto): ResponseEntity<ResponseTaskDto> {
        return ResponseEntity(mapper.toDto(taskService.create(mapper.toDomain(newTask))), HttpStatus.CREATED)
    }

    @PatchMapping("/{taskId}")
    fun setCompleted(@PathVariable taskId: Long, @RequestBody inputTask: InputTaskDto): ResponseEntity<ResponseTaskDto> {
        return ResponseEntity.ok(
            mapper.toDto(
                taskService.updateTask(taskId, inputTask.label, inputTask.complete, inputTask.priority)
            )
        )
    }

    @DeleteMapping("/{taskId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteTask(@PathVariable taskId: Long) {
        taskService.deleteTask(taskId)
    }
}