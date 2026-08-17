package com.eventhub.eventapp.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Configuration
public class JwtConfig
{

    @Value("${app.jwt.access-secret}")
    private String accessJwtSecret;

    @Value("${app.jwt.refresh-secret}")
    private String refreshJwtSecret;


    @Bean
    public JwtEncoder accessJwtEncoder( @Qualifier("accessJwtSecretKey") SecretKey secretKey){
        return NimbusJwtEncoder.withSecretKey(secretKey).build();
    }

    @Bean
    public JwtDecoder accessJwtDecoder( @Qualifier("accessJwtSecretKey") SecretKey secretKey){
        return NimbusJwtDecoder.withSecretKey(secretKey).build();
    }

    @Bean
    public SecretKey accessJwtSecretKey(){
        byte[] keyBytes = Base64.getDecoder().decode(accessJwtSecret);
        return new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    @Bean
    public JwtEncoder refreshJwtEncoder( @Qualifier("refreshJwtSecretKey") SecretKey secretKey){
        return NimbusJwtEncoder.withSecretKey(secretKey).build();
    }

    @Bean
    public JwtDecoder refreshJwtDecoder(@Qualifier("refreshJwtSecretKey") SecretKey secretKey){
        return NimbusJwtDecoder.withSecretKey(secretKey).build();
    }

    @Bean
    public SecretKey refreshJwtSecretKey(){
        byte[] keyBytes = Base64.getDecoder().decode(refreshJwtSecret);
        return new SecretKeySpec(keyBytes, "HmacSHA256");
    }
}
