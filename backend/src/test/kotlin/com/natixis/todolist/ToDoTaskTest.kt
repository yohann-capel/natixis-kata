package com.natixis.todolist

import com.natixis.todolist.domain.entities.ToDoTask
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.boot.test.context.SpringBootTest
import kotlin.test.assertEquals

@SpringBootTest
class ToDoTaskTest {

    lateinit var task: ToDoTask

    @BeforeEach
    fun before() {
        task = ToDoTask(1,"label", false)
    }

    @Test
    fun shouldThrowIfLabelEmpty() {
        val ex = assertThrows<IllegalArgumentException> { task.label = "" }
        assertEquals(ex.message, "Label can't be empty")
    }

    @Test
    fun  shouldNotThrowWhenUpdatingLabel() {
        task.label = "updated"
        assertEquals("updated", task.label)
    }
}