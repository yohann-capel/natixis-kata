package com.natixis.todolist

import com.natixis.todolist.domain.entities.ToDoTask
import com.natixis.todolist.domain.repositories.TaskRepository
import com.natixis.todolist.domain.services.TaskServiceImpl
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.kotlin.whenever
import org.mockito.kotlin.any
import org.mockito.kotlin.verify
import org.mockito.kotlin.verifyNoInteractions
import org.springframework.boot.test.context.SpringBootTest
import kotlin.test.assertEquals
import kotlin.test.assertNotNull

@SpringBootTest
class TaskServiceTest {

    @Mock
    private lateinit var taskRepository: TaskRepository

    @InjectMocks
    private lateinit var taskService: TaskServiceImpl

    private lateinit var task: ToDoTask

    @BeforeEach
    fun initTask() {
        task = ToDoTask(1, "label", false)
    }

    @Test
    fun shouldCreateTaskAndSaveIt() {
        whenever(taskRepository.save(any())).thenReturn(task)

        val result = taskService.create(task)

        verify(taskRepository).save(any())
        assertNotNull(result)
    }

    @Test
    fun shouldGetAllTaskToBeDone() {
        whenever(taskRepository.findAll()).thenReturn(listOf(task))

        val result = taskService.getAll()

        verify(taskRepository).findAll()
        assertEquals(1, result.size)
    }

    @Test
    fun shouldTaskById() {
        whenever(taskRepository.findById(any())).thenReturn(task)

        val result = taskService.findTaskById(1)

        verify(taskRepository).findById(any())
        assertNotNull(result)
    }

    @Test
    fun shouldThrowIfIdNotFound() {
        whenever(taskRepository.findById(any())).thenReturn(null)

        assertThrows<IllegalArgumentException> { taskService.findTaskById(1) }
        verify(taskRepository).findById(any())
    }
}