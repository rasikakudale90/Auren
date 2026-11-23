package com.auren.importer.service;

import com.auren.domain.entity.Customer;
import com.auren.domain.entity.Product;
import com.auren.domain.entity.Workspace;
import com.auren.domain.repository.CustomerRepository;
import com.auren.domain.repository.ProductRepository;
import com.auren.domain.repository.WorkspaceRepository;
import com.auren.importer.dto.CsvValidationResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CsvImportService {

    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final WorkspaceRepository workspaceRepository;

    @Transactional
    public CsvValidationResult<Customer> importCustomers(UUID workspaceId, byte[] csvBytes, boolean commit) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new IllegalArgumentException("Workspace not found: " + workspaceId));

        CsvValidationResult<Customer> result = new CsvValidationResult<>();
        List<Customer> toSave = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(new java.io.ByteArrayInputStream(csvBytes), StandardCharsets.UTF_8))) {
            String line;
            int row = 0;
            boolean isHeader = true;

            while ((line = reader.readLine()) != null) {
                row++;
                if (isHeader) {
                    isHeader = false;
                    continue;
                }
                if (line.trim().isEmpty()) continue;

                result.setTotalRows(result.getTotalRows() + 1);
                String[] cols = line.split(",", -1);

                String name = cols.length > 0 ? cols[0].trim() : "";
                String phone = cols.length > 1 ? cols[1].trim() : "";
                String handle = cols.length > 2 ? cols[2].trim() : "";
                String email = cols.length > 3 ? cols[3].trim() : "";

                if (name.isEmpty()) {
                    result.getErrors().add(new CsvValidationResult.RowError(row, "name", "Customer name is required"));
                    result.setErrorRows(result.getErrorRows() + 1);
                    continue;
                }

                // Duplicate check
                List<Customer> duplicates = customerRepository.findPotentialDuplicates(workspaceId, phone.isEmpty() ? null : phone, handle.isEmpty() ? null : handle);
                if (!duplicates.isEmpty()) {
                    result.setDuplicateRows(result.getDuplicateRows() + 1);
                }

                Customer customer = Customer.builder()
                        .workspace(workspace)
                        .fullName(name)
                        .phone(phone.isEmpty() ? null : phone)
                        .handle(handle.isEmpty() ? null : handle)
                        .email(email.isEmpty() ? null : email)
                        .build();

                toSave.add(customer);
                result.setValidRows(result.getValidRows() + 1);
            }

            result.setPreviewData(toSave.stream().limit(10).toList());

            if (commit && result.getErrorRows() == 0) {
                customerRepository.saveAll(toSave);
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to parse CSV file: " + e.getMessage());
        }

        return result;
    }

    @Transactional
    public CsvValidationResult<Product> importProducts(UUID workspaceId, byte[] csvBytes, boolean commit) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new IllegalArgumentException("Workspace not found: " + workspaceId));

        CsvValidationResult<Product> result = new CsvValidationResult<>();
        List<Product> toSave = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(new java.io.ByteArrayInputStream(csvBytes), StandardCharsets.UTF_8))) {
            String line;
            int row = 0;
            boolean isHeader = true;

            while ((line = reader.readLine()) != null) {
                row++;
                if (isHeader) {
                    isHeader = false;
                    continue;
                }
                if (line.trim().isEmpty()) continue;

                result.setTotalRows(result.getTotalRows() + 1);
                String[] cols = line.split(",", -1);

                String name = cols.length > 0 ? cols[0].trim() : "";
                String sku = cols.length > 1 ? cols[1].trim() : "";
                String priceStr = cols.length > 2 ? cols[2].trim() : "0";
                String stockStr = cols.length > 3 ? cols[3].trim() : "0";

                if (name.isEmpty()) {
                    result.getErrors().add(new CsvValidationResult.RowError(row, "name", "Product name is required"));
                    result.setErrorRows(result.getErrorRows() + 1);
                    continue;
                }

                BigDecimal price = BigDecimal.ZERO;
                try {
                    price = new BigDecimal(priceStr);
                } catch (Exception e) {
                    result.getErrors().add(new CsvValidationResult.RowError(row, "price", "Invalid price format"));
                    result.setErrorRows(result.getErrorRows() + 1);
                    continue;
                }

                int stock = 0;
                try {
                    stock = Integer.parseInt(stockStr);
                } catch (Exception ignored) {}

                Product product = Product.builder()
                        .workspace(workspace)
                        .name(name)
                        .sku(sku.isEmpty() ? null : sku)
                        .price(price)
                        .stockQuantity(stock)
                        .build();

                toSave.add(product);
                result.setValidRows(result.getValidRows() + 1);
            }

            result.setPreviewData(toSave.stream().limit(10).toList());

            if (commit && result.getErrorRows() == 0) {
                productRepository.saveAll(toSave);
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to parse CSV file: " + e.getMessage());
        }

        return result;
    }
}
