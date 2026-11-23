package com.auren.api;

import com.auren.api.controller.CustomerController;
import com.auren.api.controller.OrderController;
import com.auren.domain.entity.Customer;
import com.auren.domain.entity.Order;
import com.auren.domain.entity.Workspace;
import com.auren.domain.repository.CustomerRepository;
import com.auren.domain.repository.OrderRepository;
import com.auren.domain.service.CustomerDuplicateMergeService;
import com.auren.domain.service.OrderService;
import com.auren.security.jwt.AurenUserPrincipal;
import com.auren.security.jwt.JwtTokenProvider;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {CustomerController.class, OrderController.class})
@AutoConfigureMockMvc(addFilters = false)
class CustomerAndOrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CustomerRepository customerRepository;

    @MockBean
    private CustomerDuplicateMergeService mergeService;

    @MockBean
    private OrderRepository orderRepository;

    @MockBean
    private OrderService orderService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @Test
    @DisplayName("GET /customers lists workspace customers")
    void testListCustomers() throws Exception {
        UUID workspaceId = UUID.randomUUID();
        Workspace ws = Workspace.builder().name("Test Shop").build();
        ws.setId(workspaceId);

        AurenUserPrincipal principal = new AurenUserPrincipal(UUID.randomUUID(), "seller@auren.com", workspaceId);
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                principal, null, List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );

        org.springframework.security.core.context.SecurityContext context = org.springframework.security.core.context.SecurityContextHolder.createEmptyContext();
        context.setAuthentication(auth);
        org.springframework.security.core.context.SecurityContextHolder.setContext(context);

        try {
            Customer c1 = Customer.builder()
                    .workspace(ws)
                    .fullName("Priya Sharma")
                    .handle("@priyasharma")
                    .phone("+919876543210")
                    .build();
            c1.setId(UUID.randomUUID());

            Mockito.when(customerRepository.findByWorkspaceIdAndIsDeletedFalse(workspaceId)).thenReturn(List.of(c1));

            mockMvc.perform(get("/customers"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.data[0].fullName").value("Priya Sharma"));
        } finally {
            org.springframework.security.core.context.SecurityContextHolder.clearContext();
        }
    }

    @Test
    @DisplayName("POST /orders/{id}/payments records payment and updates balance due")
    void testRecordPayment() throws Exception {
        UUID workspaceId = UUID.randomUUID();
        Workspace ws = Workspace.builder().name("Test Shop").build();
        ws.setId(workspaceId);

        UUID orderId = UUID.randomUUID();
        AurenUserPrincipal principal = new AurenUserPrincipal(UUID.randomUUID(), "seller@auren.com", workspaceId);
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                principal, null, List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );

        org.springframework.security.core.context.SecurityContext context = org.springframework.security.core.context.SecurityContextHolder.createEmptyContext();
        context.setAuthentication(auth);
        org.springframework.security.core.context.SecurityContextHolder.setContext(context);

        try {
            Order updatedOrder = Order.builder()
                    .workspace(ws)
                    .orderNumber("ORD-1001")
                    .totalAmount(new BigDecimal("2000.00"))
                    .amountPaid(new BigDecimal("1000.00"))
                    .balanceDue(new BigDecimal("1000.00"))
                    .paymentStatus("PARTIALLY_PAID")
                    .build();
            updatedOrder.setId(orderId);

            Mockito.when(orderService.recordPayment(eq(workspaceId), eq(orderId), eq(new BigDecimal("1000.00")), eq("UPI")))
                    .thenReturn(updatedOrder);

            String payload = """
                    {
                        "paymentAmount": 1000.00,
                        "paymentMethod": "UPI"
                    }
                    """;

            mockMvc.perform(post("/orders/" + orderId + "/payments")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(payload))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.data.paymentStatus").value("PARTIALLY_PAID"))
                    .andExpect(jsonPath("$.data.balanceDue").value(1000.00));
        } finally {
            org.springframework.security.core.context.SecurityContextHolder.clearContext();
        }
    }
}
