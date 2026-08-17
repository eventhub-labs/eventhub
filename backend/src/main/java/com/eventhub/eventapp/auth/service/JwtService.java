package com.eventhub.eventapp.auth.service;

import com.eventhub.eventapp.auth.exception.InvalidRefreshTokenException;
import com.eventhub.eventapp.user.domain.User;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class JwtService {

    private final JwtEncoder accessJwtEncoder;
    private final JwtEncoder refreshJwtEncoder;
    private final JwtDecoder refreshJwtDecoder;

    @Value("${app.jwt.access-ttl}")
    private int accessTTL;

    @Value("${app.jwt.refresh-ttl}")
    private int refreshTTL;

    public JwtService(@Qualifier("refreshJwtEncoder") JwtEncoder refJwtEnc, @Qualifier("accessJwtEncoder") JwtEncoder accJwtEnc, @Qualifier("refreshJwtDecoder") JwtDecoder refJwtDec)
    {
        this.accessJwtEncoder = accJwtEnc;
        this.refreshJwtEncoder = refJwtEnc;
        this.refreshJwtDecoder = refJwtDec;
    }

    public String generateAccessToken(User user){

        Instant now = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder().subject(user.getId().toString()).issuedAt(now).expiresAt(now.plusSeconds(accessTTL)).claim("role", user.getRole().name()).build();

        return accessJwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public String generateRefreshToken(User user){
        Instant now = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .subject(user.getId().toString())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(refreshTTL))
                .claim("type", "refresh")
                .build();

        return  refreshJwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public Jwt decodeRefreshToken(String refreshToken){
        try {
            Jwt jwt = refreshJwtDecoder.decode(refreshToken);

            if (!"refresh".equals(jwt.getClaimAsString("type"))) {
                throw new InvalidRefreshTokenException("Invalid refresh token");
            }

            return jwt;

        } catch (JwtException e) {
            throw new InvalidRefreshTokenException("Invalid refresh token");
        }
    }

}
