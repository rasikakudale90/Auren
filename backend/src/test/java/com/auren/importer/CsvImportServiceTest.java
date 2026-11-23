package com.auren.importer;

import com.auren.domain.entity.Customer;
import com.auren.domain.entity.Workspace;
import com.auren.domain.repository.CustomerRepository;
import com.auren.domain.repository.ProductRepository;
import com.auren.domain.repository.WorkspaceRepository;
import com.auren.importer.dto.CsvValidationResult;
import com.auren.importer.service.CsvImportService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CsvImportServiceTest {

    @Mock
    private CustomerRepository customerRepository;
    @Mock
    private ProductRepository productRepository;
    @Mock
    private WorkspaceRepository workspaceRepository;

    @InjectMocks
    private CsvImportService csvImportService;

    @Test
    @DisplayName("Import customers CSV preview validates valid and error rows correctly")
    void testImportCustomersPreview() {
        UUID wsId = UUID.randomUUID();
        Workspace ws = Workspace.builder().id(wsId).build();
        when(workspaceRepository.findById(wsId)).thenReturn(Optional.of(ws));
        when(customerRepository.findPotentialDuplicates(any(), any(), any())).thenReturn(Collections.emptyList());

        String csv = "Full Name,Phone,Social Handle,Email\n" +
                     "Neha Gupta,+91 99887 66554,@neha_g,neha@example.com\n" +
                     ",+91 99999 00000,@noname,test@example.com\n"; // Missing name triggers error

        CsvValidationResult<Customer> result = csvImportService.importCustomers(wsId, csv.getBytes(StandardCharsets.UTF_8), false);

        assertEquals(2, result.getTotalRows());
        assertEquals(1, result.getValidRows());
        assertEquals(1, result.getErrorRows());
        assertEquals("name", result.getErrors().get(0).getField());
        verify(customerRepository, never()).saveAll(anyList());
    }
}
