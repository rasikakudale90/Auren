-- ==============================================================================
-- AUREN Schema Migration V2: 30-Day Soft-Delete Trash Retention Unified View
-- SRS Reference: FR-DATA-002, SEC-004, technical-depth.md Section 3.C
-- ==============================================================================

CREATE OR REPLACE VIEW v_trash_retention_items AS
SELECT
    id,
    workspace_id,
    'enquiry' AS item_type,
    COALESCE(intent, 'Enquiry from ' || channel) AS title,
    deleted_at,
    GREATEST(0, 30 - FLOOR(EXTRACT(EPOCH FROM (NOW() - deleted_at)) / 86400))::INT AS days_remaining
FROM enquiries
WHERE is_deleted = TRUE

UNION ALL

SELECT
    id,
    workspace_id,
    'customer' AS item_type,
    full_name AS title,
    deleted_at,
    GREATEST(0, 30 - FLOOR(EXTRACT(EPOCH FROM (NOW() - deleted_at)) / 86400))::INT AS days_remaining
FROM customers
WHERE is_deleted = TRUE

UNION ALL

SELECT
    id,
    workspace_id,
    'order' AS item_type,
    'Order #' || order_number AS title,
    deleted_at,
    GREATEST(0, 30 - FLOOR(EXTRACT(EPOCH FROM (NOW() - deleted_at)) / 86400))::INT AS days_remaining
FROM orders
WHERE is_deleted = TRUE

UNION ALL

SELECT
    id,
    workspace_id,
    'follow_up' AS item_type,
    title AS title,
    deleted_at,
    GREATEST(0, 30 - FLOOR(EXTRACT(EPOCH FROM (NOW() - deleted_at)) / 86400))::INT AS days_remaining
FROM follow_ups
WHERE is_deleted = TRUE;
