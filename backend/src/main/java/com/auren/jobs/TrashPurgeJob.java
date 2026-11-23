package com.auren.jobs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.auren.domain.entity.Customer;
import com.auren.domain.entity.Enquiry;
import com.auren.domain.entity.FollowUp;
import com.auren.domain.entity.Order;
import com.auren.domain.repository.CustomerRepository;
import com.auren.domain.repository.EnquiryRepository;
import com.auren.domain.repository.FollowUpRepository;
import com.auren.domain.repository.OrderRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

/**
 * Implements SRS Section 11 & FR-DATA-005:
 * Permanently deletes soft-deleted records older than 30 days.
 * Runs daily at 02:00 AM.
 */
@Component
public class TrashPurgeJob {
    private static final Logger log = LoggerFactory.getLogger(TrashPurgeJob.class);


    private final EnquiryRepository enquiryRepository;
    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;
    private final FollowUpRepository followUpRepository;
    public TrashPurgeJob(EnquiryRepository enquiryRepository, CustomerRepository customerRepository, OrderRepository orderRepository, FollowUpRepository followUpRepository) {
        this.enquiryRepository = enquiryRepository;
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
        this.followUpRepository = followUpRepository;
    }


    @Scheduled(cron = "${auren.jobs.trash-purge.cron:0 0 2 * * ?}")
    @Transactional
    public void purgeExpiredTrash() {
        Instant cutoff = Instant.now().minus(30, ChronoUnit.DAYS);
        log.info("Running scheduled 30-day trash hard-purge for records deleted before: {}", cutoff);

        // 1. Purge enquiries
        List<Enquiry> expiredEnquiries = enquiryRepository.findAll().stream()
                .filter(e -> Boolean.TRUE.equals(e.getIsDeleted()) && e.getDeletedAt() != null && e.getDeletedAt().isBefore(cutoff))
                .toList();
        enquiryRepository.deleteAll(expiredEnquiries);

        // 2. Purge orders
        List<Order> expiredOrders = orderRepository.findAll().stream()
                .filter(o -> Boolean.TRUE.equals(o.getIsDeleted()) && o.getDeletedAt() != null && o.getDeletedAt().isBefore(cutoff))
                .toList();
        orderRepository.deleteAll(expiredOrders);

        // 3. Purge follow-ups
        List<FollowUp> expiredFollowUps = followUpRepository.findAll().stream()
                .filter(f -> Boolean.TRUE.equals(f.getIsDeleted()) && f.getDeletedAt() != null && f.getDeletedAt().isBefore(cutoff))
                .toList();
        followUpRepository.deleteAll(expiredFollowUps);

        // 4. Purge customers
        List<Customer> expiredCustomers = customerRepository.findAll().stream()
                .filter(c -> Boolean.TRUE.equals(c.getIsDeleted()) && c.getDeletedAt() != null && c.getDeletedAt().isBefore(cutoff))
                .toList();
        customerRepository.deleteAll(expiredCustomers);

        log.info("Purged {} enquiries, {} orders, {} follow-ups, and {} customers.",
                expiredEnquiries.size(), expiredOrders.size(), expiredFollowUps.size(), expiredCustomers.size());
    }
}
