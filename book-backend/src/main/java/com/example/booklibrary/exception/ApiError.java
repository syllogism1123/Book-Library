package com.example.booklibrary.exception;

import java.time.Instant;

public record ApiError(
        String message,
        Instant timestamp
) {

}