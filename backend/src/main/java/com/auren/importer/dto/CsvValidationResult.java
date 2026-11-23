package com.auren.importer.dto;

import java.util.ArrayList;
import java.util.List;

public class CsvValidationResult<T> {
    private int totalRows;
    private int validRows;
    private int duplicateRows;
    private int errorRows;
    private List<RowError> errors = new ArrayList<>();
    private List<T> previewData = new ArrayList<>();

    public CsvValidationResult() {}

    public CsvValidationResult(int totalRows, int validRows, int duplicateRows, int errorRows, List<RowError> errors, List<T> previewData) {
        this.totalRows = totalRows;
        this.validRows = validRows;
        this.duplicateRows = duplicateRows;
        this.errorRows = errorRows;
        this.errors = errors != null ? errors : new ArrayList<>();
        this.previewData = previewData != null ? previewData : new ArrayList<>();
    }

    public int getTotalRows() { return totalRows; }
    public void setTotalRows(int totalRows) { this.totalRows = totalRows; }

    public int getValidRows() { return validRows; }
    public void setValidRows(int validRows) { this.validRows = validRows; }

    public int getDuplicateRows() { return duplicateRows; }
    public void setDuplicateRows(int duplicateRows) { this.duplicateRows = duplicateRows; }

    public int getErrorRows() { return errorRows; }
    public void setErrorRows(int errorRows) { this.errorRows = errorRows; }

    public List<RowError> getErrors() { return errors; }
    public void setErrors(List<RowError> errors) { this.errors = errors; }

    public List<T> getPreviewData() { return previewData; }
    public void setPreviewData(List<T> previewData) { this.previewData = previewData; }

    public static class RowError {
        private int rowNumber;
        private String field;
        private String message;

        public RowError() {}
        public RowError(int rowNumber, String field, String message) {
            this.rowNumber = rowNumber;
            this.field = field;
            this.message = message;
        }

        public int getRowNumber() { return rowNumber; }
        public void setRowNumber(int rowNumber) { this.rowNumber = rowNumber; }

        public String getField() { return field; }
        public void setField(String field) { this.field = field; }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}
