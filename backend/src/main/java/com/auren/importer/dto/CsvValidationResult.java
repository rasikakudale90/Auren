package com.auren.importer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CsvValidationResult<T> {
    private int totalRows;
    private int validRows;
    private int duplicateRows;
    private int errorRows;
    @Builder.Default
    private List<RowError> errors = new ArrayList<>();
    @Builder.Default
    private List<T> previewData = new ArrayList<>();

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RowError {
        private int rowNumber;
        private String field;
        private String message;
    }
}
