package com.auren.domain.service;

import com.auren.domain.entity.Customer;
import com.auren.domain.entity.Enquiry;
import com.auren.domain.entity.FollowUp;
import com.auren.domain.entity.Order;
import com.auren.domain.entity.TrashItem;
import com.auren.domain.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Implements Section 3.C from technical-depth.md:
 * 30-Day Soft-Delete Retention Policy (SRS FR-DATA-002 / SEC-004)
 */
@Service
public class TrashService {

    private final TrashItemRepository trashItemRepository;
    private final EnquiryRepository enquiryRepository;
    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;
    private final FollowUpRepository followUpRepository;
    public TrashService(TrashItemRepository trashItemRepository, EnquiryRepository enquiryRepository, CustomerRepository customerRepository, OrderRepository orderRepository, FollowUpRepository followUpRepository) {
        this.trashItemRepository = trashItemRepository;
        this.enquiryRepository = enquiryRepository;
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
        this.followUpRepository = followUpRepository;
    }


    public List<TrashItem> getTrashItems(UUID workspaceId) {
        return trashItemRepository.findByWorkspaceIdOrderByDeletedAtDesc(workspaceId);
    }

    @Transactional
    public void restoreItem(UUID workspaceId, String itemType, UUID itemId) {
        switch (itemType.toLowerCase()) {
            case "enquiry" -> {
                Enquiry enquiry = enquiryRepository.findByIdAndWorkspaceId(itemId, workspaceId)
                        .orElseThrow(() -> new IllegalArgumentException("Enquiry not found in trash: " + itemId));
                enquiry.restore();
                enquiryRepository.save(enquiry);
            }
            case "customer" -> {
                Customer customer = customerRepository.findByIdAndWorkspaceId(itemId, workspaceId)
                        .orElseThrow(() -> new IllegalArgumentException("Customer not found in trash: " + itemId));
                customer.restore();
                customerRepository.save(customer);
            }
            case "order" -> {
                Order order = orderRepository.findByIdAndWorkspaceId(itemId, workspaceId)
                        .orElseThrow(() -> new IllegalArgumentException("Order not found in trash: " + itemId));
                order.restore();
                orderRepository.save(order);
            }
            case "follow_up" -> {
                FollowUp followUp = followUpRepository.findByIdAndWorkspaceId(itemId, workspaceId)
                        .orElseThrow(() -> new IllegalArgumentException("Follow-up not found in trash: " + itemId));
                followUp.restore();
                followUpRepository.save(followUp);
            }
            default -> throw new IllegalArgumentException("Unsupported item type for restore: " + itemType);
        }
    }
}
