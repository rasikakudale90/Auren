package com.auren.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.security.Principal;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class AurenUserPrincipal implements Principal {
    private final UUID userId;
    private final String email;
    private final UUID workspaceId;

    @Override
    public String getName() {
        return email;
    }
}
