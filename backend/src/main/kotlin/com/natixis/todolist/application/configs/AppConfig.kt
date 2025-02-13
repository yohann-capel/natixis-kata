package com.natixis.todolist.application.configs

import com.natixis.todolist.application.mappers.TaskMapper
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class AppConfig {

    @Bean
    fun taskMapper(): TaskMapper {
        return TaskMapper()
    }
}