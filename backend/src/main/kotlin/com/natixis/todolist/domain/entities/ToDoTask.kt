package com.natixis.todolist.domain.entities

import com.natixis.todolist.application.enums.Priority
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity
class ToDoTask(
    @Id @GeneratedValue(strategy = GenerationType.AUTO) val id: Long,
    label: String,
    var complete: Boolean = false,
    @Enumerated(EnumType.STRING) var priority: Priority = Priority.LOW)
{
    var label: String = ""
        set(label) {
            require("" != label) { "Label can't be empty" }
            field = label
        }


    init {
        this.label = label
    }
}