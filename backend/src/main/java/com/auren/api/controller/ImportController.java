package com.auren.api.controller;

import com.auren.api.dto.ApiResponse;
import com.auren.domain.entity.Customer;
import com.auren.domain.entity.Product;
import com.auren.importer.dto.CsvValidationResult;
import com.auren.importer.service.CsvImportService;
import com.auren.security.jwt.AurenUserPrincipal;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/import")
public class ImportController {

    private final CsvImportService csvImportService;
    public ImportController(CsvImportService csvImportService) {
        this.csvImportService = csvImportService;
    }


    @PostMapping(value = "/customers", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<CsvValidationResult<Customer>>> importCustomers(
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "false") boolean commit,
            @AuthenticationPrincipal AurenUserPrincipal principal) throws IOException {

        if (file.isEmpty()) {
            throw new IllegalArgumentException("CSV file is required");
        }

        CsvValidationResult<Customer> result = csvImportService.importCustomers(
                principal.getWorkspaceId(),
                file.getBytes(),
                commit
        );

        String msg = commit ? "Customers imported successfully" : "Customer CSV validation preview completed";
        return ResponseEntity.ok(ApiResponse.ok(result, msg));
    }

    @PostMapping(value = "/products", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<CsvValidationResult<Product>>> importProducts(
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "false") boolean commit,
            @AuthenticationPrincipal AurenUserPrincipal principal) throws IOException {

        if (file.isEmpty()) {
            throw new IllegalArgumentException("CSV file is required");
        }

        CsvValidationResult<Product> result = csvImportService.importProducts(
                principal.getWorkspaceId(),
                file.getBytes(),
                commit
        );

        String msg = commit ? "Products imported successfully" : "Product CSV validation preview completed";
        return ResponseEntity.ok(ApiResponse.ok(result, msg));
    }

    @GetMapping("/template/customers")
    public ResponseEntity<String> getCustomerTemplate() {
        String csv = "Full Name,Phone,Social Handle,Email\nAnanya Verma,+91 98200 12345,@ananya_v,ananya@example.com\n";
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=customers_template.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csv);
    }

    @GetMapping("/template/products")
    public ResponseEntity<String> getProductTemplate() {
        String csv = "Product Name,SKU,Price,Stock Quantity\nCeramic Vase (Earthy Sage),VASE-SAGE-01,1850.00,12\n";
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=products_template.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csv);
    }
}
