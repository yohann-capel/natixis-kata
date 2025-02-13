package com.natixis.todolist.infrastructure.repositories

import com.natixis.todolist.domain.entities.ToDoTask
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TaskJpaRepository : JpaRepository<ToDoTask, Long> {
}