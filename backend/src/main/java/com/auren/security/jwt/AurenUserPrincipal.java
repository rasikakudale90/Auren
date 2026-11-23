package com.auren.security.jwt;

import java.security.Principal;
import java.util.UUID;

public class AurenUserPrincipal implements Principal {
    private final UUID userId;
    private final String email;
    private final UUID workspaceId;

    public AurenUserPrincipal(UUID userId, String email, UUID workspaceId) {
        this.userId = userId;
        this.email = email;
        this.workspaceId = workspaceId;
    }

    public UUID getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public UUID getWorkspaceId() {
        return workspaceId;
    }

    @Override
    public String getName() {
        return email;
    }
}
