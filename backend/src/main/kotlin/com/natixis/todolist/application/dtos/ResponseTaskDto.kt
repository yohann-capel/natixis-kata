package com.natixis.todolist.application.dtos

import com.natixis.todolist.application.enums.Priority

data class ResponseTaskDto(val id: Long, val label: String, val complete: Boolean, val priority: Priority) {
}