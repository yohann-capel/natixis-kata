package com.natixis.todolist.application.dtos

import com.natixis.todolist.application.enums.Priority

data class InputTaskDto(val label: String?, val complete: Boolean?, val priority: Priority?) {
}