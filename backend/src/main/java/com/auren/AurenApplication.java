package com.auren;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AurenApplication {

    public static void main(String[] args) {
        SpringApplication.run(AurenApplication.class, args);
    }
}
